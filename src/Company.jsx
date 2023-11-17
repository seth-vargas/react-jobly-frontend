import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api";
import JobInfo from "./JobInfo";

export default function Company() {
  const [company, setCompany] = useState({});
  const { handle } = useParams();
  console.log(handle);

  useEffect(() => {
    async function getData() {
      // TODO : Make API call here to get company by handle from URL params
      const data = await JoblyApi.getCompany(handle);
      console.log(data);
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
          company.jobs.map((job) => <JobInfo job={job} key={job.id} />)}
      </div>
    </>
  );
}
