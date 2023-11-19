import { useEffect, useState } from "react";
import JoblyApi from "./api/api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getData() {
      let res = await JoblyApi.getCompanies();
      setCompanies(res);
    }
    getData();
  }, []);

  return (
    <>
      <h1>Companies</h1>
      <SearchForm setState={setCompanies} type="companies" />
      {companies.length ? (
        companies.map((company) => (
          <CompanyCard company={company} key={company.handle} />
        ))
      ) : (
        <p className="lead text-danger">Sorry, no match was found.</p>
      )}
    </>
  );
}
