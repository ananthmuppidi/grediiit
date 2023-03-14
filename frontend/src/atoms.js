import { atom } from "recoil";

export const showUsersAtom = atom({
  key: "showUsers",
  default: false,
});

export const showJoiningRequestsAtom = atom({
  key: "showJoiningRequests",
  default: false,
});

export const showStatsAtom = atom({
  key: "showStats",
  default: false,
});
