import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./webpage/pages/Home";
import SignIn from "./webpage/pages/SignIn";
import SignUp from "./webpage/pages/SignUp";

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
