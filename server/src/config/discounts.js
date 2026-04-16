const DISCOUNT_CODES = {
  MAYA10: {
    code: "MAYA10",
    percentOff: 10,
    label: "Welcome Savings",
  },
  GIFT15: {
    code: "GIFT15",
    percentOff: 15,
    label: "Gifting Offer",
  },
  CORPORATE20: {
    code: "CORPORATE20",
    percentOff: 20,
    label: "Corporate Bulk Offer",
  },
};

const getDiscountByCode = (value = "") =>
  DISCOUNT_CODES[value.toUpperCase().trim()] || null;

module.exports = { DISCOUNT_CODES, getDiscountByCode };
