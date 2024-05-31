import { Tour } from "server/models";

export type Msg =
  | ["tour/save", { tourid: string; tour: Tour; onSuccess?: () => void }]
  | ["tour/select", { tourid: string }];
