import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Tour } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

import { define, Form, History, InputArray, View } from "@calpoly/mustang";

export class TourViewer extends LitElement {
  @property()
  tourid?: string;

  render() {
    return html`
      <link rel="stylesheet" href="/styles/tokens.css" />
      <link rel="stylesheet" href="/styles/app.css" />
      <h3>Tour View [Id: ${this.tourid}]</h3>
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
    `;
  }
}

export class TourEditor extends LitElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
  });

  @property()
  get tour(): Tour | undefined {
    return this.tour;
  }

  @property({ attribute: false })
  init?: Tour;

  render() {
    return html` <link rel="stylesheet" href="/styles/tokens.css" />
      <link rel="stylesheet" href="/styles/app.css" />
      <h3>Tour View [Id: ${this.tour?.id}]</h3>
      <section class="container border">
        <button class="delete">Delete</button>
        <mu-form .init=${this.init}>
          <label>
            <span>Name</span>
            <input name="name" />
          </label>
          <label>
            <span>Nickname</span>
            <input name="nickname" />
          </label>
          <label>
            <span>Home</span>
            <input name="home" />
          </label>
          <label>
            <span>Airports</span>
            <input name="airports" />
          </label>
          <label>
            <span>Avatar</span>
            <input name="avatar" />
          </label>
          <label>
            <span>Color</span>
            <input name="color" />
          </label>
        </mu-form>
      </section>`;
  }
}

export class TourViewElement extends View<Model, Msg> {
  static uses = define({
    "tour-viewer": TourViewer,
    "tour-editor": TourEditor,
  });

  @property({ type: Boolean, reflect: true })
  edit = false;

  @property({ attribute: "tourid", reflect: true })
  tourid = "";

  @state()
  get tour(): Tour | undefined {
    return this.model.tour;
  }

  constructor() {
    super("blazing:model");
    // this.addEventListener("mu-form:submit", (event) =>
    //   this._handleSubmit(event as Form.SubmitEvent<Profile>)
    // );
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === "tourid" && oldValue !== newValue && newValue) {
      console.log("Tour Page:", newValue);
      this.dispatchMessage(["tour/select", { tourid: newValue }]);
    }
  }

  render() {
    const {
      color,
      avatar,
      name,
      id,
      nickname,
      home,
      airports = [],
    } = this.tour || {};

    const airports_html = airports.map((s) => html` <li>${s}</li> `);

    return this.edit
      ? html`
          <tour-editor
            tourid=${id}
            .init=${this.tour}
            @mu-form:submit=${(event: Form.SubmitEvent<Tour>) =>
              this._handleSubmit(event)}
          >
          </tour-editor>
        `
      : html`
          <tour-viewer tourid=${id}>
            <span slot="name">${name}</span>
            <span slot="userid">${id}</span>
            <span slot="nickname">${nickname}</span>
            <span slot="home">${home}</span>
            <span slot="avatar">${avatar}</span>
            <span slot="color">${color}</span>
            <ul slot="airports">
              ${airports_html}
            </ul>
          </tour-viewer>
        `;
  }

  _handleSubmit(event: Form.SubmitEvent<Tour>) {
    console.log("Handling submit of mu-form");
    this.dispatchMessage([
      "tour/save",
      {
        tourid: this.tourid,
        tour: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/tour/${this.tourid}`,
          }),
        onFailure: (err) => console.error("Failed to save tour", err),
      },
    ]);
  }
}
