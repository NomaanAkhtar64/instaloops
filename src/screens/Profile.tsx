import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import ChangePassword from "../profile/ChangePassword";
import Details from "../profile/Details";

const Profile: React.FC<RouteComponentProps> = () => {
  const [tab, setTab] = useState("details");
  return (
    <div className="profile-page">
      <h1 className="title is-2">Profile</h1>
      <div className="profile-body">
        <div className="links">
          <button
            className="title is-5"
            onClick={() => {
              setTab("details");
            }}
          >
            Details
          </button>
          <button
            className="title is-5"
            onClick={() => {
              setTab("changePassword");
            }}
          >
            Change Password
          </button>
        </div>
        <div className="content">
          {tab === "details" && <Details />}
          {tab === "changePassword" && <ChangePassword />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
