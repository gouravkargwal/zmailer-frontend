import styled from "styled-components";
import SidebarImage from "./caleb-george-5sF6NrB1MEg-unsplash.jpg";
import BgImage from "./rianne-zuur-2NITiiVwWBE-unsplash.jpg";

export const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap");
  font-family: "Roboto Mono", monospace;
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-image: url(${BgImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Sidebar = styled.div`
  display: block;
  height: 80vh;
  width: 40vw;
  max-width: 370px;
  background-image: url(${SidebarImage});
  background-size: cover;
  background-repeat: no-repeat;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 40vw;
  max-width: 370px;
  background-color: white;
  padding: 20px;
  align-items: stretch;
  justify-content: space-evenly;
`;
export const AvatarImage = styled.img`
  display: block;
  width: 100px;
`;
export const Input = styled.input`
  display: block;
  padding: 10px;
  border: none;
  border-bottom: 2px hsl(275, 83%, 83%) solid;
`;
export const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: hsl(208, 100%, 54%);
  color: white;
  border-radius: 5px;
  &:hover {
    background-color: hsl(270, 98%, 52%);
  }
`;
export const Title = styled.h1`
  color: hsl(245, 93%, 75%);
`;
