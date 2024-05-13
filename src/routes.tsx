import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import AuthLayout from "./pages/auth/layout";
import Home from "./pages/main/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
