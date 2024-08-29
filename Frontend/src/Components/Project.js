import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../actions/ProjectAction";
import Loader from "./Layouts/Loader";
import { toast } from "react-toastify";
import ProjectModal from "./ProjectDetail";
import Pagination from "react-js-pagination";

const Project = (props) => {
  const dispatch = useDispatch();
  const { projects, loading, error, projectsCount, resPerPage } = useSelector(
    (state) => state.projectsState
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProjects(null, null, null, null, currentPage));
  }, [error, dispatch, currentPage]);

  const handleShowModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto mt-4">
          <Link to="/project/addproject" className="btn btn-primary my-3">
            <i className="fas fa-plus"></i> Add Project
          </Link>
          <div className="row">
            {projects &&
              projects.map((project) => (
                <div className="col-md-4" key={project._id}>
                  <div
                    className={`card ${
                      props.mode === "light" ? "light-card" : "dark-card"
                    }`}
                    style={{ width: "25rem" }}
                  >
                    <img
                      src={project.images[0]?.image}
                      className="card-img-top"
                      alt="..."
                      style={{ cursor: "pointer" }}
                      onClick={() => handleShowModal(project)}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{project.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {project.title}
                      </h6>
                      <p className="card-text">{project.description}</p>
                      <Link
                        to={project.siteLike}
                        target="_blank"
                        className={`btn ${
                          props.mode === "light" ? "btn-dark" : "btn-light"
                        }`}
                      >
                        <i className="fas fa-link"></i> Visit Site
                      </Link>
                      <Link
                        to={project.githubLink}
                        target="_blank"
                        className={`btn ${
                          props.mode === "light" ? "btn-dark" : "btn-light"
                        }`}
                      >
                        <i className="fab fa-github"></i> Github
                      </Link>
                    </div>
                    <div className="card-footer">
                      {project.skills.map((skill) => (
                        <span
                          key={skill._id}
                          className="badge rounded-pill text-dark bg-light"
                          style={{ padding: "5px 10px", margin: "5px" }}
                        >
                          {skill.skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {projectsCount > 0 && projectsCount > resPerPage ? (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={projectsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          ) : null}
        </div>
      )}

      <ProjectModal
        show={showModal}
        handleClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  );
};

export default Project;
