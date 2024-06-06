import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Tour } from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User,
) {
  switch (message[0]) {
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
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
      case "tour/edit":
        editTour(message[1], user)
          .then((tour) => apply((model) => ({ ...model, tour })))
          .then(() => {
            const { onSuccess } = message[1];
            if (onSuccess) onSuccess();
          })
          .catch((error: Error) => {
            const { onFailure } = message[1];
            if (onFailure) onFailure(error);
          });
        break;
    case "cart/add":
      const item = message[1].item;
      apply((model) => {
        return {
          ...model,
          cart: [...(model.cart ?? []), item],
        };
      });
      break;
    case "tour/all":
      getAllTours(user).then((tours) => {
        if (tours) {
          apply((model) => ({ ...model, tourIds: tours }));
        }
      }
      );
      break;
    default:
      const unhandled: any = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}
function saveTour(
  msg: {
    tourid: string;
    tour: Tour;
  },
  user: Auth.User,
) {
  return fetch(`/api/tour`, {
    method: "POST",
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
      if (json) return json as Tour;
      return undefined;
    });
}

function editTour(
  msg: {
    tourid: string;
    tour: Tour;
  },
  user: Auth.User,
) {
  return fetch(`/api/tour/${msg.tourid}`, {
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
      if (json) return json as Tour;
      return undefined;
    });
}

function getTour(
  msg: {
    tourid: string;
  },
  user: Auth.User,
) {
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
      if (json) return json as Tour;
      return undefined;
    })
    .catch((error: Error) => {
      console.error(error);
      return undefined;
    });
}

async function getAllTours(
  user: Auth.User,
) {
  return await fetch(`/api/tour`, {
    method: "GET",
    headers: {
      ...Auth.headers(user),
    },
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      console.log("JSONNNNNNNNNNNNNNNNNNNNNNNNNN")
      return undefined;
    })
    .then((json: unknown) => {
      const tours = json as Tour[];
      console.log("TOURIDSSSSSSSSSSSSSSSS", tours)
      return tours;
    })
    .catch((error: Error) => {
      console.error(error);
      return undefined;
    });
}