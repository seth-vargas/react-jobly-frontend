import { useEffect, useState } from "react";
import JoblyApi from "../../api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // TODO : Make API Call here
    async function getData() {
      const data = await JoblyApi.request(`companies`);
      setCompanies(data.companies);
    }
    getData();
  }, []);

  return (
    <>
      <h1>Companies</h1>
      <SearchForm />
      {companies &&
        companies.map((company) => (
          <CompanyCard company={company} key={company.handle} />
        ))}
    </>
  );
}
