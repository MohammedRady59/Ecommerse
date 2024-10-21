import { Outlet } from "react-router-dom";
import Navbar from "../Components/UI/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
