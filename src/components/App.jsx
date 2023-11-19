import { useEffect } from "react";
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

  console.log("JoblyApi.token:", JoblyApi.token);

  useEffect(() => {
    async function checkForToken() {
      if (token && user) {
        try {
          setAuth(token);
          setUser(user);
          JoblyApi.token = token;
        } catch (error) {
          console.error("Issue loading", error);
          setToken(undefined);
          setUser(undefined);
          setAuth(undefined);
        }
      }
    }

    checkForToken();
  }, [token, auth, setAuth, user, setUser, setToken]);

  return (
    <>
      <Navbar
        auth={auth}
        setAuth={setAuth}
        setToken={setToken}
        setUser={setUser}
      />
      <main className="container my-3">
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
                />
              }
            />

            {/* Protected Routes */}
            <Route element={<RequireAuth />}>
              <Route path="/companies" element={<CompanyList />} />
              <Route path="/companies/:handle" element={<Company />} />
              <Route path="/jobs" element={<JobList />} />
              <Route
                path="/profile"
                element={<EditProfileForm user={user} setUser={setUser} />}
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
