const { User } = require("../db/user.model");

const crypto = require('crypto');
const { tokenManager } = require("../token-manager");


const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username.toLowerCase() });

    if(!user) {
      res.status(404).send('User does not exist');
      return;
    }

    const passwordMatch = comparePassword(user.password, password);

    if(!passwordMatch) {
      res.status(400).send('Incorrect credentials');
      return;
    }

    const token = tokenManager.addToken(user);

    res.status(200).send({
      user,
      token
    });

  } catch(err) {
    res.status(500).send('Internal server error');
  }
}

const register = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    if(!username || !password || !email) {
      res.status(400).send('Missing data');
      return;
    }

    const userExists = await User.findOne({ username: username.toLowerCase() });

    if(userExists) {
      res.status(400).send('User already exists');
      return;
    }

    const hashedPassword = hashPassword(password);

    await User.create({
      username: username.toLowerCase(),
      email,
      password: hashedPassword
    });

    res.status(200).send();
  } catch(err) {
    res.status(500).send('Internal server error');
  }
}

const signOut = async (req, res, next) => {
  tokenManager.deleteToken(req.token);
  res.redirect('./login');
  // res.status(200).send();
}

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(password, salt, 100, 16, 'sha512');
  return `${salt.toString('base64')}:${hash.toString('base64')}`;
}

const comparePassword = (hashedPassword, requestPassword) => {
  const salt = hashedPassword.split(":")[0];
  const hashedDBPassword = hashedPassword.split(":")[1];
  const hashedRequestPassword = crypto.pbkdf2Sync(requestPassword, Buffer.from(salt, 'base64'), 100, 16, 'sha512');

  return hashedRequestPassword.toString('base64') === hashedDBPassword;
}

module.exports = {
  login,
  register,
  signOut
}
