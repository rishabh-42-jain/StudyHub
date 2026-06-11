const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // This tells Mongoose to connect using the link in your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Stops the server if the database fails to connect
  }
};

module.exports = connectDB;