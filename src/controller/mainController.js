const db = require("../database/models/index");
module.exports = {
  index: (req, res) => {
    const name = req.session.userName;
    const email = req.session.userEmail;
    req.session.userName = null;
    req.session.userEmail = null;
    res.render("index", {
      name: name ? name : null,
      email: email ? email : null,
    });
  },
  register: (req, res) => {
    res.render("register");
  },
  login: (req, res) => {
    res.render("login");
  },
  postRegister: async (req, res) => {
    const newUser = await db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    if (newUser) {
      (req.session.userName = newUser.name),
        (req.session.userEmail = newUser.email);
    }
    res.redirect("/");
  },
  postLogin: (req, res) => {},
  getTodo: (req, res) => {
    res.render("todo");
  },
  postTodo: (req, res) => {},
};
