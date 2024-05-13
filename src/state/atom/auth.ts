import { atom } from "recoil";

const authState = atom({
  key: "atomState",
  default: {
    loggedIn: false,
    token: null,
  },
});

export default authState;
