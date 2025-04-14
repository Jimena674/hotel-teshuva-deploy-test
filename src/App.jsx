import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./webpage/pages/Home";
import SignIn from "./webpage/pages/SignIn";
import SignUp from "./webpage/pages/SignUp";
import SearchBooking from "./webpage/pages/SearchBooking";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/searchBooking" element={<SearchBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
