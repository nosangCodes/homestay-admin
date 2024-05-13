import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import AuthLayout from "./pages/auth/layout";
import Home from "./pages/main/home";
import HomeLayout from "./pages/main/layout";
import ProtectedRoutes from "./pages/routes/protectedRoutes";
import Root from "./pages/root";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/",
            element: <HomeLayout />,
            children: [
              {
                index: true,
                element: <Home />,
              },
            ],
          },
        ],
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
    ],
  },
]);

export default router;
