const mongoose = require("mongoose");

const PRODUCT_CATEGORIES = ["Jar", "Decorative", "Gift", "Festival"];

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      required: true,
      enum: PRODUCT_CATEGORIES,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
module.exports.PRODUCT_CATEGORIES = PRODUCT_CATEGORIES;
