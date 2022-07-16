import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import appConstant from "../../Constant/appConstant";
import { message } from "antd";

const Google = ({ informParent = (f) => f }) => {
  const responseGoogle = (response) => {
    axios
      .post(`${appConstant.baseURL}/google-login`, {
        idToken: response.tokenId,
      })
      .then((res) => {
        informParent(res);
        //inform parent
      })
      .catch((error) => {
        message.error(error.response.data.error);
        // console.error(error.response);
      });
  };
  return (
    <>
      <GoogleLogin
        clientId="279958223634-eojt0d9qnn09sok4g7qssf3qo53q115l.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default Google;
