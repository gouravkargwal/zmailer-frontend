import styled from "styled-components";

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  background-color: hsl(220, 27.27%, 97.84%);
  border: 1px solid hsl(330, 5.26%, 92.55%);
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const FormItem = styled.div`
  display: flex;
  margin: 10px;
  color: black;
  justify-content: space-between;
  align-items: center;
  max-width: 700px;
`;
