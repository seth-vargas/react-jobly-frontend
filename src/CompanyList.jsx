import { useEffect, useState } from "react";
import JoblyApi from "../../api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // TODO : Make API Call here
    async function getData() {
      let res = await JoblyApi.getCompanies();
      console.log(res);
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
