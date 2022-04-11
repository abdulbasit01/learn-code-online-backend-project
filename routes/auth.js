var router = require("express").Router();

const { signout, signup } = require('../controllers/auth')
const { body, validationResult } = require('express-validator');

router.post(
  "/signup",
  body('name', 'name must be of 3 characters').isLength({ min: 3 }),
  body('email', 'Email is not correct format').isEmail(),
  body('password', 'password must be greater than 5 characters').isLength({ min: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(({ location, ...rErrors }) => rErrors) });
    }
    next()
  }
  ,
  signup);
router.get("/signout", signout);

module.exports = router;
