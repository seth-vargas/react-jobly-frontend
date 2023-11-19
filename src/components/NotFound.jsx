import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1>404 Error</h1>
      <h2>Sorry, we could not find the page you were looking for.</h2>
      <Link to={"/"} className="text-decoration-none">
        Go home
      </Link>
    </>
  );
}
