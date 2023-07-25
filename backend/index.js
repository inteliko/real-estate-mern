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
            console.log("Connected to database successfully");
        })
        .catch((err) => {
            console.log(`Error connecting to database: ${err}`);
        });
  
app.use('/images', express.static('public/images'))

  // router 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.use("/auth", authController)
app.use("/property", propertyController)
app.use("/upload", uploadController )

app.listen(process.env.PORT, () => {
  console.log(`This app is running on port ${process.env.PORT}`);
});