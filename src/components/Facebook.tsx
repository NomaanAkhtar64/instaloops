import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";

interface FacebookProps {}

const Facebook: React.FC<FacebookProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");

  let componentClick = () => {
    console.log("clicked");
  };

  let responseFacebook = (res: any) => {
    setIsLoggedIn(true);
    setUserId(res.userId);
    setName(res.name);
  };
  let fbContent;
  if (isLoggedIn) {
    fbContent = null;
  } else {
    fbContent = (
      <FacebookLogin
        appId="3735839843193335"
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClick}
        callback={responseFacebook}
        cssClass="is-facebook"
      />
    );
  }

  return <div>{fbContent}</div>;
};

export default Facebook;
