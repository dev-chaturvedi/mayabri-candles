const express = require("express");
const Stripe = require("stripe");

const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { sendOrderConfirmationEmail } = require("../services/email");
const { getDiscountByCode } = require("../config/discounts");

const router = express.Router();

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY);

const getReceiptUrl = async (stripe, paymentIntentId) => {
  if (!paymentIntentId) {
    return "";
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ["latest_charge"],
    });
    return paymentIntent.latest_charge?.receipt_url || "";
  } catch (_error) {
    return "";
  }
};

const handleStripeWebhook = async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).send("Stripe is not configured.");
  }

  const signature = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return res.status(500).send("STRIPE_WEBHOOK_SECRET is missing.");
  }

  const stripe = getStripe();
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const existingOrder = await Order.findOne({ stripeSessionId: session.id });
      if (existingOrder?.emailSent) {
        return res.json({ received: true });
      }

      const lineItemsResponse = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 100,
      });
      const lineItems = lineItemsResponse.data.map((item) => ({
        name: item.description || "Candle",
        quantity: item.quantity || 1,
        unitAmount: item.price?.unit_amount || 0,
        totalAmount: item.amount_total || 0,
      }));

      const receiptUrl = await getReceiptUrl(stripe, session.payment_intent);
      const customerEmail = session.customer_details?.email || session.customer_email;
      const customerName = session.customer_details?.name || "";

      if (!customerEmail) {
        console.warn(`No customer email found for session ${session.id}`);
        return res.json({ received: true });
      }

      const orderDoc = await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        {
          stripeSessionId: session.id,
          userId: session.metadata?.userId || null,
          customerName,
          customerEmail,
          currency: session.currency || "inr",
          amountTotal: session.amount_total || 0,
          paymentStatus: session.payment_status || "paid",
          items: lineItems,
          receiptUrl,
        },
        { new: true, upsert: true }
      );

      const emailSent = await sendOrderConfirmationEmail({
        customerName,
        customerEmail,
        sessionId: session.id,
        items: lineItems,
        amountTotal: session.amount_total || 0,
        currency: session.currency || "inr",
        receiptUrl,
      });

      if (emailSent) {
        orderDoc.emailSent = true;
        orderDoc.emailSentAt = new Date();
        await orderDoc.save();
      }
    } catch (error) {
      console.error("Error handling checkout.session.completed:", error.message);
      return res.status(500).send("Webhook processing failed.");
    }
  }

  return res.json({ received: true });
};

router.post("/create-session", authMiddleware, async (req, res, next) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res
        .status(500)
        .json({ message: "Stripe is not configured. Add STRIPE_SECRET_KEY." });
    }

    const stripe = getStripe();
    const user = await User.findById(req.userId).select("name email");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const { items, discountCode = "", giftWrap = false, giftMessage = "" } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const productIds = items.map((item) => item.id);
    const dbProducts = await Product.find({ id: { $in: productIds } });
    const productsMap = new Map(dbProducts.map((product) => [product.id, product]));

    const discount = getDiscountByCode(discountCode);
    const discountMultiplier = discount
      ? Math.max(0.05, (100 - discount.percentOff) / 100)
      : 1;

    const lineItems = items
      .map((cartItem) => {
        const product = productsMap.get(cartItem.id);
        if (!product) {
          return null;
        }

        const originalUnitAmount = Number(product.price) * 100;
        const discountedUnitAmount = Math.max(
          100,
          Math.round(originalUnitAmount * discountMultiplier)
        );

        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: discountedUnitAmount,
          },
          quantity: Math.max(1, Number(cartItem.quantity) || 1),
        };
      })
      .filter(Boolean);

    if (giftWrap) {
      lineItems.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Gift Wrap",
            description: giftMessage
              ? `Gift Message: ${giftMessage}`
              : "Premium gift wrapping service",
          },
          unit_amount: 9900,
        },
        quantity: 1,
      });
    }

    if (lineItems.length === 0) {
      return res.status(400).json({ message: "No valid products in cart." });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL || "http://localhost:3000"}?payment=success`,
      cancel_url: `${process.env.CLIENT_URL || "http://localhost:3000"}?payment=cancelled`,
      customer_email: user.email,
      metadata: {
        userId: req.userId,
        userEmail: user.email,
        userName: user.name,
        discountCode: discount?.code || "",
        discountPercent: discount ? String(discount.percentOff) : "0",
        giftWrap: giftWrap ? "yes" : "no",
        giftMessage: giftMessage || "",
      },
    });

    return res.json({ url: session.url });
  } catch (error) {
    return next(error);
  }
});

module.exports = { router, handleStripeWebhook };
