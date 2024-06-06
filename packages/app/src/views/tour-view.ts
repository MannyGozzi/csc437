import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Tour } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

import { define, Form, History, InputArray, View } from "@calpoly/mustang";

export class TourViewer extends LitElement {
  @property({ type: String })
  tourid?: string;

  @property({ type: Object })
  tour?: Tour;

  render() {
    return !this.tour ? html`
      <link rel="stylesheet" href="/styles/tokens.css" />
      <link rel="stylesheet" href="/styles/app.css" />
      <section class="container">
        <dl>
          <div class="flex-col">
            <h2><slot name="name"></slot></h2>
            <slot name="avatar" id="avatar-slot" ></slot>
            <strong>Nickname: <slot style="font-weight:normal;" name="nickname"></slot></strong>
            <strong>Home: <slot style="font-weight:normal;" name="home"></slot></strong>
            <dd><slot name="home"></slot></dd>
            <dt>Airports</dt>
            <dd><slot name="airports"></slot></dd>
            <strong>Color: <slot style="font-weight:normal;" name="color"></slot></strong>
            <strong>Id: <span style="font-weight:normal;">${this.tourid} | <a href="/app/tour/${this.tourid}">Edit</a>
             | <a href="/app/view/${this.tourid}">View</a>
            </span></strong>
          </div>
        </dl>
      </section>
    ` : html`
    <link rel="stylesheet" href="/styles/tokens.css" />
      <link rel="stylesheet" href="/styles/app.css" />
      <section class="container">
        <dl>
          <div class="flex-col">
            <h2>${this.tour.name}</h2>
            <img src=${this.tour.avatar} class="tour-img" style="width:100%;height:300px;object-fit:cover;border-radius:0.5rem;" alt="avatar" />
            <strong>Nickname: <p style="font-weight:normal;"
             name="nickname">${this.tour.nickname}</p></strong>
            <strong>Home: <p style="font-weight:normal;" name="home">${this.tour.home}</p></strong>
            <dd><slot name="home"></slot></dd>
            <dt>Airports</dt>
            ${this.tour.airports.map((s) => html` <li style="margin-left: 3rem;">${s}</li> `)}
            <strong>Color: <p style="font-weight:normal;" name="color">${this.tour.color}</p></strong>
            <strong>Id: <span style="font-weight:normal;">${this.tourid} | <a href="/app/tour/${this.tourid}">Edit</a>
             | <a href="/app/view/${this.tourid}">View</a>
            </span></strong>
          </div>
        </dl>
      </section>`;
  }
}

export class TourEditor extends LitElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
  });

  @property({ type: String })
  tourid?: string;

  @property({ attribute: false })
  init?: Tour;

  render() {
    return html`
      <link rel="stylesheet" href="/styles/tokens.css" />
      <link rel="stylesheet" href="/styles/app.css" />
      
      <section class="center">
      <section class="container">
        <h2>Edit Destination</h2>
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
        <button class="delete">Delete</button>
        </div>
      </section>
      </section>`
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
    console.log('old value:', oldValue, 'new value:', newValue)
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
            <img src=${avatar} class="tour-img" style="width:100%;height:300px;object-fit:cover;border-radius:0.5rem;" alt="avatar" slot="avatar" />
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
      "tour/edit",
      {
        tourid: this.tourid,
        tour: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/view/${this.tourid}`,
          }),
        onFailure: (err) => console.error("Failed to edit tour", err),
      },
    ]);
  }
}
