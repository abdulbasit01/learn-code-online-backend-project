require('dotenv').config()
const express = require('express');
const bodyParse = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();
const dbConnection = require('./dbConnection');
// routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
// db connection
dbConnection()
// middlewares
app.use(bodyParse.json())
app.use(cookieParser())
app.use(cors())

// routes 

app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
// PROT
const PORT = process.env.PORT || 8000;

// kick start
app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});

