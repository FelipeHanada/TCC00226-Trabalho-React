import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ProfilePage from "../pages/profilePage";
import SearchPage from "../pages/SearchPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "profile",
        element: <ProfilePage />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/search",
    element: <SearchPage />
  }
])

export default router;
