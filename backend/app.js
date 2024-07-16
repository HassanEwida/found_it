const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const http = require('http');
const { router } = require('./router');
const { initDB } = require("./db/mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: 1024 * 1024 * 1000 }));
app.use(cors({ credentials: true, origin: true }));

router(app);

initDB().then(() => console.log('DB connected')).catch(err => console.error('DB connection failed', err));

const server = http.createServer(app);

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});