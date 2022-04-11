require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const bodyParse = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();
const authRoutes = require('./routes/auth')
// db connection
const mongoConnectionOptions = { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true };
mongoose.connect(process.env.DATABASE, mongoConnectionOptions)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));


// middlewares
app.use(bodyParse.json())
app.use(cookieParser())
app.use(cors())

// routes 

app.use("/api", authRoutes)
// PROT
const PORT = process.env.PORT || 8000;

// kick start
app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});

