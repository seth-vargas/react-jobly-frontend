export default function JobInfo({ title, salary, equity, name }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle">{name}</h6>
        <p className="card-text mt-3">
          Salary: ${salary || 0}
          <br />
          Equity: {equity || 0}%
        </p>
      </div>
    </div>
  );
}
