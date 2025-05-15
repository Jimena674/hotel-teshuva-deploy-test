import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./webpages/Home";
import SignIn from "./webpages/SignIn";
import SignUp from "./webpages/SignUp";
import LayoutDBAdmin from "./dashboard/admin/LayoutDBAdmin";
import UsersDBAdmin from "./components/admin/UsersDBAdmin";
import RoomsDBAdmin from "./components/admin/RoomsDBAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/dashboard" element={<LayoutDBAdmin />}>
          <Route path="users" element={<UsersDBAdmin />} />
          <Route path="rooms" element={<RoomsDBAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
