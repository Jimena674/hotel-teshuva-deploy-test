import { Outlet } from "react-router-dom";
import NavbarDashboardAdmin from "../../components/admin/NavbarDBAdmin";
import SidebarDBAdmin from "../../components/admin/SidebarDBAdmin";
import UsersDBAdmin from "../../components/admin/UsersDBAdmin";
import RoomsDBAdmin from "../../components/admin/RoomsDBAdmin";

export default function LayoutDBAdmin() {
  return (
    <>
      <NavbarDashboardAdmin />

      <main>
        <div className="row">
          <div className="col-2">
            <SidebarDBAdmin />
          </div>
          <main className="col-10">
            <Outlet>
              <UsersDBAdmin />
              <RoomsDBAdmin />
            </Outlet>
          </main>
        </div>
      </main>
    </>
  );
}
