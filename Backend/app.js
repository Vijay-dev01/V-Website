const express = require("express");
const app = express();

const projects = require("./routes/project");

app.use("/api/v1", projects);

module.exports = app;
