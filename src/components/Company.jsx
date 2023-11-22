/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobInfo from "./JobInfo";

export default function Company({ applyToJob, hasAppliedToJob }) {
  const [company, setCompany] = useState({});
  const { handle } = useParams();

  useEffect(() => {
    async function getData() {
      const data = await JoblyApi.getCompany(handle);
      setCompany(data);
    }
    getData();
  }, [handle]);
  return (
    <>
      <h1>{company.name}</h1>
      <p className="lead">{company.description}</p>
      <div>
        {company.jobs &&
          company.jobs.map((job) => (
            <JobInfo
              job={job}
              key={job.id}
              applyToJob={applyToJob}
              hasAppliedToJob={hasAppliedToJob}
            />
          ))}
      </div>
    </>
  );
}
