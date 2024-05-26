import { Profile, Credential, Tour } from "server/models";

export interface Model {
  credential?: Credential;
  profile?: Profile;
  tour?: Tour;
}

export const init: Model = {};
