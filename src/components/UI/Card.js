import React from "react";
import styled from "styled-components";

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
export const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin: 20px;
  padding: 20px;
  &:hover {
    /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;
export const CardStats = styled.h1`
  font-size: 2em;
  margin: 0;
`;
export const CardImg = styled.img`
  width: 50px;
`;
export const CardInfo = styled.p`
  opacity: 0.7;
`;

const StatsCard = ({ title, stats, icon }) => {
  return (
    <CardBox>
      <CardImg src={icon}></CardImg>
      <CardStats>{stats}</CardStats>
      <CardInfo>{title}</CardInfo>
    </CardBox>
  );
};

export default StatsCard;
