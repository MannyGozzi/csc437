import { html, LitElement } from "lit";

export class RegisterPage extends LitElement {
    render() {
        return html`
        <link rel="stylesheet" href="/styles/app.css" />
        <link rel="stylesheet" href="/styles/tokens.css" />
        <div class="center">
        <div class="container">
          <h2>Register</h2>
          <main class="card">
            <login-form>
              <label>
                <span>Username:</span>
                <input name="username" autocomplete="off" />
              </label>
              <label>
                <span>Password:</span>
                <input type="password" name="password" />
              </label>
            </login-form>
          </main>
          <p>
            Or did you want to
            <a href="/app/login">Login as a returning user</a>
            ?
          </p>
        </div>
      </div>`
    }
}