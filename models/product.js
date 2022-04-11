const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true,
    maxLength: 32,
  },
  description: {
    type: String,
    required: [true, 'description is required'],
    trim: true,
    maxLength: 1000,
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
    maxLength: 32,
    trim: true
  },
  stock: {
    type: Number,
  },
  sold: {
    type: Number,
    default: 0,
  },
  product_image: {
    data: Buffer,
    contentType: String
  },
  category: {
    type: ObjectId,
    ref: "Category"
  }
}, { timestamps: true })


nodule.exports = mongoose.models('Products', productSchema)