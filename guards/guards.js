var expressJwt = require('express-jwt');
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth'
})
exports.isAuthenticated = (req, res, next) => {
  console.log(req.auth, req.profile)
  const checker = req.profile && req.auth && req.profile._id == req.auth.id
  if (!checker) {
    return res.status(403).json({
      error: "Access denied, you are not authenticated"
    })
  }
  next()
}
exports.isAdmin = (req, res, next) => {
  if (req.profile.role !== 1) {
    return res.status(403).json({
      error: "Access denied, you are not an admin"

    })
  }
  next()
}