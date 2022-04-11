const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;



const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Products'
  },
  name: String,
  count: Number,
  price: Number
},
  { timestamps: true }

)
const Cart = mongoose.model("ProductCartSchema", ProductCartSchema)

const orderScehma = new mongoose.Schema({
  produts: [ProductCartSchema],
  trsnsaction_id: {},
  amount: { type: Number },
  address: String,
  update: Date,
  user: {
    type: ObjectId,
    ref: 'User'
  }
},
  { timestamps: true }
)

const Order = mongoose.model("OrderScheme", orderScehma)


module.exports = { Order, Cart }