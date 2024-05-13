import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <section className="flex flex-row h-screen bg-zinc-950 text-white w-full">
      <aside className="w-[280px] bg-zinc-900 shadow-md overflow-hidden rounded-sm fixed left-0 inset-y-0 my-3 ml-2">
        <Sidebar />
      </aside>
      <div className="ml-[300px] ">
        <Outlet />
      </div>
    </section>
  );
}
