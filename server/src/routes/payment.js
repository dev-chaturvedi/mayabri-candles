const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const authMiddleware = require("../middleware/auth");
const Product = require("../models/Product");
const { getDiscountByCode } = require("../config/discounts");

const router = express.Router();

const RUPEES_TO_PAISE = 100;

const getRazorpayClient = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.");
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

const normalizeCartItems = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter((item) => item && typeof item.id === "string")
    .map((item) => ({
      id: item.id,
      quantity: Math.max(1, Number(item.quantity) || 1),
    }));
};

const calculatePayableAmount = async ({ items, discountCode, giftWrap }) => {
  const productIds = items.map((item) => item.id);
  const dbProducts = await Product.find({ id: { $in: productIds } }).select("id price");
  const productsMap = new Map(dbProducts.map((product) => [product.id, product]));

  const discount = getDiscountByCode(discountCode);
  const discountMultiplier = discount
    ? Math.max(0.05, (100 - discount.percentOff) / 100)
    : 1;

  const subtotal = items.reduce((sum, item) => {
    const product = productsMap.get(item.id);
    if (!product) {
      return sum;
    }

    return sum + Number(product.price) * item.quantity;
  }, 0);

  const discountedSubtotal = Math.round(subtotal * discountMultiplier);
  const giftWrapFee = giftWrap ? 99 : 0;

  return {
    amount: discountedSubtotal + giftWrapFee,
    itemCount: items.length,
    discount,
  };
};

router.post("/order", authMiddleware, async (req, res, next) => {
  try {
    const {
      amount,
      items = [],
      currency = "INR",
      discountCode = "",
      giftWrap = false,
      giftMessage = "",
    } = req.body;

    const requestedAmount = Number(amount);
    if (!Number.isFinite(requestedAmount) || requestedAmount <= 0) {
      return res.status(400).json({ message: "A valid amount is required." });
    }

    const normalizedItems = normalizeCartItems(items);
    if (normalizedItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const { amount: verifiedAmount, itemCount, discount } = await calculatePayableAmount({
      items: normalizedItems,
      discountCode,
      giftWrap,
    });

    const safeAmount = verifiedAmount > 0 ? verifiedAmount : Math.round(requestedAmount);
    if (!Number.isFinite(safeAmount) || safeAmount <= 0) {
      return res.status(400).json({ message: "Unable to create payment order for empty cart." });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        message: "Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.",
      });
    }

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: Math.round(safeAmount * RUPEES_TO_PAISE),
      currency,
      receipt: `mayabri_${Date.now()}`,
      notes: {
        userId: req.userId,
        itemCount: String(itemCount),
        discountCode: discount?.code || "",
        giftWrap: giftWrap ? "yes" : "no",
        giftMessage: giftMessage ? String(giftMessage).slice(0, 240) : "",
      },
    });

    return res.json({
      keyId: process.env.RAZORPAY_KEY_ID,
      order,
      amount: safeAmount,
      currency,
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/verify", authMiddleware, async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing payment verification fields." });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ message: "Razorpay is not configured." });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const signaturesMatch =
      generatedSignature.length === String(razorpay_signature).length &&
      crypto.timingSafeEqual(
        Buffer.from(generatedSignature),
        Buffer.from(String(razorpay_signature))
      );

    if (!signaturesMatch) {
      return res.status(400).json({ message: "Payment signature verification failed." });
    }

    return res.json({
      success: true,
      message: "Payment verified successfully.",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
