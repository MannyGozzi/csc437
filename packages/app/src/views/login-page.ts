import { html, LitElement } from "lit";

export class LoginPage extends LitElement {
    render() {
        return html`
        <link rel="stylesheet" href="/styles/app.css" />
        <link rel="stylesheet" href="/styles/tokens.css" />
        <div class="center">
        <div class="container">
          <h2>Login</h2>
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
            <p>
              Or did you want to
              <a href="/app/register">Sign up as a new user</a>
              ?
            </p>
          </main>
        </div>
      </div>`
    }
}