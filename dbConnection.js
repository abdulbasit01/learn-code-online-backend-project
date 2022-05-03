const mongoose = require('mongoose');
const dbConnection = async () => {
  const mongoConnectionOptions = { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true };
  try {
    const connection = await mongoose.connect(process.env.DATABASE, mongoConnectionOptions)
    if (!connection) throw new Error("Db not connected")
    console.log("DB connected")
  } catch (error) {
    throw new Error(error)
  }
}
module.exports = dbConnection