const express = require("express");

const authController = require("../controllers/authController");

const {
    activateAccountValidator,
    loginValidator,
} = require("../validators/authValidator");

const validateRequest = require("../middlewares/validateRequest");

const router = express.Router();

router.post(
    "/activate",
    activateAccountValidator,
    validateRequest,
    authController.activateAccount
);
router.post(
    "/login",
    loginValidator,
    validateRequest,
    authController.login
);

module.exports = router;