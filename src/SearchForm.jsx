/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import JoblyApi from "../../api";

export default function SearchForm({ setState, type }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  async function onSubmit(data) {
    let res;
    if (type === "companies") {
      res = await JoblyApi.getCompanies(data.searchTerm);
    } else if (type === "jobs") {
      res = await JoblyApi.getJobs(data.searchTerm);
    }
    console.log(res);
    setState(res);
    reset();
  }
  console.log("Errors:", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-3" autoComplete="off">
      <div className="d-flex gap-2">
        <input
          className="form-control"
          type="search"
          placeholder="Search something"
          {...register("searchTerm")}
        />

        {/* <input type="submit" className="btn btn-outline-primary" /> */}
      </div>
    </form>
  );
}
