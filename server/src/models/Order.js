const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    customerName: {
      type: String,
      trim: true,
    },
    customerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    currency: {
      type: String,
      default: "inr",
    },
    amountTotal: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "paid",
    },
    items: [
      {
        name: String,
        quantity: Number,
        unitAmount: Number,
        totalAmount: Number,
      },
    ],
    receiptUrl: String,
    emailSent: {
      type: Boolean,
      default: false,
    },
    emailSentAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
