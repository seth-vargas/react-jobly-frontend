/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import JoblyApi from "../api/api";
import SearchForm from "./SearchForm";
import JobInfo from "./JobInfo";
import Loading from "./Loading";

export default function JobList({ applyToJob, hasAppliedToJob }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        let res = await JoblyApi.getJobs();
        setJobs(res);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    getData();
  }, []);

  if (isLoading)
    return (
      <>
        <h1>Jobs</h1>
        <Loading />
      </>
    );

  return (
    <>
      <h1>Jobs</h1>
      <SearchForm setState={setJobs} type="jobs" setIsLoading={setIsLoading} />
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
