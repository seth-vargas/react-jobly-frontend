/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import JoblyApi from "../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EditProfileForm({ user, setUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const newUser = await JoblyApi.editUser(data, user.username);
      newUser.applications = user.applications;
      setUser(newUser);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

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
            defaultValue={user.username}
            {...register("username")}
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
            defaultValue={user.firstName}
            {...register("firstName")}
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
            defaultValue={user.lastName}
            {...register("lastName")}
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
            defaultValue={user.email}
            {...register("email")}
          />
        </div>
        {isLoading ? (
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        ) : (
          <input type="submit" className="btn btn-primary" />
        )}
      </form>
    </>
  );
}
