import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import {
  Container,
  Sidebar,
  FormContainer,
  Input,
  Button,
  Title,
} from "./AuthStyles";
import { loginSchema } from "../../Validations/validation";
import { message } from "antd";
import axios from "axios";
import appConstant from "../../Constant/appConstant";
import { Link } from "react-router-dom";
import { authenticate, isAuth } from "./Helpers";
import Google from "./Google";

const Login = () => {
  let history = useHistory();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const informParent = (res) => {
    authenticate(res, () => {
      message.success(`Hey ${res.data.user.name}, Welcome Back!`);
      history.push("/zmailer/dashboard");
    });
  };

  const loginFormHandler = async (e) => {
    e.preventDefault();
    let loginData = {
      email: loginEmail,
      password: loginPassword,
    };
    const isValid = await loginSchema.isValid(loginData);
    if (isValid) {
      axios
        .post(`${appConstant.baseURL}/login`, loginData)
        .then((res) => {
          console.log(res);
          authenticate(res, () => {
            setLoginEmail("");
            setLoginPassword("");
            message.success(`Hey ${res.data.user.name}, Welcome Back!`);
          });
          //save info and token to localstorage/cookie
        })
        .catch((error) => {
          message.error(error.response.data.error);
        });
    } else {
      message.error("Check Details Again!");
    }
  };
  return (
    <>
      {isAuth() ? (
        <Redirect to="/zmailer/dashboard" />
      ) : (
        <Container>
          <Sidebar />
          <FormContainer>
            <Title>Login</Title>
            <Input
              type="email"
              placeholder="Email..."
              onChange={(e) => setLoginEmail(e.target.value)}
              value={loginEmail}
            />
            <Input
              type="password"
              placeholder="Password..."
              onChange={(e) => setLoginPassword(e.target.value)}
              value={loginPassword}
            />
            <Link to="/forgot-password">Forgot Password?</Link>
            <Button onClick={loginFormHandler}>Login</Button>
            <div className="signup_link">
              Not a member?
              <Link to="/register">Signup</Link>
            </div>
            <p>-----------------or-------------------</p>
            <Google informParent={informParent} />
          </FormContainer>
        </Container>
      )}
    </>
  );
};

export default Login;
