type Props = {
  label: string;
};

export default function Chip({ label }: Props) {
  return (
    <div className="px-2 w-fit text-zinc-800 bg-zinc-200 rounded-sm text-sm font-medium">
      {label}
    </div>
  );
}
