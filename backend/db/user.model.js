const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});

userSchema.methods.toJSON = function() {
  let obj = this.toObject();
  delete obj.password;
  return obj;
}

const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema }