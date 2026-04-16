const express = require("express");

const Product = require("../models/Product");
const authMiddleware = require("../middleware/auth");
const superUserMiddleware = require("../middleware/superUser");

const router = express.Router();

const toProductResponse = (product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  category: product.category,
  image: product.image,
});

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

router.get("/", async (_req, res, next) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.json(products.map(toProductResponse));
  } catch (error) {
    return next(error);
  }
});

router.post("/", authMiddleware, superUserMiddleware, async (req, res, next) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({
        message: "Name, description, price, category, and image are required.",
      });
    }

    let id = slugify(name);
    if (!id) {
      id = `candle-${Date.now()}`;
    }

    const existingProduct = await Product.findOne({ id });
    if (existingProduct) {
      id = `${id}-${Date.now()}`;
    }

    const product = await Product.create({
      id,
      name,
      description,
      price: Number(price),
      category,
      image,
    });

    return res.status(201).json({
      message: "Product added successfully.",
      product: toProductResponse(product),
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", authMiddleware, superUserMiddleware, async (req, res, next) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.json({ message: "Product removed successfully." });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
