import { useEffect, useState } from "react";
import JoblyApi from "../../api";
import SearchForm from "./SearchForm";
import JobInfo from "./JobInfo";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // TODO : Make API Call here
    async function getData() {
      const data = await JoblyApi.request(`jobs`);
      setJobs(data.jobs);
    }
    getData();
  }, []);

  return (
    <>
      <h1>Jobs</h1>
      <SearchForm />
      {jobs && jobs.map((job) => <JobInfo job={job} key={job.id} />)}
    </>
  );
}
