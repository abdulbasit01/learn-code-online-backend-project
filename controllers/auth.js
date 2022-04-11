const User = require('../models/user')

exports.signout = (req, res, next) => {
  res.json({
    message: "User is signout"
  })
  next()
}


exports.signup = (req, res) => {
  const user = new User(req.body)
  console.log(user)
  user.save((error, user) => {
    if (!error) return res.status(200).json(user)
    return res.status(400).json(error)
  })
}