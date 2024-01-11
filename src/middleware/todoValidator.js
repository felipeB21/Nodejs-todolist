const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.todoErrors = errors.mapped();
    req.session.todoOldData = req.body;
    res.redirect("/todo");
  } else {
    next();
  }
};
