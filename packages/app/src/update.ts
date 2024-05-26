import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Profile, Tour } from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User,
) {
  switch (message[0]) {
    case "profile/save":
      saveProfile(message[1], user).then((profile) =>
        apply((model) => ({ ...model, profile })),
      );
      break;
    case "tour/select":
      getTour(message[1], user)
        .then((tour) => apply((model) => ({ ...model, tour })))
        .catch((error: Error) => {
          console.error(error);
        });
      break;
    case "tour/save":
      saveTour(message[1], user)
        .then((tour) => apply((model) => ({ ...model, tour })))
        .catch((error: Error) => {
          console.error(error);
        });
      break;
    default:
      const unhandled: any = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function saveProfile(
  msg: {
    id: string;
    profile: Profile;
  },
  user: Auth.User,
) {
  return fetch(`/api/tour/${msg.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
    body: JSON.stringify(msg.profile),
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      return undefined;
    })
    .then((json: unknown) => {
      if (json) return json as Profile;
      return undefined;
    });
}

function saveTour(
  msg: {
    id: string;
    tour: Tour;
  },
  user: Auth.User,
) {
  return fetch(`/api/tour/${msg.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
    body: JSON.stringify(msg.tour),
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      return undefined;
    })
    .then((json: unknown) => {
      if (json) return json as Profile;
      return undefined;
    });
}

function getTour(
  msg: {
    tourid: string;
  },
  user: Auth.User,
) {
  console.log("GETTING TOUR, auth object:")
  console.log(user)
  return fetch(`/api/tour/${msg.tourid}`, {
    method: "GET",
    headers: {
      ...Auth.headers(user),
    },
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      return undefined;
    })
    .then((json: unknown) => {
      if (json) return json as Profile;
      return undefined;
    })
    .catch((error: Error) => {
      console.error(error);
      return undefined;
    });
}
