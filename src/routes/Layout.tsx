import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import ProfilePageNavbar from "../components/ProfilePageNavbar";
import useSyncFavorites from "../hooks/useSyncFavorites";

export default function Layout() {
  useSyncFavorites();

  return (
    <>
      <ProfilePageNavbar />
      <Outlet />
      <Footer />
    </>
  )
}
