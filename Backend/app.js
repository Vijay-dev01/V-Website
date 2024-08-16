const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

const projects = require("./routes/project");
const auth = require("./routes/auth");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", projects);
app.use("/api/v1", auth);

app.use(errorMiddleware);

module.exports = app;
