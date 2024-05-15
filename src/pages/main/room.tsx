import { fetchRoomById } from "@/api";
import PageHeader from "@/components/page-header";
import RoomView from "@/components/room-view";
import roomState from "@/state/atom/room";
import { singleRoomState } from "@/state/selectors/room";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Room() {
  const { id } = useParams();
  const setRoom = useSetRecoilState(roomState);
  const room = useRecoilValue(singleRoomState);

  useEffect(() => {
    if (id) {
      fetchRoomById(id)
        .then((res) => {
          setRoom(() => ({
            room: res.data,
          }));
          console.log("single room res", res);
        })
        .catch((err) => {
          console.error("error fetching room data", err);
        });
    }

    return () => {
      setRoom(() => ({
        room: undefined,
      }));
    };
  }, [id, setRoom]);

  return (
    <section className="my-3 rounded-sm mr-3 flex flex-col h-[calc(100vh-16px)]">
      <PageHeader label={room?.title} />
      {room && <RoomView data={room} />}
    </section>
  );
}
