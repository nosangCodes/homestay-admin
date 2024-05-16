import { Loader2 } from "lucide-react";

type Props = {
  loading?: boolean;
};

export default function CiercleLoading({ loading = false }: Props) {
  if (!loading) return null;
  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center items-center">
      <Loader2 className="animate-spin h-8 w-8" />
    </div>
  );
}
