const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  birthdate: { type: Date },
  firstName: { type: String},
  lastName: { type: String},
  professional: { type: String},
  websiteUrl: { type: String},
  education: { type: String},
  gender: { type: String},
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
