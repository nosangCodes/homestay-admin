import { atom } from "recoil";

const roomState = atom({
  key: "recoilState",
  default: {
    rooms: [],
  },
});
export default roomState;
