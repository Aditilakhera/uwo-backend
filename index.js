const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* middleware */
app.use(cors());
app.use(express.json());

/* test route */
app.get("/", (req, res) => {
  res.send("UWO Backend is running");
});

/* schema */
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  purpose: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

/* api */
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, purpose, message } = req.body;

    if (!name || !email || !purpose || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    await Contact.create({ name, email, purpose, message });

    res.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* server */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.log(err));
