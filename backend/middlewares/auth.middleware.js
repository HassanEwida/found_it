const { tokenManager } = require("../token-manager");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if(!authHeader) {
      res.status(401).send('Authorization header missing');
      return;
    }
  
    const token = authHeader.split(' ')[1];

    if(!tokenManager.validateToken(token)) {
      res.status(401).send('Unauthorized');
      return;
    }

    req.user = tokenManager.getUserByToken(token);
    req.token = token;
  } catch(err) {
    res.status(500).send('Internal server error');
    return;
  }

  next();
}

module.exports = authMiddleware;