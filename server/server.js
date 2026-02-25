require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const contactRoutes = require("./routes/contactRoutes");
const User = require("./models/User");

const app = express();

// 🔌 Connect to MongoDB
connectDB();

// 🧩 Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🚏 Routes
app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/booking", bookingRoutes);

// 👑 Create owner account on first run
const createOwnerAccount = async () => {
  try {
    const ownerExists = await User.findOne({ role: "owner" });

    if (!ownerExists) {
      await User.create({
        email: process.env.OWNER_EMAIL,
        password: process.env.OWNER_PASSWORD,
        name: "Royal Tent House Owner",
        role: "owner",
      });

      console.log("✅ Owner account created");
    }
  } catch (error) {
    console.error("❌ Error creating owner:", error.message);
  }
};

createOwnerAccount();

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});