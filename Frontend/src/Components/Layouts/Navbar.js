import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { mypic } from "../../imagedata";
import { useDispatch, useSelector } from "react-redux";
import { DropdownButton, Dropdown, Image } from "react-bootstrap";
import { logout } from "../../actions/UserAction";

const Navbar = (props) => {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const resumeLink =
    "https://drive.google.com/file/d/1jsdzixqW2CTISVjCAe2VSFDAYTmjCK0c/view";

  const handleResumeClick = () => {
    window.open(resumeLink, "_blank");
  };

  const iconStyle = {
    backgroundColor: "transparent",
    border: "none",
  };

//   const { items:cartItems } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
      dispatch(logout);
    }

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${
          props.mode === "light" ? "white" : "dark"
        }
    text-${props.mode === "light" ? "white" : "dark"} `}
      >
        <div className="container py-2">
          <Link className="navbar-brand" to="/home">
            <img
              src={mypic}
              alt="Logo"
              className="rounded-circle"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            Vijay G
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse align-middle" id="navbarNav">
            <ul className="navbar-nav ms-auto nav_ul align-items-center">
              <li className="nav-item">
                <Link
                  className={`text-${
                    props.mode === "light" ? "dark" : "white"
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`text-${
                    props.mode === "light" ? "dark" : "white"
                  }`}
                  to="/skills"
                >
                  Skills
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`text-${
                    props.mode === "light" ? "dark" : "white"
                  }`}
                  to="/project"
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`text-${
                    props.mode === "light" ? "dark" : "white"
                  }`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`text-${
                    props.mode === "light" ? "dark" : "white"
                  }`}
                  onClick={handleResumeClick}
                >
                  Resume
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className={`dropdown-toggle text-${
                    props.mode === "light" ? "dark" : "white"
                  }`}
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/certificates">
                      Certificates
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <div className="mx-3">
                {isAuthenticated ? (
                  <Dropdown className="d-inline">
                    <Dropdown.Toggle
                      variant="default text-white pr-5"
                      id="dropdown-basic"
                    >
                      <figure className="avatar avatar-nav">
                        <Image
                          width="50px"
                          src={user.avatar ?? "./images/default_avatar.png"}
                        />
                      </figure>
                      <span>{user.name}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {user.role === "admin" && (
                        <Dropdown.Item
                          onClick={() => {
                            navigate("admin/dashboard");
                          }}
                          className="text-dark"
                        >
                          Dashboard
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item
                        onClick={() => {
                          navigate("/myprofile");
                        }}
                        className="text-dark"
                      >
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          navigate("/orders");
                        }}
                        className="text-dark"
                      >
                        Orders
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={logoutHandler}
                        className="text-danger"
                      >
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Link to="/login" type="button" className="btn1 mx-2">
                    Login
                  </Link>
                )}
                {/* <Link to="/signup" type="button" className="btn2 mx-2">Sign Up</Link> */}
                <Link to="/register" type="button" className="btn2 mx-2">
                  Register
                </Link>
              </div>
              <div
                className={`form-check form-switch ms-5 text-${
                  props.mode === "light" ? "dark" : "white"
                }`}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  onClick={props.tooglemode}
                  id="flexSwitchCheckDefault"
                />
                <label
                  className={`form-check-label text-${props.text}`}
                  htmlFor="flexSwitchCheckDefault"
                >
                  Enable {props.mode} Mode
                </label>
              </div>
              <li className="nav-item ms-5">
                {/* <button onClick={() => signOut(firebaseAuth)} className={`text-${props.mode === 'light' ? 'dark' : 'white'}`} style={iconStyle}>
                                    <FontAwesomeIcon icon={faPowerOff} />
                                </button> */}
                <button
                  className={`text-${
                    props.mode === "light" ? "dark" : "white"
                  }`}
                  style={iconStyle}
                >
                  <FontAwesomeIcon icon={faPowerOff} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
