/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function LoggedOut() {
  return (
    <>
      <div className="d-flex gap-2 align-items-center">
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
        or
        <Link to="/signup" className="btn btn-primary">
          Signup
        </Link>
      </div>
    </>
  );
}
export default function Homepage({ auth, user }) {
  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <h1>Jobly</h1>

      <p className="lead">All the jobs in one place</p>

      {!auth && <LoggedOut />}
      {user && <p className="fs-4">Welcome back, {user.firstName}.</p>}
    </div>
  );
}
