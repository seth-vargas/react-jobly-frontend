import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import Navbar from "./Navbar";
import EditProfileForm from "./EditProfileForm";
import NotFound from "./NotFound";
import Company from "./Company";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container my-3">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:handle" element={<Company />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/profile" element={<EditProfileForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
