import React from "react";

interface ChangePasswordProps {}

const ChangePassword: React.FC<ChangePasswordProps> = () => {
  return (
    <div className="form">
      <div className="title is-3">Change Password</div>
      <fieldset>
        <div className="field">
          <label className="label">Old Password</label>
          <div className="control">
            <input className="input" type="password" />
          </div>
        </div>

        <div className="field">
          <label className="label">New Password</label>
          <div className="control">
            <input className="input" type="password" placeholder="" />
          </div>
        </div>
        <small>
          <ul>
            <li>Password should be of minimum 8 characters long</li>
          </ul>
        </small>
        <div className="field">
          <label className="label">Confirm New Password</label>
          <div className="control">
            <input className="input" type="password" placeholder="" />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default ChangePassword;
