import styled from "styled-components";

export const TableContainer = styled.table`
  border-collapse: collapse;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  border-radius: 5px;
  overflow: hidden;
`;

export const TableBodyRow = styled.tr`
  border-bottom: 1px solid hsl(0, 9%, 94%);
  background-color: white;
  &:hover {
    background-color: hsl(0, 0%, 98%);
  }
`;

export const TableHeadRow = styled.tr`
  background-color: hsl(0, 0%, 98%);
  color: black;
  text-align: left;
  font-weight: bold;
`;

export const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: center;
`;

export const TableCell = styled.td`
  padding: 12px 15px;
  text-align: center;
`;
