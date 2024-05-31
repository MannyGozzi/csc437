import { Credential, Tour } from "server/models";

export interface Model {
  credential?: Credential;
  tour?: Tour;
}

export const init: Model = {};
