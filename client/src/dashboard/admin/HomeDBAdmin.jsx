import NavbarDashboardAdmin from "../../components/NavbarDBAdmin";
import SidebarDBAdmin from "../../components/SidebarDBAdmin";

export default function HomoDBAdmin() {
  return (
    <>
      <NavbarDashboardAdmin />

      <main>
        <div className="row">
          {" "}
          <div className="col-2">
            <SidebarDBAdmin />
          </div>
          <div className="col-10"></div>
        </div>
      </main>
    </>
  );
}
