const Project = require("../models/projectModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const APIFeatures = require("../utils/APIFeatures");

exports.getProjects = async (req, res, next) => {
  let resPerPage = 2
  const ApiFetures = new APIFeatures(Project.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const projects = await ApiFetures.query;
  res.status(200).json({
    success: true,
    count: projects.length,
    projects,
  });
};

exports.newProject = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const project = await Project.create(req.body);
  res.status(201).json({
    success: true,
    project,
  });
});

exports.getSingleProject = async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  res.status(201).json({
    success: true,
    project,
  });
};

exports.updateProject = async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    project,
  });
};

exports.deleteProject = async (req, res, next) => {
  let project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
};
