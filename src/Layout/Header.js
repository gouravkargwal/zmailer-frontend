import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  isAuth,
  removeCookie,
  removeLocalStorage,
} from "../components/Auth/Helpers";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const Container = styled.div`
  display: flex;
  height: 10vh;
  width: 100%;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  background-color: hsl(209.27, 100%, 8.04%);
  color: white;
`;
const LogoutButton = styled.button`
  border: none;
  background-color: hsl(209.27, 100%, 8.04%);
  padding: 10px;
  border-radius: 5px;
  &:hover {
    background-color: hsl(232.98, 100%, 66.47%);
  }
`;

const Header = () => {
  let history = useHistory();
  let user = isAuth();
  const logoutHandler = () => {
    removeCookie("token");
    removeLocalStorage("user");
    history.push("/login");
  };
  return (
    <>
      {user && (
        <Container>
          <div>Z-mailer</div>
          <div>
            <UserOutlined style={{ marginRight: "10px" }} />
            {user.name}
          </div>
          <LogoutButton onClick={logoutHandler}>
            <LogoutOutlined style={{ marginRight: "10px" }} />
            Logout
          </LogoutButton>
        </Container>
      )}
    </>
  );
};

export default Header;
