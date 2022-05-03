const User = require('../models/user')
const Orders = require('../models/order')
// old method
// exports.getUserById = async (req, res, next, id) => {
//   const { params: { id } } = req
//   try {
//     const user = await User.find({
//       _id: id,
//       is_deleted: { $not: { $eq: true } }
//     })
//     res.status(200).json({
//       user: user.length > 0 ? user : {}
//     })
//   } catch (error) {
//     res.status(400).json({
//       error: error
//     })

//   }
// }

// new method 

exports.getUserById = async (req, res, next, id) => {
  User.findById({
    _id: id,
    is_deleted: { $not: { $eq: true } }
  }).exec((error, user) => {
    if (error && !user) {
      return res.status(400).json({ error: "No user Found" })
    }
    req.profile = user
    next()
  })
}
exports.getUser = (req, res) => {
  req.profile.salt = undefined
  req.profile.encry_password = undefined
  return res.json(req.profile)
}
exports.getAllUsers = async (req, res, next) => {
  try {
    // method 1
    // const users = await User.find({
    //   is_deleted: false || undefined
    // })
    // res.status(200).json({ users })
    // method 2
    await User.find({
      is_deleted: false || undefined
    }).exec((error, users) => {
      if (error && !users) {
        return res.status(400).json({ error: "no user found" })
      }
      res.status(200).json({
        users
      })
    })

  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.deleteUser = async (req, res, next) => {
  const { params: { id } } = req
  try {
    const user = await User.findOne({
      _id: id
    })
    if (user.is_deleted) {
      res.status(300).json({
        message: 'user already deleted'
      })
    }
    user.is_deleted = true
    const updatesUser = await user.save()
    res.status(200).json({
      updatesUser
    })

  } catch (error) {
    res.status(400).json({
      error: error
    })

  }
}
exports.updateUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (error, user) => {
        if (error && !user) {
          return res.status(400).json({ error: "Update failed" })
        }
        user.salt = undefined
        user.encry_password = undefined
        res.status(200).json(user)
      }
    )
  } catch (error) {
    return res.status(400).json(error)
  }
}

exports.userPurchaseList = (req, res, next) => {
  Orders.find({
    user: req.profile._id
  }).populate("user").exec((error, order) => {
    if (error && !user) {
      res.status(400).json("Order not found")
    }
    res.status(200).json(order)
  })
}

exports.pushOrdersInPurchaseList = (req, res, next) => {
  let purchases = []
  const { body: { order: { products } } } = req
  products.forEach((product, id) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      category: product.category,
      quantity: category.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    })
  });
  // updateinto db
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { $new: true },
    (error, purchases) => {
      if (error && !purchases) {
        return res.status(400).json({
          error: "unable to update purchases"
        })
      }
    }
  ),
    next()
}