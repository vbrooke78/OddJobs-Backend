express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
const connectDB = require("./db/db.js");
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
app.listen(port, () => console.log(`server started on ${port}`));
