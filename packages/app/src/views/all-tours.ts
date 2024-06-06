import { define, View } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";
import { html } from "lit";
import { state } from "lit/decorators.js";
import { TourViewer } from "./tour-view";
import { Tour } from "server/models";

define({"tour-viewer": TourViewer});

export class AllToursElement extends View<Model, Msg> {
    @state()
    get tourIds(): Tour[] | undefined {
     return this.model.tourIds
    }   

    constructor() {
        super("blazing:model");
        this.dispatchMessage(["tour/all", {}]);

    }

  
    render() {
        if (!this.model.tourIds) {
            return html`<p>No tours available</p>`;
        }
        return html`
            ${this.model.tourIds?.map((tour) => html`<tour-viewer tourid=${tour.id} .tour=${tour}></tour-viewer>`)}
        `;
    }
  }
  