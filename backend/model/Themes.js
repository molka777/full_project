const mongoose = require("mongoose");

const themeSchema = mongoose.Schema({
  themes: [
    {
      name: String,
      icon: String,
    },
  ],
  difficulties: [
    {
      name: String,
      icon: String,
    },
  ],
  phobies: [
    {
      name: String,
      icon: String,
    },
  ],
});

module.exports = Themes = mongoose.model("themes", themeSchema);
