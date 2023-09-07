import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "../pages/Layout";
import LoginPage from "../pages/LoginPage";
import Notification from "../pages/Notification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "notification", element: <Notification /> },
    ],
  },
  { path: "login", element: <LoginPage /> },
]);

export default router;
