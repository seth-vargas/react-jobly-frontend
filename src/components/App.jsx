import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

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
import { jwtDecode } from "jwt-decode";
import Loading from "./Loading";

export const TOKEN_STORAGE_ID = "jobly-token";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [user, setUser] = useLocalStorage("user");
  const { auth, setAuth } = useAuth();
  const [jobIds, setJobIds] = useState(new Set([]));
  const [errors, setErrors] = useState([]);

  let location = useLocation();

  useEffect(() => {
    async function checkForToken() {
      if (token) {
        try {
          setIsLoading(true);

          setAuth(token);
          JoblyApi.token = token;

          let { username } = jwtDecode(token);
          let currUser = await JoblyApi.getCurrentUser(username);

          setUser(currUser);
          setJobIds(new Set(currUser?.applications));
        } catch (error) {
          setErrors(error);
          JoblyApi.token = undefined;
          setToken(undefined);
          setUser(undefined);
          setAuth(undefined);
          setJobIds(undefined);
        }
        setIsLoading(false);
      }
    }
    checkForToken();
  }, [token]);

  useEffect(() => {
    setErrors([]);
  }, [location]);

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return jobIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  async function applyToJob(id) {
    try {
      if (hasAppliedToJob(id)) return;
      JoblyApi.applyToJob(user.username, id);
      setJobIds(new Set([...jobIds, id]));
    } catch (error) {
      console.log("error", error);
      setErrors(error);
    }
  }

  if (isLoading) return <Loading />;

  console.log("Rendering App");
  return (
    <>
      <Navbar
        auth={auth}
        setAuth={setAuth}
        setToken={setToken}
        setUser={setUser}
      />
      <main className="container my-3">
        {errors.length > 0 && (
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
              <Route
                path="/companies/:handle"
                element={
                  <Company
                    applyToJob={applyToJob}
                    hasAppliedToJob={hasAppliedToJob}
                  />
                }
              />
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
