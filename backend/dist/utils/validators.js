import { body, validationResult } from 'express-validator';
const validate = (validations) => {
    return async (req, res, next) => {
        for (const validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        // Check if there are validation errors
        // If there are no errors, proceed to the next middleware
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        // If there are errors, return 400 response with the error messages
        res.status(400).json({
            message: "Validation failed",
            errors: errors.array()
        });
    };
};
/* ----------------------Validation rules---------------------- */
const loginValidator = [
    body("email").trim().isEmail().withMessage("Please provide a valid email address"),
    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];
const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];
export { signupValidator, loginValidator, validate };
//# sourceMappingURL=validators.js.map