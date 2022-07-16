import React from "react";
import {
  TableBodyRow,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeadRow,
} from "../UI/TableStyles";
import { TitleContainer } from "../UI/TitleStyles";

const Variable = () => {
  return (
    <>
      <TitleContainer>
        <h1>Mail Variables</h1>
      </TitleContainer>
      <TableContainer>
        <thead>
          <TableHeadRow>
            <TableHeader>Variable</TableHeader>
            <TableHeader>Description</TableHeader>
          </TableHeadRow>
        </thead>
        <tbody>
          <TableBodyRow>
            <TableCell>{`{receiver_name}`}</TableCell>
            <TableCell>Used to add receiver name to mail </TableCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableCell>{`{receiver_email}`}</TableCell>
            <TableCell>Used to add receiver email to mail </TableCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableCell>{`{sender_name}`}</TableCell>
            <TableCell>Used to add sender name to mail</TableCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableCell>{`{sender_email}`}</TableCell>
            <TableCell>Used to add sender email to mail</TableCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableCell>{`{sender_address}`}</TableCell>
            <TableCell>Used to add sender address to mail</TableCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableCell>{`{unsubscribe_link}`}</TableCell>
            <TableCell>Add a unsubscribe link to mail</TableCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableCell>{`{tracking_pixel}`}</TableCell>
            <TableCell>Enables tracking</TableCell>
          </TableBodyRow>
        </tbody>
      </TableContainer>
    </>
  );
};

export default Variable;
