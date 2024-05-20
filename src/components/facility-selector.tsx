import { facilitiesValue } from "@/state/selectors/room";
import { useRecoilValue } from "recoil";
import { Separator } from "./ui/separator";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value?: number[];
  onChange: (facilities: number[]) => void;
};

type SelectChipProps = {
  selected: boolean;
  name: string;
  className?: string;
  onClick: () => void;
};

export function SelectChip({
  selected,
  name,
  className,
  onClick,
}: SelectChipProps) {
  return (
    <div
      onClick={() => {
        if (!selected) {
          onClick();
        }
      }}
      className={cn(
        "border dark:border-zinc-100 cursor-pointer flex justify-between items-center px-1 rounded-sm dark:text-zinc-200 transition-[colors,transform]",
        !selected &&
          "hover:scale-105 dark:border-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-900 dark:hover:bg-zinc-200",
        selected && "dark:border-emerald-600 dark:text-emerald-700",
        className
      )}
    >
      <p className="text-sm text-inherit select-none">{name}</p>
      {selected && (
        <button type="button" onClick={onClick}>
          <X className="h-4 w-4 dark:text-zinc-200 hover:text-white hover:scale-125 transition-[colors,transform]" />
        </button>
      )}
    </div>
  );
}

export default function FacilitySelector({ value, onChange }: Props) {
  const facilities = useRecoilValue(facilitiesValue);
  const facilitiesWithKey = facilities?.map((facility) => {
    return {
      ...facility,
      selected: Boolean(value?.includes(facility.id)),
    };
  });

  const handleFacilityAction = (id: number, remove = true) => {
    const facilityIndex = facilitiesWithKey?.findIndex(
      (facility) => facility.id === id
    );

    if (facilityIndex === undefined) return;
    if (!facilitiesWithKey?.[facilityIndex]) return;
    facilitiesWithKey[facilityIndex].selected = !remove;

    const selectedIds = facilitiesWithKey
      .filter((facility) => facility.selected)
      .map((facility) => facility.id);

    onChange(selectedIds);
  };
  return (
    <div className="flex px-2 py-4 flex-col border rounded-sm border-input ">
      {/* selected */}
      <div className="flex flex-wrap gap-2">
        {facilitiesWithKey?.map(
          (facility) =>
            facility.selected && (
              <SelectChip
                onClick={() => handleFacilityAction(facility.id, true)}
                key={facility.id}
                name={facility.name}
                selected={Boolean(facility.selected)}
              />
            )
        )}
      </div>
      <Separator className="my-2" />
      {/* to be selected */}
      <div className="flex flex-wrap gap-2">
        {facilitiesWithKey?.map((facility) => (
          <SelectChip
            onClick={() => handleFacilityAction(facility.id, false)}
            className={cn(facility.selected && "hidden")}
            key={facility.id}
            name={facility.name}
            selected={Boolean(facility.selected)}
          />
        ))}
      </div>
    </div>
  );
}
