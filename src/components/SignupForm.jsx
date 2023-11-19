/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import JoblyApi from "../api/api";
import { useState } from "react";

export default function SignupForm({ setToken, setAuth, setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let res = await JoblyApi.registerUser(data);

      // store token in localStorage & auth
      setToken(res.token);
      setAuth(res.token);
      setUser(res.user);
      JoblyApi.token = res.token;

      // redirect to homepage
      navigate("/");
    } catch (error) {
      setError(error[0]);
    }
  };

  return (
    <>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            autoComplete="none"
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
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            autoComplete="none"
            className="form-control"
            type="password"
            {...register("password", {
              required: true,
              max: 50,
              min: 6,
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
            type="email"
            {...register("email", { required: true })}
          />
        </div>
        <input type="submit" className="btn btn-primary" />
      </form>
      <p className="lead">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </>
  );
}
