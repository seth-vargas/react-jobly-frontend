/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import JoblyApi from "../api/api";

export default function Navbar({
  auth,
  setAuth,
  setToken,
  setUser,
  setJobIds,
}) {
  const navigate = useNavigate();

  function logout() {
    // Reset auth value & remove localStorage token
    setAuth(undefined);
    setToken(undefined);
    setUser(undefined);
    JoblyApi.token = undefined;
    setJobIds(undefined);

    navigate("/login");
  }

  function LoggedIn() {
    return (
      <div className="d-flex align-items-center">
        <Link to="/companies" className="me-2 text-decoration-none text-light">
          Companies
        </Link>
        <Link to="/jobs" className="me-2 text-decoration-none text-light">
          Jobs
        </Link>
        <Link to="/profile" className="me-2 text-decoration-none text-light">
          Profile
        </Link>
        <button className="btn btn-outline-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  function LoggedOut() {
    return (
      <div className="d-flex align-items-center gap-2">
        <Link to="/login" className="btn btn-primary">
          Log in
        </Link>
        <Link to="/signup" className="btn btn-secondary">
          Sign up
        </Link>
      </div>
    );
  }
  return (
    <nav className="navbar navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Jobly
        </Link>
        {auth ? <LoggedIn /> : <LoggedOut />}
      </div>
    </nav>
  );
}
