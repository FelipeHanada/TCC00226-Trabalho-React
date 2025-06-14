import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import ProfilePageNavbar from "../components/ProfilePageNavbar";

export default function Layout() {
  return (
    <>
      <ProfilePageNavbar />
      <Outlet />
      <Footer />
    </>
  )
}
