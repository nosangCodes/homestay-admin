import { DetailedRoom } from "@/typpes";
import { atom } from "recoil";

const roomState = atom<{
  room?: DetailedRoom;
}>({
  key: "recoilState",
  default: {
    room: undefined,
  },
});
export default roomState;
