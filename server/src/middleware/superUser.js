const User = require("../models/User");

const superUserMiddleware = async (req, res, next) => {
  const user = await User.findById(req.userId).select("isSuperUser");

  if (!user || !user.isSuperUser) {
    return res
      .status(403)
      .json({ message: "Only super users can perform this action." });
  }

  req.isSuperUser = true;
  return next();
};

module.exports = superUserMiddleware;
