const mongoose = require('mongoose');

const initDB = async () => {
  await mongoose.connect('mongodb+srv://root:toor@foundit-cluster.8aimnfo.mongodb.net/foundit?retryWrites=true&w=majority&appName=foundit-cluster')
}

module.exports = { initDB }