import { useForm } from "react-hook-form";

export default function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-3">
      <div className="d-flex gap-2">
        <input
          className="form-control"
          type="search"
          placeholder="Search something"
          {...register("searchTerm")}
        />

        <input type="submit" className="btn btn-outline-primary" />
      </div>
    </form>
  );
}
