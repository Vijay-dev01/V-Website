const express = require("express");
const {
  getProjects,
  newProject,
  getSingleProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectscontroller");
const router = express.Router();

router.route("/projects").get(getProjects);
router.route("/project/new").post(newProject);
router.route("/project/:id").get(getSingleProject)
                            .put(updateProject)
                            .delete(deleteProject)
module.exports = router;
