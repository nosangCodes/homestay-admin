import { SwatchBook } from "lucide-react";
import { Separator } from "./ui/separator";
import SidebarItem from "./sidebar-item";
import { sidebarRoutes } from "@/sidebar-routes";


export default function Sidebar() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-x-4 px-2 py-3 bg-zinc-800 text-white">
        <SwatchBook className="h-8 w-8" />
        <h2 className="font-semibold text-lg">Admin</h2>
      </div>
      <Separator />
      <div className="px-4 py-2">
        {sidebarRoutes?.map((route, index) => {
          return <SidebarItem key={index} {...route} />;
        })}
      </div>
    </div>
  );
}
