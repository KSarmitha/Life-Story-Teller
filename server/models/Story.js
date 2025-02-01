const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  userId: { type: String },
  date: { type: Date },
  content: { type: String } 
});

const StoryModel = mongoose.model("stories", StorySchema);

module.exports = StoryModel;
