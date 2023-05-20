const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter the title of your article"],
    unique: true,
  },
  article: {
    type: String,
    required: [true, "Write your article"],
    max: 600,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Enter a valid id"],
  },
  photo: {
    type: String,
    // required: [true, "Enter your image URL"],
  },
  cloudinary_id: String,
});

module.exports = mongoose.model("blog", blogSchema);
