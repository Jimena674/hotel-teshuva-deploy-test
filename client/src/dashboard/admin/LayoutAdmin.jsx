import { Outlet } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import UsersAdmin from "../../components/admin/UsersAdmin";
import RoomsAdmin from "../../components/admin/RoomsAdmin";
import BookingsAdmin from "../../components/admin/BookingsAdmin";

export default function LayoutDBAdmin() {
  return (
    <>
      <NavbarAdmin />

      <main>
        <div className="row">
          <div className="col-2">
            <SidebarAdmin />
          </div>
          <main className="col-10">
            <Outlet>
              <UsersAdmin />
              <RoomsAdmin />
              <BookingsAdmin />
            </Outlet>
          </main>
        </div>
      </main>
    </>
  );
}
