import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import AuthLayout from "./pages/auth/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
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
