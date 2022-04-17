const User = require('../models/user')
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var cookieParser = require('cookie-parser')

exports.signout = (req, res, next) => {
  res.clearCookie('token')
  res.json({
    message: "User is signout"
  })
  next()
}


exports.signup = (req, res) => {
  const user = new User(req.body)
  user.save((error, user) => {
    if (!error) return res.status(200).json(user)
    return res.status(400).json(error)
  })
}

exports.signin = (req, res, next) => {
  const { email, password } = req.body
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }
    // put token in cookies
    const { _id, name, email, purchases, role } = user
    // create token
    const token = jwt.sign({ id: _id, _id, name, email, purchases, role }, process.env.SECRET)
    res.cookie('token', token, { expire: new Date() + 999 })
    res.json({
      status: 200,
      token
    })
  })
}