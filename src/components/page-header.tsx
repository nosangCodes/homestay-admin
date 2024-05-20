import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { MoveLeft } from "lucide-react";
import React from "react";

type Props = {
  label?: string;
  backLink?: string;
  actions?: React.ReactNode;
};
export default function PageHeader({
  label,
  backLink,
  actions,
}: Props) {
  return (
    <header className="py-3 sticky top-3 dark:bg-black z-20">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-4 items-center">
          {backLink && (
            <Link to={backLink}>
              <MoveLeft className="hover:text-indigo-500 hover:scale-125 transition-[transform, colors]" />
            </Link>
          )}
          <h1 className="font-sans text-2xl text-zinc-300">{label}</h1>
        </div>
        {actions}
      </div>
      <Separator className="mt-3" />
    </header>
  );
}
