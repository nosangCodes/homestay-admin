import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <section className="flex flex-row min-h-screen bg-zinc-950 text-white w-full">
      <aside className="md:w-[280px] w-[40px] bg-zinc-900 shadow-md overflow-hidden rounded-sm fixed left-0 inset-y-0 my-3 ml-2">
        <Sidebar />
      </aside>
      <div className="md:ml-[300px] ml-[60px] flex-1">
        <Outlet />
        <Toaster />
      </div>
    </section>
  );
}
