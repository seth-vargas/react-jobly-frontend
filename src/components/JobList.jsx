/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import JoblyApi from "../api/api";
import SearchForm from "./SearchForm";
import JobInfo from "./JobInfo";

export default function JobList({ applyToJob, hasAppliedToJob }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getData() {
      let res = await JoblyApi.getJobs();
      setJobs(res);
    }
    getData();
  }, []);

  return (
    <>
      <h1>Jobs</h1>
      <SearchForm setState={setJobs} type="jobs" />
      {jobs.length ? (
        jobs.map((job) => (
          <JobInfo
            job={job}
            key={job.id}
            applyToJob={applyToJob}
            hasAppliedToJob={hasAppliedToJob}
          />
        ))
      ) : (
        <p className="lead text-danger">Sorry, no match was found.</p>
      )}
    </>
  );
}
