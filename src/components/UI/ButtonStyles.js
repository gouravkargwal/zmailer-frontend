import styled from "styled-components";

export const ButtonForm = styled.button`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  border: none;
  padding: 10px;
  &:hover {
    border: 1px solid hsl(209, 100%, 8%);
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  border: none;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  width: 50px;
  margin: 10px;
  cursor: pointer;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  color: black;
  border: 1px solid red;
  transition: 0.3s;
  opacity: 0.6;
  &:hover {
    background-color: red;
    opacity: 1;
    color: white;
  }
`;
