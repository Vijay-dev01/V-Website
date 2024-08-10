const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");

const projects = require("./routes/project");

app.use(express.json());
app.use("/api/v1", projects);

app.use(errorMiddleware);

module.exports = app;
