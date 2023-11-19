import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export default function JobInfo({ job, applyToJob, hasAppliedToJob }) {
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (hasAppliedToJob(job.id)) {
      setApplied(true);
    }
  }, [hasAppliedToJob, job.id]);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <h6 className="card-subtitle">{job.name}</h6>
        <p className="card-text mt-3">
          Salary: ${job.salary || 0}
          <br />
          Equity: {job.equity || 0}%
        </p>
        {applied ? (
          <button className="btn btn-outline-primary" disabled>
            Application sent!
          </button>
        ) : (
          <button
            className="btn btn-outline-primary"
            onClick={() => applyToJob(job.id)}
          >
            Apply to job
          </button>
        )}
      </div>
    </div>
  );
}
