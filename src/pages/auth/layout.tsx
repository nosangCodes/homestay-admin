import authState from "@/state/atom/auth";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function AuthLayout() {
  const auth = useRecoilValue(authState);
  return auth?.loggedIn ? (
    <Navigate to={"/stats"} />
  ) : (
    <section className="h-screen max-w-xl mx-auto px-4 flex justify-center items-center">
      <Outlet />
    </section>
  );
}
