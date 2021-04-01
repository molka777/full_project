const express = require("express");
const {
  register,
  login,
  updateUser,
  authorizeRoles,
  allUsers,
  seePreferences,
  addPreferences,
  addMyPreferences,
} = require("../controllers/user.controller");
const { registerRules, validator } = require("../middleware/validator");
const isAuth = require("../middleware/passport-setup");
const Router = express.Router();

Router.post("/register", registerRules(), validator, register);
Router.post("/login", login);

Router.get("/current", isAuth(), (req, res) => {
  console.log("req", req);
  res.json(req.user);
});

Router.put("/profile/:id", updateUser);

Router.get("/users", authorizeRoles(`admin`), allUsers);
Router.get("/preferences", seePreferences);
Router.post("/preferences/add", addPreferences);
Router.put("/mypreferences/:id", addMyPreferences);

module.exports = Router;
