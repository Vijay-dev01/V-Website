const express = require("express");
const {
  getProjects,
  newProject,
  getSingleProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectscontroller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authenticate");
const router = express.Router();

router.route("/projects").get(isAuthenticatedUser, getProjects);
router.route("/project/new").post(isAuthenticatedUser, authorizeRoles("admin"), newProject);
router.route("/project/:id").get(getSingleProject)
                            .put(updateProject)
                            .delete(deleteProject)
module.exports = router;
