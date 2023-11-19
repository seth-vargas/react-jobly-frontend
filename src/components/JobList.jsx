import { useEffect, useState } from "react";
import JoblyApi from "../api/api";
import SearchForm from "./SearchForm";
import JobInfo from "./JobInfo";

export default function JobList() {
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
        jobs.map((job) => <JobInfo job={job} key={job.id} />)
      ) : (
        <p className="lead text-danger">Sorry, no match was found.</p>
      )}
    </>
  );
}
