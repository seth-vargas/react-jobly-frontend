import { useForm } from "react-hook-form";

export default function EditProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            autoComplete="none"
            disabled
            className="form-control"
            type="text"
            {...register("username", {
              required: true,
              max: 50,
              min: 1,
              maxLength: 50,
            })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            id="firstName"
            autoComplete="none"
            className="form-control"
            type="text"
            {...register("firstName", {
              required: true,
              max: 50,
              min: 1,
              maxLength: 50,
            })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            id="lastName"
            autoComplete="none"
            className="form-control"
            type="text"
            {...register("lastName", {
              required: true,
              max: 50,
              min: 1,
              maxLength: 50,
            })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            autoComplete="none"
            className="form-control"
            type="text"
            {...register("email", { required: true })}
          />
        </div>
        <input type="submit" className="btn btn-primary" />
      </form>
    </>
  );
}
