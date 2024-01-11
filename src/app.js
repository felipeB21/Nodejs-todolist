const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
require("dotenv").config();

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
  })
);

const mainRouter = require("./router/mainRouter");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running in localhost:${port}`);
});

app.use(mainRouter);
