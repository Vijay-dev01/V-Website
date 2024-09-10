import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewProject } from "../actions/ProjectAction";
import { toast } from "react-toastify";
import { clearError, clearProjectCreated } from "../slices/ProjectSlice";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [siteLink, setSiteLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [skills, setSkills] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isProjectCreated, error } = useSelector(
    (state) => state.projectState
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("siteLink", siteLink);
    formData.append("githubLink", githubLink);

    // Convert skills array to the correct structure
    const formattedSkills = skills.map((skill) => ({ skill }));
    formData.append("skills", JSON.stringify(formattedSkills));

    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(createNewProject(formData));
  };

  useEffect(() => {
    if (isProjectCreated) {
      toast.success("Project Created Successfully!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      // Clear the project creation state after showing toast
      dispatch(clearProjectCreated());
      // Navigate after project creation
      navigate("/project");
    }

    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      // Clear the error state after showing toast
      dispatch(clearError());
    }
  }, [isProjectCreated, error, dispatch, navigate]);

  return (
    <div className="row">
      <div className="col-12 col-md-10">
        <Fragment>
          <div className="wrapper my-5">
            <form
              onSubmit={submitHandler}
              className="shadow-lg"
              encType="multipart/form-data"
            >
              <h1 className="mb-4">New Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="title_field">Title</label>
                <input
                  type="text"
                  id="title_field"
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>

              <div className="form-group">
                <label htmlFor="siteLink_field">Site Link</label>
                <input
                  type="text"
                  id="siteLink_field"
                  className="form-control"
                  onChange={(e) => setSiteLink(e.target.value)}
                  value={siteLink}
                />
              </div>

              <div className="form-group">
                <label htmlFor="githubLink_field">Github Link</label>
                <input
                  type="text"
                  id="githubLink_field"
                  className="form-control"
                  onChange={(e) => setGithubLink(e.target.value)}
                  value={githubLink}
                />
              </div>

              <div className="form-group">
                <label htmlFor="skills_field">Skills</label>
                <input
                  type="text"
                  id="skills_field"
                  className="form-control"
                  onChange={(e) => setSkills(e.target.value.split(","))} // Parse CSV input to array
                  value={skills}
                />
              </div>

              <div className="form-group">
                <label>Images</label>

                <div className="custom-file">
                  <input
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    multiple
                    onChange={onImagesChange}
                  />

                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>
                {imagesPreview.map((image) => (
                  <img
                    className="mt-3 mr-2"
                    key={image}
                    src={image}
                    alt={`Image Preview`}
                    width="55"
                    height="52"
                  />
                ))}
              </div>

              <button
                id="login_button"
                type="submit"
                disabled={loading}
                className="btn btn-block py-3"
              >
                CREATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
