const { default: mongoose } = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  brand: String,
  color: String,
  location: String,
  time: Date,
  founder: { type: mongoose.Types.ObjectId, ref: "Owner" },
  image: String,
  category: String
});

const Item = mongoose.model('Item', itemSchema);

module.exports = { Item }