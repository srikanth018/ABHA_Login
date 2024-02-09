
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lucky_number: { type: Number, default: 0 },
});
const Fest = mongoose.model("fest", UserSchema);
module.exports = Fest;