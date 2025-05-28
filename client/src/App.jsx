import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./webpages/Home";
import SignIn from "./webpages/SignIn";
import SignUp from "./webpages/SignUp";
import LayoutAdmin from "./dashboard/admin/LayoutAdmin";
import UsersAdmin from "./components/admin/UsersAdmin";
import RoomsAdmin from "./components/admin/RoomsAdmin";
import BookingsAdmin from "./components/admin/BookingsAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/dashboard" element={<LayoutAdmin />}>
          <Route path="users" element={<UsersAdmin />} />
          <Route path="rooms" element={<RoomsAdmin />} />
          <Route path="bookings" element={<BookingsAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
