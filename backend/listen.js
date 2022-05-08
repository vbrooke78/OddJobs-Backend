const app = require('./app.js');
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5050;
console.log('port', port)
const chatServer = require('./chatServer.js');


const server = app.listen(port, () => console.log(`server started on ${port}`));
chatServer.start(server);