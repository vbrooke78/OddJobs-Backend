const app = require('./app.js');
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
console.log('port', port)

app.listen(port, () => console.log(`server started on ${port}`));