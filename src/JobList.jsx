import { useEffect, useState } from "react";
import JoblyApi from "../../api";
import SearchForm from "./SearchForm";
import JobInfo from "./JobInfo";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // TODO : Make API Call here
    async function getData() {
      let res = await JoblyApi.getJobs();
      console.log(res);
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
