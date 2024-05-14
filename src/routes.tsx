import { createBrowserRouter } from "react-router-dom";
import {
  Admins,
  AuthLayout,
  Home,
  HomeLayout,
  Login,
  ProtectedRoutes,
  Rooms,
  Root,
  Stats,
} from "./pages";

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
              {
                path: "rooms",
                element: <Rooms />,
              },
              {
                path: "admins",
                element: <Admins />,
              },
              {
                path: "stats",
                element: <Stats />,
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
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

export default router;
