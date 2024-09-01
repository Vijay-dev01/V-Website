import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login } from "../../actions/UserAction";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaData from "../Layouts/MetaData";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError());
        },
      });
    }
  }, [error, isAuthenticated, dispatch, navigate, redirect]);

  return (
    <Fragment>
      <MetaData title={`Login`} />
      <div className="container">
        <form onSubmit={submitHandler}>
          <h1 className="mb-3">Login</h1>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <Link to="/password/forgot" className="float-right mb-4">
            Forgot Password?
          </Link>

          <button
            id="login_button"
            type="submit"
            className="btn btn-primary"
            // disabled={loading}
          >
            LOGIN
          </button>

          <Link to="/register" className="float-right mt-3">
            New User?
          </Link>
        </form>
      </div>
    </Fragment>
  );
}
