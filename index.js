require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- ROOT ROUTE (VERY IMPORTANT) ---------------- */
app.get("/", (req, res) => {
  res.send("UWO Backend is running");
});

/* ---------------- CONTACT API ---------------- */
app.post("/api/contact", (req, res) => {
  console.log("FORM DATA:", req.body);
  res.status(200).json({ message: "Message received successfully" });
});

/* ---------------- DB CONNECTION ---------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

/* ---------------- SERVER START ---------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
