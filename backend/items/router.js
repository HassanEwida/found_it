const { listItem, searchItem, getAllMyItems, modifyItem, deleteItem } = require('./controller');
const express = require("express");

const router = express.Router();

router.post('/listItem', listItem);
router.get('/search', searchItem)
router.get('/getAllMyItems', getAllMyItems)
router.put('/modifyItem', modifyItem)
router.delete('/deleteItem/:itemId', deleteItem)

module.exports = { router }