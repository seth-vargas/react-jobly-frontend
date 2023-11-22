/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function CompanyCard({ company }) {
  return (
    <Link
      className="card mb-3 box text-decoration-none"
      to={`/companies/${company.handle}`}
    >
      <div className="card-body">
        <h5 className="card-title">{company.name}</h5>
        <p className="card-text mt-3">{company.description}</p>
      </div>
    </Link>
  );
}
