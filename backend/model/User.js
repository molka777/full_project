const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  myPreferences: [
    {
      type: ObjectId,
      ref: "themes",
    },
  ],
});

module.exports = User = mongoose.model("user", userSchema);
