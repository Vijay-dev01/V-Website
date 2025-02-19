const Project = require("../models/projectModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const APIFeatures = require("../utils/APIFeatures");

exports.getProjects = async (req, res, next) => {
  let resPerPage = 3
  const ApiFetures = new APIFeatures(Project.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const projects = await ApiFetures.query;
  const totalProjectsCount = await Project.countDocuments({});
  res.status(200).json({
    success: true,
    count: totalProjectsCount,
    resPerPage,
    projects,
  });
};

exports.newProject = catchAsyncError(async (req, res, next) => {
  let images = [];
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get('host')}`;
  }

  if (req.files.length > 0) {
    req.files.forEach(file => {
      let url = `${BASE_URL}/uploads/projects/${file.originalname}`;
      images.push({ image: url });
    });
  }

  req.body.images = images;
  req.body.user = req.user.id;

  // Parse the skills if passed as a JSON string
  if (typeof req.body.skills === "string") {
    req.body.skills = JSON.parse(req.body.skills);
  }

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
