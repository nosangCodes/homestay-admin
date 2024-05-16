import { fetchRoomById } from "@/api";
import CiercleLoading from "@/components/loading";
import PageHeader from "@/components/page-header";
import RoomView from "@/components/room-view";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import roomState from "@/state/atom/room";
import { singleRoomState } from "@/state/selectors/room";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

type RoomActionProps = {
  onDelete: () => void;
  editLink: string;
  editMode: boolean;
};

const RoomAction = ({ editLink, onDelete, editMode }: RoomActionProps) => {
  return (
    <div className="flex gap-x-2 items-center">
      <Link className={cn(editMode ? "hidden" : "block")} to={editLink}>
        <Button
          size={"sm"}
          variant={"link"}
          className="bg-zinc-400 text-zinc-900"
        >
          Edit
        </Button>
      </Link>
      <Button
        size={"sm"}
        className={cn(!editMode ? "hidden" : "block")}
        variant={"secondary"}
      >
        Update
      </Button>
      <Button onClick={onDelete} size={"sm"} variant={"destructive"}>
        Delete
      </Button>
    </div>
  );
};

export default function Room() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const editMode = searchParams.get("edit");
  const [loading, setLoading] = useState(false);

  const setRoom = useSetRecoilState(roomState);
  const room = useRecoilValue(singleRoomState);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchRoomById(id)
        .then((res) => {
          setRoom(() => ({
            room: res.data,
          }));
          console.log("single room res", res);
        })
        .catch((err) => {
          console.error("error fetching room data", err);
        })
        .finally(() => setLoading(false));
    }

    return () => {
      setRoom(() => ({
        room: undefined,
      }));
    };
  }, [id, setRoom]);

  const Content = () => {
    if (loading) return <CiercleLoading loading={loading} />;
    if (!room) return <h1>Room Not found</h1>;
    return (
      <>
        {!editMode && <RoomView data={room} />}
        {editMode && <h1>Edit mode on</h1>}
      </>
    );
  };

  return (
    <section className="my-3 rounded-sm mr-3 pb-4 flex flex-col h-[calc(100vh-26px)]">
      <PageHeader
        actions={
          <RoomAction
            editMode={Boolean(editMode)}
            editLink="?edit=true"
            onDelete={() => alert("deleted")}
          />
        }
        backLink={editMode ? `/rooms/${id}` : "/rooms"}
        label={room?.title ?? "Something went wrong!"}
      />
      <Content />
    </section>
  );
}
