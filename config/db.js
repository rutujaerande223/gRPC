// config/db.js
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/usergRPC');
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
