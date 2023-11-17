import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Jobly
        </Link>
        <div>
          <Link to="/companies" className="me-2 text-decoration-none">
            Companies
          </Link>
          <Link to="/jobs" className="me-2 text-decoration-none">
            Jobs
          </Link>
          <Link to="/profile" className="me-2 text-decoration-none">
            Profile
          </Link>
          <Link to="/logout" className="btn btn-danger">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
