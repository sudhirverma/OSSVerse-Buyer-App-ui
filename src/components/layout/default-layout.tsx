import { Outlet } from "react-router-dom";
import NavBar from "./nav-bar";
import Footer from "./footer";

const DefaultLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
