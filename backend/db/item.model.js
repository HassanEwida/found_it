const { default: mongoose } = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  brand: String,
  color: String,
  location: String,
  time: Date,
  founderId: { type: mongoose.Types.ObjectId, ref: "Owner" },
  founder: String,
  image: String,
  category: String,
  contactInfo: String,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = { Item }