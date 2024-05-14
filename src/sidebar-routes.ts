import { BedDouble, ScatterChart, Shield, Sparkles } from "lucide-react";

export const sidebarRoutes = [
  {
    name: "Dashboard",
    Icon: ScatterChart,
    path: "/stats",
  },
  {
    name: "Admins",
    Icon: Shield,
    path: "admins",
  },
  {
    category: "Theme",
    children: [
      {
        name: "Hero-Secion",
        Icon: Sparkles,
      },
    ],
  },
  {
    category: "Data",
    children: [
      {
        name: "Room",
        Icon: BedDouble,
        path: "rooms",
      },
    ],
  },
];
