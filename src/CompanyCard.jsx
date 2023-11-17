/* eslint-disable react/prop-types */
export default function CompanyCard({ company }) {
  return (
    <div className="card mb-3 box">
      <div className="card-body">
        <h5 className="card-title">{company.name}</h5>
        <p className="card-text mt-3">{company.description}</p>
        <a href={`/companies/${company.handle}`} className="stretched-link"></a>
      </div>
    </div>
  );
}
