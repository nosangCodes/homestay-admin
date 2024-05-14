import authState from "@/state/atom/auth";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function ProtectedRoutes() {
  const auth = useRecoilValue(authState);

  return auth.loggedIn ? <Outlet /> : <Navigate to={"/auth/login"} />;
}
