const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.post("/login", AuthController.login);
router.get("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);
router.post("/register", AuthController.register);

module.exports = router;
