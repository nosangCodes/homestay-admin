import { BedDouble, ScatterChart, Shield, Sparkles } from "lucide-react";

export const sidebarRoutes = [
  {
    name: "Admins",
    Icon: Shield,
  },
  {
    name: "Dashboard",
    Icon: ScatterChart,
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
      },
    ],
  },
];
