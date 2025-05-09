import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./webpages/Home";
import SignIn from "./webpages/SignIn";
import SignUp from "./webpages/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
