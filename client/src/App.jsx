import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./webpages/Home";
import SignIn from "./webpages/SignIn";
import SignUp from "./webpages/SignUp";
import HomeDBAdmin from "./dashboard/admin/HomeDBAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/dashboard" element={<HomeDBAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
