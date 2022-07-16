import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Sidebar,
  FormContainer,
  Input,
  Button,
  Title,
} from "./AuthStyles";
import { registerSchema } from "../../Validations/validation";
import { message } from "antd";
import axios from "axios";
import { isAuth } from "./Helpers";
import appConstant from "../../Constant/appConstant";

const Register = () => {
  //---Register Data And Handling States Start---//
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const registerFormHandler = async (e) => {
    e.preventDefault();
    let registerData = {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    };
    const isValid = await registerSchema.isValid(registerData);
    if (isValid) {
      console.log(registerData, "Register data");
      axios
        .post(`${appConstant.baseURL}/register`, registerData)
        .then((res) => {
          console.log(res);
          message.success(res.data.message);
        })
        .catch((error) => {
          message.error(error.response.data.error);
        });
    } else {
      message.error("Check Details Again!");
    }
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterName("");
  };
  //---Register Data And Handling States End---//
  return (
    <>
      {isAuth() ? (
        <Redirect to="/login" />
      ) : (
        <Container>
          <Sidebar />
          <FormContainer>
            <Title>Register</Title>
            <Input
              type="text"
              placeholder="Name..."
              onChange={(e) => setRegisterName(e.target.value)}
              value={registerName}
            />
            <Input
              type="email"
              placeholder="Email..."
              onChange={(e) => setRegisterEmail(e.target.value)}
              value={registerEmail}
            />
            <Input
              type="password"
              placeholder="Password..."
              onChange={(e) => setRegisterPassword(e.target.value)}
              value={registerPassword}
            />
            <Button onClick={registerFormHandler}>SignUp</Button>
            <div className="signup_link">
              Already a member?
              <Link to="/login">Login</Link>
            </div>
          </FormContainer>
        </Container>
      )}
    </>
  );
};

export default Register;
