import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import UsersAdmin from "./components/admin/UsersAdmin";
import RoomsAdmin from "./components/admin/RoomsAdmin";
import BookingsAdmin from "./components/admin/BookingsAdmin";
import FacilitiesAdmin from "./components/admin/FacilitiesAdmin";
import OffersAdmin from "./components/admin/OffersAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route path="users" element={<UsersAdmin />} />
          <Route path="rooms" element={<RoomsAdmin />} />
          <Route path="bookings" element={<BookingsAdmin />} />
          <Route path="offers" element={<OffersAdmin />} />
          <Route path="facilities" element={<FacilitiesAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
