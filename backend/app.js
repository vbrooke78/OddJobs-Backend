express = require("express");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./db/db.js");
const errorHandler = require("./errors/errorHandler");
connectDB();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//
app.use("/api/users", require("./routes/userRoutes"));
//
app.use("/api/users", require("./routes/userRoutes"));
//
app.use("/api/jobs", require("./routes/jobRoutes"));
//

//errors
app.use(errorHandler.error_pathNotFound);
app.use(errorHandler.error_custom);

module.exports = app;

