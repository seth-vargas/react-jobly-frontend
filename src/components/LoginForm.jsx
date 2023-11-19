/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import JoblyApi from "../api/api";

export default function LoginForm({ setToken, setAuth, setUser, setErrors }) {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      let res = await JoblyApi.loginUser(data);

      setToken(res.token);
      setAuth(res.token);
      setUser(res.user);
      JoblyApi.token = res.token;

      navigate("/");
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
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
        <input type="submit" className="btn btn-primary" />
      </form>
      <p className="lead">
        Need an account? <Link to="/signup">Sign Up</Link>
      </p>
    </>
  );
}
