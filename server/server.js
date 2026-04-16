const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/auth");
const productRoutes = require("./src/routes/products");
const { router: checkoutRoutes, handleStripeWebhook } = require("./src/routes/checkout");
const inquiryRoutes = require("./src/routes/inquiries");
const User = require("./src/models/User");
const Product = require("./src/models/Product");
const seedProducts = require("./src/data/products");
const { SUPER_USER_EMAILS } = require("./src/config/superUsers");

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.post(
  "/api/checkout/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/inquiries", inquiryRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    message: "Server error. Please try again.",
  });
});

const bootstrap = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing. Add it in your .env file.");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");

  await Product.bulkWrite(
    seedProducts.map((product) => ({
      updateOne: {
        filter: { id: product.id },
        update: { $setOnInsert: product },
        upsert: true,
      },
    }))
  );

  if (SUPER_USER_EMAILS.length > 0) {
    await User.updateMany(
      { email: { $in: SUPER_USER_EMAILS } },
      { $set: { isSuperUser: true } }
    );
  }

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
