import React, { useState } from "react";
import {
  Container,
  Sidebar,
  FormContainer,
  Input,
  Button,
  Title,
} from "./AuthStyles";
import { forgotPasswordSchema } from "../../Validations/validation";
import { message } from "antd";
import axios from "axios";
import appConstant from "../../Constant/appConstant";

const ForgotPassword = () => {
  const [forgotEmail, setForgotEmail] = useState("");

  const ForgotPasswordFormHandler = async (e) => {
    e.preventDefault();
    const forgotPasswordData = { email: forgotEmail };
    console.log(forgotPasswordData);
    const isValid = await forgotPasswordSchema.isValid(forgotPasswordData);
    console.log(isValid);
    if (isValid) {
      axios
        .put(`${appConstant.baseURL}/forgot-password`, forgotPasswordData)
        .then((res) => {
          console.log(res);
          message.success(res.data.message);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          message.error(error.response.data.error);
        });
    } else {
      message.error("Check Details Again!");
    }
  };
  return (
    <>
      <Container>
        <Sidebar />
        <FormContainer>
          <Title>Forgot Password</Title>
          <Input
            type="email"
            placeholder="Email..."
            onChange={(e) => setForgotEmail(e.target.value)}
            value={forgotEmail}
          />
          <Button onClick={ForgotPasswordFormHandler}>Send Reset Link</Button>
        </FormContainer>
      </Container>
    </>
  );
};

export default ForgotPassword;
