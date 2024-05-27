import { css, html, LitElement } from "lit";

export class RestfulFormElement extends LitElement {
  static get properties() {
    return {
      src: { type: String },
      new: { type: Boolean }
    };
  }

  src: string
  new: boolean
  _state: any
  constructor() {
    super();
    this.src = "";
    this.new = false;
    this._state = {};
  }

  render() {
    return html`
    <link rel="stylesheet" href="/styles/app.css" />
    <link rel="stylesheet" href="/styles/tokens.css" />
      <form autocomplete="off">
        <slot></slot>
        <slot name="delete"></slot>
        <button type="submit">Submit</button>
      </form>
    `;
  }

  static styles = css`
    form {
      display: grid;
      gap: var(--size-spacing-medium);
      grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
    }
    ::slotted(label) {
      display: grid;
      grid-column: label / end;
      grid-template-columns: subgrid;
      gap: var(--size-spacing-medium);
    }
    button[type="submit"] {
      grid-column: input;
      justify-self: start;
    }
  `;

  get form() {
    return this.shadowRoot?.querySelector("form");
  }

  connectedCallback() {
    super.connectedCallback();
    this.form?.addEventListener("submit", this._handleSubmit.bind(this));
    this.form?.addEventListener("change", this._handleChange.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("submit", this._handleSubmit.bind(this));
    this.removeEventListener("change", this._handleChange.bind(this));
  }

  _handleSubmit(event: Event) {
    event.preventDefault();
    console.log("Submitting form", this._state);
    const method = this.new ? "POST" : "PUT";
    const action = this.new ? "created" : "updated";
    const src = this.new ? this.src.replace(/[/][$]new$/, "") : this.src;

    submitForm(src, this._state, method)
      .then((json) => {
        const customType = `restful-form:${action}`;
        const event = new CustomEvent(customType, {
          bubbles: true,
          composed: true,
          detail: {
            method,
            [action]: json,
            url: src
          }
        });
        this.dispatchEvent(event);
      });
  }

  _handleChange(event: Event) {
    const target = event.target;
    const name = target?.name;
    const value = target?.value;

    if (name) this._state[name] = value;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src":
        if (newValue && newValue !== oldValue && !this.new) {
          fetchData(this.src).then((json) => {
            this._state = json;
            populateForm(json, this);
          });
        }
        break;
      case "new":
        if (newValue) {
          this._state = {};
          populateForm({}, this);
        }
        break;
    }
  }
}

export function fetchData(src) {
  return fetch(src)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load form from ${src}: Status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) =>
      console.error(`Failed to load form from ${src}:`, error)
    );
}

function populateForm(json, formBody) {
  const entries = Object.entries(json);

  for (const [key, value] of entries) {
    const input = formBody.querySelector(`[name="${key}"]`);

    if (input) {
      switch (input.type) {
        case "checkbox":
          input.checked = Boolean(value);
          break;
        default:
          input.value = value;
          break;
      }
    }
  }

  return json;
}

function submitForm(src, json, method = "PUT") {
  return fetch(src, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(json)
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Form submission failed: Status ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => console.error("Error submitting form:", err));
}
