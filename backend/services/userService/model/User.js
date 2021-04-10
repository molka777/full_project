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
  birthday: {
    type: Date,
  },
  adress: {
    type: String,
  },
  city: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  aboutMe: {
    type: String,
  },
  myPreferences: [
    {
      type: ObjectId,
      ref: "preferences",
    },
  ],
  myExperiences: [
    {
      type: ObjectId,
      ref: "Experience",
    },
  ],
});

module.exports = User = mongoose.model("user", userSchema);
