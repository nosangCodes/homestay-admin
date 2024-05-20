import { Facility } from "@/types";
import { atom } from "recoil";

const facilitiesState = atom<{
  facilities?: Facility[];
}>({
  key: "facilityState",
  default: {
    facilities: [],
  },
});

export default facilitiesState;
