import { useEffect, useState } from "react";
import JoblyApi from "../../api/api";
import CompanyCard from "./CompanyCard";
import SearchForm from "../forms/SearchForm";
import Loading from "../Loading";

export default function CompanyList() {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        let res = await JoblyApi.getCompanies();
        setCompanies(res);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  if (isLoading)
    return (
      <>
        <h1>Companies</h1>
        <Loading />
      </>
    );

  return (
    <>
      <h1>Companies</h1>
      <SearchForm
        setState={setCompanies}
        type="companies"
        setIsLoading={setIsLoading}
      />
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
