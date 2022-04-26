import { check, validationResult } from 'express-validator';

const registerValidator = [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User name can not be empty')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Name must containt at least 3 characters')
        .bail(),
    check('email')
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address format')
        .isEmail()
        .withMessage('Invalid email address format')
        .bail(),
    check('password')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = errors.array().map(err => err.msg);
            const msg = err[0];
            res.status(422);
            throw new Error(msg);
        }
        next();
    },
];

const loginValidator = [
    check('email')
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address format')
        .isEmail()
        .withMessage('Invalid email address format')
        .bail(),
    check('password')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = errors.array().map(err => err.msg);
            const msg = err[0];
            res.status(422);
            throw new Error(msg);
        }
        next();
    },
];

export { registerValidator, loginValidator }
