const { Router } = require("express");
const mainController = require("../controller/mainController");
const router = Router();

router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/register", mainController.register);
router.post("/register", mainController.postRegister);

module.exports = router;
