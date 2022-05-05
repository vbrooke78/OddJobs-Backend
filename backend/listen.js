const app = require('./app.js');
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
console.log('port', port)
const chatServer = require('./chatServer.js');

chatServer.start();
app.listen(port, () => console.log(`server started on ${port}`));