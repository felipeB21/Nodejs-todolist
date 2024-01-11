const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.loginErrors = errors.mapped();
    req.session.loginOldData = req.body;
    res.redirect("/login");
  } else {
    next();
  }
};
