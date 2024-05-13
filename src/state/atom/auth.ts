import { atom } from "recoil";

const authState = atom({
  key: "atomState",
  default: {
    loggedIn: false,
  },
});

export default authState;
