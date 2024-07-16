const { User } = require("../db/user.model");
const crypto = require('crypto');

const changePassword = async (req, res, next) => {
  const { password } = req.body;

  if(!password || password.length < 12) {
    return res.status(400).send('Password must be atleast 12 characters');
  }

  const newPassword = hashPassword(password);

  await User.updateOne({
    _id: req.user._id,
  }, {
    password: newPassword
  });

  res.status(200).send();
}

module.exports = {
  changePassword
}

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(password, salt, 100, 16, 'sha512');
  return `${salt.toString('base64')}:${hash.toString('base64')}`;
}
