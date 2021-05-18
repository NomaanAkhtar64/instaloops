import React, { useState } from "react";
import { useHistory } from "react-router";
import FacebookLogin from "react-facebook-login";

import { useAuth } from "../store";
import axios from "axios";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [disable, setDisable] = useState(false);

  const auth = useAuth();
  const history = useHistory();

  return (
    <div className="form-box">
      <div className="form-right">
        <div className="form-divider box">
          <form
            className="form"
            onSubmit={async (e) => {
              e.preventDefault();
              setDisable(true);
              try {
                if (auth) {
                await auth?.actions.login({ email, password });
              }
              if (!auth?.error.login) {
                history.push("/");
              }
              } catch (err) {
                if (axios.isAxiosError(err)) {
                  let data = err.response?.data;
                  if ("non_field_errors" in data) {
                    setError(data["non_field_errors"][0]);
                  }
                }
              }
              setDisable(false);
            }}
          >
            <legend className="legend">Login</legend>
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
                  disabled={disable}
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
                  disabled={disable}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <p className="lg err">{error}</p>
            <div className="field">
              <p className="control">
                <button
                  type="submit"
                  className={`button sm is-info ${disable && "is-loading"}`}
                  disabled={disable}
                  id="login-btn"
                  style={{ width: "100%" }}
                >
                  LOGIN
                </button>
              </p>
            </div>
            <FacebookLogin
              appId="3735839843193335"
              fields="name,email"
              onClick={() => {
                console.log("clicked");
              }}
              callback={(res: any) => {
                setEmail(res.email);
                setPassword(res.userID);
                document.getElementById("login-btn")?.click();
              }}
              cssClass="is-facebook"
            />
            {/* <div className="field">
              <p className="control">
                <button className=" is-instagram" style={{ width: "100%" }}>
                  <span>Login With Instagram</span>
                  <i className="fab fa-lg fa-instagram"></i>
                  <div style={{ marginRight: "auto" }}></div>
                </button>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
