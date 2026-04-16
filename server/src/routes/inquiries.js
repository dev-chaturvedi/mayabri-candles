const express = require("express");
const CorporateInquiry = require("../models/CorporateInquiry");

const router = express.Router();

router.post("/corporate", async (req, res, next) => {
  try {
    const { companyName, contactName, email, phone, quantity, message } = req.body;

    if (!companyName || !contactName || !email) {
      return res
        .status(400)
        .json({ message: "Company name, contact name, and email are required." });
    }

    await CorporateInquiry.create({
      companyName,
      contactName,
      email,
      phone,
      quantity: Number(quantity) || 1,
      message,
    });

    return res.status(201).json({
      message: "Corporate gifting inquiry submitted successfully.",
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
