const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");


const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

mongoose.connect('mongodb://localhost:27017/redditclone').then(() => {
  console.log('Connected to mongodb...');
}).catch(()=> {
  console.log("connection faileed");
});

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes)

module.exports = app;
