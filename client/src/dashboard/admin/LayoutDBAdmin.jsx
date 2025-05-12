import { Outlet } from "react-router-dom";
import NavbarDashboardAdmin from "../../components/NavbarDBAdmin";
import SidebarDBAdmin from "../../components/SidebarDBAdmin";
import UsersDBAdmin from "../../components/UsersDBAdmin";

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
            </Outlet>
          </main>
        </div>
      </main>
    </>
  );
}
