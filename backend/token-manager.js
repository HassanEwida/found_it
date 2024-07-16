
const uuid = require('uuid').v4;

class TokenManager {
  tokens = new Map(); // token -> user

  constructor() {}

  addToken(user) {
    const token = uuid();

    this.tokens.set(token, user);

    return token;
  }

  validateToken(token) {
    return this.tokens.has(token);
  }

  getUserByToken(token) {
    return this.tokens.get(token);
  }

  deleteToken(token) {
    this.tokens.delete(token);
  }

}

const tokenManager = new TokenManager();

module.exports = { tokenManager }