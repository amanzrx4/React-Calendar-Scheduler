const express = require('express');
const env = require('dotenv');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// User Routes
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');

app=express();

// Environment variables
env.config();

// mongodb
const url = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@flipkart.uvjxc.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(
  url, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex : true
  } 
).then(() => {
  console.log('Database Connected');
  
});

app.use(cors());

// app.use(bodyParser());
// Same as
app.use(express.json());

app.use('/user' , userRoutes);
app.use('/event' , eventRoutes);

app.listen( process.env.PORT , () => {
  console.log(`Server running on PORT : ${process.env.PORT}`);
  
} )