import { Credential, Tour } from "server/models";

export interface Model {
  credential?: Credential;
  tour?: Tour;
  cart?: string[];
}

export const init: Model = {};
