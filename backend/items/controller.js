const { Item } = require("../db/item.model")

const listItem = async (req, res, next) => {

  const item = req.body;

  await Item.create({
    ...item,
    founder: req.user.username
  });

  res.status(200).send(item);
}

const searchItem = async (req, res, next) => {
  const items = await Item.find();

  res.status(200).send(items);
}

const getAllMyItems = async (req, res, next) => {
  const items = await Item.find({ founderId: req.user.ObjectId });

  return res.status(200).send(items);
}

const modifyItem = async (req, res, next) => {
  const { id } = req.params;
  const item = req.body;

  await Item.updateOne({ _id: id }, item);
  const updatedItem = await Item.findOne({ _id: id });

  res.status(200).send(updatedItem);
}

const deleteItem = async (req, res, next) => {
  const { itemId } = req.params;

  await Item.deleteOne({ _id: itemId });

  res.status(200).send();
}

module.exports = { 
  listItem,
  searchItem,
  getAllMyItems,
  modifyItem,
  deleteItem
}