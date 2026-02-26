require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");

const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const contactRoutes = require("./routes/contactRoutes");
const User = require("./models/User");

const app = express();

// 🔌 Connect DB
connectDB();

// 🧩 Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🚏 Routes
app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/booking", bookingRoutes);

// 👑 Create owner (WITH HASHED PASSWORD)
// const bcrypt = require("bcryptjs");
const createOwnerAccount = async () => {
  try {
    const ownerExists = await User.findOne({ role: "owner" });

    if (!ownerExists) {

      const hashedPassword = await bcrypt.hash(
        process.env.OWNER_PASSWORD,
        10
      );

      await User.create({
        email: process.env.OWNER_EMAIL,
        password: hashedPassword,
        name: "Pragati Tent House Owner",
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