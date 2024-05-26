import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Tour } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class TourViewElement extends View<Model, Msg> {
  @property({ attribute: "tour-id", reflect: true })
  tourid = "hi";

  @property()
  get tour(): Tour | undefined {
    return this.model.tour;
  }

  constructor() {
    super("blazing:model");
  }

  render() {
    return html`
      <template>
        <link rel="stylesheet" href="/styles/tokens.css" />
        <link rel="stylesheet" href="/styles/app.css" />
        <h3>Profile View [Id: ${this.model.tour?.id}]</h3>
        <section class="container border">
          <dl>
            <div class="flex-row">
              <dt>Name</dt>
              <dt></dt>
              <dd><slot name="name"></slot></dd>
              <dt>Nickname</dt>
              <dd><slot name="nickname"></slot></dd>
            </div>
            <div class="flex-row">
              <dt>Home</dt>
              <dd><slot name="home"></slot></dd>
              <dt>Airports</dt>
              <dd><slot name="airports"></slot></dd>
            </div>
            <div class="flex-row">
              <dt>Avatar</dt>
              <dd><slot name="avatar"></slot></dd>
              <dt>Color</dt>
              <dd><slot name="color"></slot></dd>
            </div>
          </dl>
        </section>
      </template>
    `;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "tour-id" && oldValue !== newValue && newValue) {
      this.dispatchMessage(["tour/select", { tourid: newValue }]);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }
}
