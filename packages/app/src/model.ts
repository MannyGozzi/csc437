import { Credential, Tour } from "server/models";

export interface Model {
  credential?: Credential;
  tour?: Tour;
  cart?: string[];
  tourIds?: Tour[]
}

export const init: Model = {};
