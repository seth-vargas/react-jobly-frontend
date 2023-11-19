import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Homepage from "./Homepage";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import Navbar from "./Navbar";
import EditProfileForm from "./EditProfileForm";
import NotFound from "./NotFound";
import Company from "./Company";
import RequireAuth from "./RequireAuth";

import useLocalStorage from "../hooks/useLocalStorage";
import useAuth from "../hooks/useAuth";
import JoblyApi from "../api/api";

export const TOKEN_STORAGE_ID = "jobly-token";

export default function App() {
  console.log("Rendering App");
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [user, setUser] = useLocalStorage("user");
  const { auth, setAuth } = useAuth();
  const [jobIds, setJobIds] = useState(new Set([]));
  const [errors, setErrors] = useState();

  console.log("JoblyApi.token:", JoblyApi.token);
  console.log("Current User:", user);

  useEffect(() => {
    async function checkForToken() {
      if (token && user) {
        try {
          setAuth(token);
          setUser(user);
          JoblyApi.token = token;
          setJobIds(new Set(user.applications));
        } catch (error) {
          console.error("Issue loading", error);
          setToken(undefined);
          setUser(undefined);
          setAuth(undefined);
          setJobIds(undefined);
        }
      }
    }

    checkForToken();
  }, [token, auth, setAuth, user, setUser, setToken]);

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return jobIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    try {
      if (hasAppliedToJob(id)) return;
      JoblyApi.applyToJob(user.username, id);
      setJobIds(new Set([...jobIds, id]));
    } catch (error) {
      console.log("error", error);
      setErrors(error);
    }
  }

  return (
    <>
      <Navbar
        auth={auth}
        setAuth={setAuth}
        setToken={setToken}
        setUser={setUser}
      />
      <main className="container my-3">
        {errors && (
          <ul className="alert alert-danger text-center">
            {errors.map((err) => (
              <li key={err} className="list-unstyled">
                {err}
              </li>
            ))}
          </ul>
        )}
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route path="/" element={<Homepage auth={auth} user={user} />} />
            <Route
              path="/login"
              element={
                <LoginForm
                  setToken={setToken}
                  setAuth={setAuth}
                  setUser={setUser}
                  setErrors={setErrors}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <SignupForm
                  setToken={setToken}
                  setAuth={setAuth}
                  setUser={setUser}
                  setErrors={setErrors}
                />
              }
            />

            {/* Protected Routes */}
            <Route element={<RequireAuth />}>
              <Route path="/companies" element={<CompanyList />} />
              <Route path="/companies/:handle" element={<Company />} />
              <Route
                path="/jobs"
                element={
                  <JobList
                    applyToJob={applyToJob}
                    hasAppliedToJob={hasAppliedToJob}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <EditProfileForm
                    user={user}
                    setUser={setUser}
                    setErrors={setErrors}
                  />
                }
              />
            </Route>

            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}
