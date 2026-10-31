const { body } = require("express-validator");

const activateAccountValidator = [
    body("token")
        .trim()
        .notEmpty()
        .withMessage("Invitation token is required"),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be between 2 and 100 characters"),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),

    body("confirmPassword")
        .notEmpty()
        .withMessage("Please confirm your password")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
];

const loginValidator = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("A valid email is required"),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),
];

module.exports = {
    activateAccountValidator,
    loginValidator,
};