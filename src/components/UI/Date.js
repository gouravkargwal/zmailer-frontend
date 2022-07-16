import React from "react";
import styled from "styled-components";

const DateContainer = styled.div`
  display: flex;
`;
const DateInfo = styled.div;
const TimeInfo = styled.div;

const DateBox = ({ data }) => {
  console.log(data);
  return (
    <DateContainer>
      <DateInfo>{data[0]}</DateInfo>
      <TimeInfo>{data[1]}</TimeInfo>
    </DateContainer>
  );
};

export default DateBox;
