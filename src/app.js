const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./auth/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const mainRouter = require("./router/mainRouter");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running in localhost:${port}`);
});

app.use(mainRouter);
app.use(cookieParser());
