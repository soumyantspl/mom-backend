const mongoose = require('mongoose');
const dbUrl = process.env.DATABASE_URL


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbUrl);
    console.info(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.info(`Error while connecting to database',${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
