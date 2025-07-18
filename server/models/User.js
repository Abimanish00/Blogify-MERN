const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    profileImg: { type: String, required: true }, // base64 string or URL
    profession: { type: String, required: true },
    phone: { type: String }, // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
