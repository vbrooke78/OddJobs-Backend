express = require("express");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./db/db.js");
const errorHandler = require("./errors/errorHandler");
const morgan = require("morgan");
var fs = require("fs");
var path = require("path");
require("dotenv/config");
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/uploads", express.static("uploads"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/messages", require("./routes/messagesRoutes"));
app.use("/uploads", require("./routes/image"));

//errors
app.use(errorHandler.error_mongoDb);
app.use(errorHandler.error_custom);
app.use(errorHandler.error_pathNotFound);

module.exports = app;
