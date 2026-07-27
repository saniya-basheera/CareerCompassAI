import { Routes, Route } from "react-router-dom";
import JobMatcher from "./pages/JobMatcher";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import MockInterview from "./pages/MockInterview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resume-builder" element={<ResumeBuilder />} />
      <Route path="/job-matcher" element={<JobMatcher />} />
      <Route path="/mock-interview" element={<MockInterview />} />
    </Routes>
  );
}

export default App;