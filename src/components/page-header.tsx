import { Separator } from "./ui/separator";

type Props = {
  label: string;
};
export default function PageHeader({ label }: Props) {
  return (
    <div className="py-3">
      <h1 className="font-sans text-2xl text-zinc-300">{label}</h1>
      <Separator className="mt-3" />
    </div>
  );
}
