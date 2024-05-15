import React from "react";
import { Separator } from "./ui/separator";

type Props = {
  label: string;
  children: React.ReactNode;
};

export default function DataView({ label, children }: Props) {
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-zinc-500">{label}</h3>
      {children}
      <Separator className="mt-1" />
    </div>
  );
}
