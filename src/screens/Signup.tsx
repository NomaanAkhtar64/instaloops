import React, { useState } from "react";

interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [userType, setUserType] = useState("");
  const [modalActive, setModalActive] = useState(false);
  return (
    <div className="form-box">
      <div className="form-right">
        <div className="form-divider"></div>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            // setModalActive(true);
          }}
        >
          <legend className="legend">Signup</legend>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Username"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                className="input"
                type="password"
                value={password1}
                onChange={(e) => {
                  setPassword1(e.target.value);
                }}
                placeholder="Password"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                placeholder="Confirm Password"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <p className="control">
              <button
                type="submit"
                className="button sm is-info"
                style={{ width: "100%" }}
                onClick={() => {
                  setModalActive(true);
                }}
              >
                SIGNUP
              </button>
            </p>
          </div>
          <div className={`${modalActive && "is-active"} modal`}>
            <div className="modal-background"></div>
            <div
              className="modal-content"
              style={{
                textAlign: "center",
                backgroundColor: "#444",
                padding: "30px",
                borderRadius: "5px",
              }}
            >
              <p style={{ color: "#fff", paddingBottom: "5px" }}>
                Select who you are on Instagram and using this website as?
              </p>
              <div className="select is-medium">
                <select
                  value={userType}
                  onChange={(e) => {
                    setUserType(e.target.value);
                  }}
                  
                >
                  <option>----------</option>
                  <option>Influencer</option>
                  <option>Consumer</option>
                </select>
              </div>
              <div className="btns" style={{ padding: "10px" }}>
                <button
                  type="submit"
                  className="button is-primary"
                  style={{ margin: "0 5px" }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  style={{ margin: "0 5px" }}
                  onClick={() => {
                    setModalActive(false);
                  }}
                  className="button is-danger"
                >
                  Cancel
                </button>
              </div>
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={() => {
                setModalActive(false);
              }}
            ></button>
          </div>
          <div className="field">
            <p className="control">
              <button className=" is-instagram" style={{ width: "100%" }}>
                <span>Signup With Instagram</span>
                <i className="fab fa-lg fa-instagram"></i>
                <div style={{ marginRight: "auto" }}></div>
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
