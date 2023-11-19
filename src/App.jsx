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

import useLocalStorage from "./hooks/useLocalStorage";
import useAuth from "./hooks/useAuth";

export const TOKEN_STORAGE_ID = "jobly-token";

export default function App() {
  console.log("Rendering App");
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    async function checkForToken() {
      if (token) {
        try {
          setAuth(token);
        } catch (error) {
          console.error("Issue loading", error);
          setAuth(null);
        }
      }
    }

    checkForToken();
  }, [token, auth, setAuth]);

  return (
    <>
      <Navbar auth={auth} setAuth={setAuth} setToken={setToken} />
      <main className="container my-3">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route path="/" element={<Homepage auth={auth} />} />
            <Route
              path="/login"
              element={<LoginForm setToken={setToken} setAuth={setAuth} />}
            />
            <Route
              path="/signup"
              element={<SignupForm setToken={setToken} setAuth={setAuth} />}
            />

            {/* Protected Routes */}
            <Route element={<RequireAuth />}>
              <Route path="/companies" element={<CompanyList />} />
              <Route path="/companies/:handle" element={<Company />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/profile" element={<EditProfileForm />} />
            </Route>

            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}
