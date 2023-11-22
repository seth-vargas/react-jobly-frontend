/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import JoblyApi from "../api/api";

export default function SearchForm({ setState, type, setIsLoading }) {
  const { register, handleSubmit, reset } = useForm();

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      let res;
      if (type === "companies") {
        res = await JoblyApi.getCompanies(data.searchTerm);
      } else if (type === "jobs") {
        res = await JoblyApi.getJobs(data.searchTerm);
      }

      setIsLoading(false);
      setState(res);
      reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-3" autoComplete="off">
      <div className="d-flex gap-2">
        <input
          className="form-control"
          type="search"
          placeholder="Search something"
          {...register("searchTerm")}
        />
      </div>
    </form>
  );
}
