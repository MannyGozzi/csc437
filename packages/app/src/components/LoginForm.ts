import { LitElement, html } from 'lit';
import { Events } from '@calpoly/mustang';

export class LoginForm extends LitElement {
  next: string | null;
  constructor() {
    super();
    this.next = new URLSearchParams(document.location.search).get('next');
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('restful-form:created', this.handleFormCreated);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('restful-form:created', this.handleFormCreated);
  }

handleFormCreated(event: any) {
    const { token, redirect } = event.detail.created;
    Events.relay(event, "auth/signin", { token, redirect });
}

  render() {
    return html`
      <restful-form new src="/auth/login">
        <slot></slot>
      </restful-form>
    `;
  }
}