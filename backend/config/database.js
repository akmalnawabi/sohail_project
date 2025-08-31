const mongoose = require("mongoose");

// MongoDB connection configuration
const connectDB = async () => {
  try {
    // MongoDB Atlas connection string
    const mongoURI =
      process.env.MONGODB_URI ||
      "mongodb+srv://akmal:akmal123@cluster0.v17z1.mongodb.net/sohail_project?retryWrites=true&w=majority&appName=Cluster0";

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
