import { createBrowserRouter } from "react-router-dom";
import {
  Admins,
  AuthLayout,
  CreateRoom,
  HomeLayout,
  Login,
  ProtectedRoutes,
  Room,
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
                path: "rooms",
                element: <Rooms />,
              },
              {
                path: "rooms/:id",
                element: <Room />,
              },
              {
                path: "rooms/new",
                element: <CreateRoom />,
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
