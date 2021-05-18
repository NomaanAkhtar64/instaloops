import React, { useState } from "react";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [niche, setNiche] = useState("");
  const [pic, setPic] = useState("");
  const [banner, setBanner] = useState("");
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");
  const [insta, setInsta] = useState("");

  return (
    <div className="settings-page">
      <div className="setting-body box">
        <h1 className="title is-3" style={{ textAlign: "center" }}>
          Profile
        </h1>
        <form className="container">
          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-success"
                type="text"
                placeholder="Text input"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </div>
            <p className="help is-success">This username is available</p>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-danger"
                type="email"
                placeholder="Email input"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            <p className="help is-danger">This email is invalid</p>
          </div>

          <div className="field">
            <label className="label">User Type</label>
            <div className="control">
              <div className="select">
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option>--------</option>
                  <option value="influencer">Influencer</option>
                  <option value="consumer">Consumer</option>
                </select>
              </div>
            </div>
          </div>

          {userType === "influencer" && (
            <div className="influencer-data">
              <div className="field">
                <label className="label">Instagram Username</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Your Instagram username"
                  value={insta}
                  onChange={(e) => setInsta(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Niche</label>
                <input
                  type="text"
                  placeholder="Niche"
                  className="input"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Bio</label>
                <input
                  className="input"
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">About</label>
                <input
                  className="input"
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Budget</label>
                Min:{" "}
                <input
                  className="input"
                  type="text"
                  value={minBudget}
                  onChange={(e) => {
                    let reg = /[A-Za-z]/;
                    let newValue = e.target.value.replace(reg, "");
                    setMinBudget(newValue);
                  }}
                />
                Max:{" "}
                <input
                  className="input"
                  type="text"
                  value={maxBudget}
                  onChange={(e) => {
                    let reg = /[A-Za-z]/;
                    let newValue = e.target.value.replace(reg, "");
                    setMaxBudget(newValue);
                  }}
                />
              </div>
              <br />
            </div>
          )}

          {userType === "consumer" && (
            <div className="consumer-data">
              <div className="field">cioas</div>
            </div>
          )}

          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-link">
                Save
              </button>
            </div>
            <div className="control">
              <button type="button" className="button is-link is-light">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
