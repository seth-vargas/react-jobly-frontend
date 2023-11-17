export default function CompanyInfo({ name, description }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text mt-3">{description}</p>
      </div>
    </div>
  );
}
