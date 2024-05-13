import authState from "@/state/atom/auth";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function AuthLayout() {
  const authStateValue = useRecoilValue(authState);
  if (authStateValue.loggedIn) {
    return <Navigate to={"/"} />;
  } else {
    return (
      <section className="h-screen max-w-xl mx-auto px-4 flex justify-center items-center">
        <Outlet />
        <Link to="login">Login</Link>
      </section>
    );
  }
}
