import { Tour } from "server/models";

export type Msg =
  | [
      "tour/save",
      {
        tourid: string;
        tour: Tour;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      },
    ]
  | ["tour/select", { tourid: string }]
  | ["cart/add", { item: string }];
