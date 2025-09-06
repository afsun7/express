const { default: mongoose } = require("mongoose");
const DB_URL = "mongodb://localhost:27017/mongoose-tutorial";
mongoose.set("strictQuery", true);

// Using async/await pattern
async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Server connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
}

// Call the function to connect
connectDB();
