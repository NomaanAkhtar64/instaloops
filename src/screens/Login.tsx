import React, { useState } from "react";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="form-box">
      <div className="form-right">
        <div className="form-divider"></div>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <legend className="legend">LOGIN</legend>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input {% if login_failed %}is-danger{% endif %}"
                name="auth_email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Email"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input {% if login_failed %}is-danger{% endif %}"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="auth_password"
                placeholder="Password"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button type="submit" className="button sm is-info" style={{ width: "100%" }}>
                LOGIN
              </button>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className=" is-instagram" style={{ width: "100%" }}>
                <span>Login With Instagram</span>
                <i className="fab fa-lg fa-instagram"></i>
                <div style={{ marginRight: "auto" }}></div>
              </button>
            </p>
          </div>
          {/* {% if login_failed %}
            <div className="error">
                {{login_error}}
            </div>
            {% endif %} */}
        </form>
      </div>
    </div>
  );
};

export default Login;
