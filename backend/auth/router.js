    const authMiddleware = require('../middlewares/auth.middleware');
const { login, register, signOut } = require('./controller');
const express = require("express");

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/signOut', authMiddleware, signOut);

module.exports = { router };