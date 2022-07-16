import React, { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { getCampaign } from "../../Actions/asyncActions";
import Graph from "./Graph";
import { TitleContainer } from "../UI/TitleStyles";
import {
  TableBodyRow,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeadRow,
} from "../UI/TableStyles";
import { ButtonContainer, PaginationButton } from "../UI/ButtonStyles";
import axios from "axios";
import appConstant from "../../Constant/appConstant";
import { message } from "antd";

const Specific = () => {
  const [getTotal, setTotalData] = useState([]);
  const [getData, setGetData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const pages = new Array(getTotal).fill(null).map((v, i) => i);
  useEffect(() => {
    getCampaign({}, setGetData, setTotalData, pageNumber);
  }, [pageNumber]);

  const [graphData, setGraphData] = useState([]);

  const [graphDrawer, setGraphDrawer] = useState(false);

  const GraphShowHandler = (e, id) => {
    setGraphDrawer(true);
    axios
      .get(`${appConstant.baseURL}/campaign/${id}`)
      .then((res) => {
        console.log(res);
        message.success(res.data.message);
        setGraphData(res.data.body.graphData);
      })
      .catch((error) => {
        message.error(error.response.data.error);
      });
  };
  console.log(getData);
  return (
    <>
      <TitleContainer>
        <h1>Campaign Overview</h1>
      </TitleContainer>
      {getData && (
        <>
          <TableContainer>
            <thead>
              <TableHeadRow className="Specific Stats">
                <TableHeader className="Name">Campaign Name</TableHeader>
                <TableHeader className="Stats">Get Stats</TableHeader>
              </TableHeadRow>
            </thead>
            <tbody>
              {getData.map((data, index) => {
                return (
                  <TableBodyRow key={index}>
                    <TableCell key={`${index}0`}>{data.name}</TableCell>
                    <TableCell key={`${index}1`}>
                      <Button
                        danger
                        onClick={(e) => GraphShowHandler(e, data.campid)}
                      >
                        Show
                      </Button>
                    </TableCell>
                  </TableBodyRow>
                );
              })}
            </tbody>
          </TableContainer>
          <ButtonContainer>
            {pages.map((el, index) => {
              return (
                <PaginationButton
                  key={index}
                  onClick={() => {
                    setPageNumber(el);
                  }}
                >
                  {el + 1}
                </PaginationButton>
              );
            })}
          </ButtonContainer>
        </>
      )}

      <Drawer
        title="Graph"
        placement="bottom"
        onClose={() => {
          setGraphDrawer(false);
        }}
        visible={graphDrawer}
        height="100vh"
        key="editor"
      >
        <div style={{ padding: "30px" }}>
          <Graph graphData={graphData}></Graph>
        </div>
      </Drawer>
    </>
  );
};

export default Specific;
