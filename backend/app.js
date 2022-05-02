express = require("express");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./errors/errorHandler");
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
app.use(errorHandler);

module.exports = app;

