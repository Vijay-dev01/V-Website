const express = require("express");
const { getProjects } = require("../controllers/projectscontroller");
const router = express.Router();

router.route("/projects").get(getProjects);

module.exports = router;
