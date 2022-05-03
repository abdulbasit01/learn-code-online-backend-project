var router = require("express").Router();

const { signout, signup, signin } = require('../controllers/auth')
const { body, validationResult } = require('express-validator');

router.post(
  "/signup",
  body('name', 'name must be of 3 characters').isLength({ min: 3 }),
  body('email', 'Email is empty').notEmpty(),
  body('email', 'Email is not correct format').isEmail(),
  body('password', 'password must be greater than 5 characters').isLength({ min: 5 }),
  body('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(({ location, ...rErrors }) => rErrors) });
    }
    next()
  }
  ,
  signup);


router.post(
  '/signin',
  body('email', "Email is empty, please enter email").notEmpty(),
  body('email', "Email is not correct in the format").isEmail(),
  body('password', "password must must be equal or greater than 4 characters").isLength({ min: 4 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(({ location, ...rErrors }) => rErrors) });
    }
    next()
  },
  signin
)

router.get("/signout", signout);

module.exports = router;
