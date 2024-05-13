import authState from "@/state/atom/auth";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { me } from "./routes/api";

export default function Root() {
  const setAuth = useSetRecoilState(authState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    me()
      .then((res) => {
        console.log(res);
        setAuth({ loggedIn: true });
      })
      .catch((err) => {
        console.error("user check error", JSON.stringify(err));
      })
      .finally(() => setLoading(false));
  }, [setAuth]);

  if (loading) return <h1>Loading...</h1>;
  
  return <Outlet />;
}
