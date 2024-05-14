import { LucideProps } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  name?: string;
  Icon?: React.ComponentType<LucideProps>;
  category?: string;
  path?: string;
  children?: Props[];
};

export default function SidebarItem({
  name,
  category,
  children,
  Icon,
  path,
}: Props) {
  return name ? (
    <NavLink aria-disabled={Boolean(path)} to={path ? path : "#"}>
      <div className="group transition-colors hover:bg-zinc-200 hover:text-zinc-900 rounded-sm py-2 px-3 cursor-pointer flex flex-row items-center gap-x-2">
        {Icon && <Icon className="h-4 w-4" />}
        <h3 className="text-white group-hover:text-zinc-900 text-base">
          {name}
        </h3>
      </div>
    </NavLink>
  ) : (
    <div className="mt-2">
      <h2 className="text-zinc-400 font-semibold text-sm">{category}</h2>
      <div>
        {children?.map((child, index) => (
          <SidebarItem key={index} {...child} />
        ))}
      </div>
    </div>
  );
}
