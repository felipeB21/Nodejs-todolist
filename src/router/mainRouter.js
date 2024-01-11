const { Router } = require("express");
const mainController = require("../controller/mainController");
const router = Router();

const registerValidator = require("../validations/register");
const loginValidator = require("../validations/login");
const registerMiddleware = require("../middleware/registerValidator");
const loginMiddleware = require("../middleware/loginValidator");
const postValidator = require("../validations/todo");
const postMiddleware = require("../middleware/todoValidator");

router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/register", mainController.register);
router.post(
  "/register",
  registerValidator,
  registerMiddleware,
  mainController.postRegister
);
router.post(
  "/login",
  loginValidator,
  loginMiddleware,
  mainController.postLogin
);
router.get("/todo", mainController.getTodo);
router.post("/todo", postValidator, postMiddleware, mainController.postTodo);
router.get("/todo/:id", mainController.getTodoById);
router.get("/profile/:id", mainController.profile);

module.exports = router;
