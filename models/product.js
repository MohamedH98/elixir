const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product must have a name"],
    unique: true,
  },
  images: {
    type: Array,
  },
  price: {
    type: Number,
    required: [true, "Product must have a price"],
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
