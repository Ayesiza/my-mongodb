const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGO_DB,  {
  useNewUrlParser: true ,
  useUnifiedTopology: true,
});

process.env.MongoDB


const db = mongoose.connection;

module.exports = db;