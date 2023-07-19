const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const authController = require('./controllers/authController');
const propertyController = require('./controllers/propertyController');
const uploadController = require('./controllers/uploadController');


const app = express();


//mongo connect 

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(process.env.PORT, () =>
      console.log('Server has started successfully')
    );
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  // router 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.use("/auth", authController)
app.use("/property", propertyController)
app.use("/upload", uploadController )