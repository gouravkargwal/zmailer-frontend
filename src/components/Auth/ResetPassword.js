import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import appConstant from "../../Constant/appConstant";
import { message } from "antd";
import { isAuth } from "./Helpers";
import {
  Container,
  Sidebar,
  FormContainer,
  Title,
  Input,
  Button,
} from "./AuthStyles";

const ResetPassword = ({ match }) => {
  let history = useHistory();

  const [newPassword, setNewPassword] = useState("");
  const [resetPasswordLink, setResetPasswordLink] = useState("");

  useEffect(() => {
    console.log("State change");
    console.log(match.params.token);
    let token = match.params.token;
    if (token) {
      setResetPasswordLink(token);
    }
  }, [match.params.token]);

  const resetPasswordFormHandler = (e) => {
    e.preventDefault();
    const resetPasswordData = { resetPasswordLink, newPassword };
    console.log(resetPasswordData);
    axios
      .put(`${appConstant.baseURL}/reset-password`, resetPasswordData)
      .then((res) => {
        console.log(res);
        message.success(res.data.message);
        history.push("/login");
      })
      .catch((err) => {
        console.log(err.response.data);
        message.error(err.response.data.error);
      });
  };

  return (
    <>
      {isAuth() ? (
        <Redirect to="/login" />
      ) : (
        <Container>
          <Sidebar />
          <FormContainer>
            <Title>Reset Password</Title>
            <Input
              type="password"
              placeholder="New Password..."
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
            <Button onClick={resetPasswordFormHandler}>Change Password</Button>
          </FormContainer>
        </Container>
      )}
    </>
  );
};

export default ResetPassword;
