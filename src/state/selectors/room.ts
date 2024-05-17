import { selector } from "recoil";
import roomState from "../atom/room";
import facilityState from "../atom/facilities";

export const singleRoomState = selector({
  key: "singleRoomData",
  get: ({ get }) => {
    const data = get(roomState);
    return data.room;
  },
});

export const facilitiesValue = selector({
  key: "facilitiesData",
  get: ({ get }) => {
    const data = get(facilityState);
    return data.facilities;
  },
});
