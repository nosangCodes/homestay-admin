import { selector } from "recoil";
import roomState from "../atom/room";

export const singleRoomState = selector({
  key: "singleRoomData",
  get: ({ get }) => {
    const data = get(roomState);
    return data.room;
  },
});
