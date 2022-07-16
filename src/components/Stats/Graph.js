import React, { useState } from "react";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2/dist";
import styled from "styled-components";

const ChartContainer = styled.div`
  margin: 20px;
`;
const ChartType = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ChartTypeBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80px;
`;

const Graph = ({ graphData }) => {
  let data = {
    labels: ["Requests", "Delivered", "Opens", "Clicks", "Bounces"],
    datasets: [
      {
        label: ["Statistics"],
        data: graphData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderWidth: 1,
        borderColor: "#777",
        hoverBorderWidth: 3,
        hoverBorderColor: "#000",
      },
    ],
  };
  let options = {
    title: {
      display: true,
      text: "Recent Sends",
      fontSize: 25,
    },
    legend: {
      display: true,
      position: "right",
      labels: {
        fontColor: "#000",
      },
    },
    layout: {
      padding: {
        left: 50,
        right: 50,
        bottom: 50,
        top: 50,
      },
    },
    tooltips: {
      enabled: false,
    },
  };
  const [chartType, setChartType] = useState("");
  const chartTypeHandler = (e) => {
    setChartType(e.target.value);
  };
  return (
    <ChartContainer>
      <h3>Select Chart Type</h3>
      <ChartType>
        <ChartTypeBox>
          <input
            type="radio"
            id="bar"
            name="chart_type"
            value="bar"
            onChange={chartTypeHandler}
          />
          <label htmlFor="bar">Bar Chart</label>
        </ChartTypeBox>
        <ChartTypeBox>
          <input
            type="radio"
            id="line"
            name="chart_type"
            value="line"
            onChange={chartTypeHandler}
          />
          <label htmlFor="line">Line Chart</label>
        </ChartTypeBox>
      </ChartType>

      {chartType === "line" && (
        <Chart type={"line"} data={data} options={options} />
      )}
      {chartType === "bar" && (
        <Chart type={"bar"} data={data} options={options} />
      )}
    </ChartContainer>
  );
};

export default Graph;
