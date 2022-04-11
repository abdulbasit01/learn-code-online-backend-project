const mongoose = require('mongoose')


const catergorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'name is required'],
    maxLength: 32,
    unique: true
  }
},
  {
    timestamps: true
  }

)


module.exports = mongoose.model("Category", catergorySchema);