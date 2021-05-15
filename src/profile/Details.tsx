import React from "react";

interface DetailsProps {}

const Details: React.FC<DetailsProps> = ({}) => {
  return (
    <div className="profile-data">
        <div className="head">
            <div className="title is-3">User Details</div>
            <button type="button" className="button is-success">Edit Details</button>
        </div>
      
      <fieldset disabled>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" placeholder="" />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" placeholder="" />
          </div>
        </div>

        <div className="field">
          <label className="label">Instagram Handler</label>
          <div className="control">
            <input className="input" type="text" placeholder="" />
          </div>
        </div>

      </fieldset>
    </div>
  );
};

export default Details;
