const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, "Product must have a name"],
  },
  rating: {
    type: Number,
    required: [true, "Product must have a price"],
  },
  author: {
    type: String,
  },
});
