const { changePassword } = require('./controller');
const express = require("express");

const router = express.Router();

router.post('/changePassword', changePassword);

module.exports = { router }