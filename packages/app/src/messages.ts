import { Profile, Tour } from "server/models";

export type Msg =
  | ["profile/save", { id: string; profile: Profile }]
  | ["profile/select", { id: string }]
  | ["tour/save", { tourid: string, tour: Tour }]
  | ["tour/select", { tourid: string }];
