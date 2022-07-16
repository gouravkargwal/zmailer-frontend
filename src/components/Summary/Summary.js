import React, { useEffect, useState } from "react";
import axios from "axios";
import appConstant from "../../Constant/appConstant";
import { Heading, TitleContainer } from "../UI/TitleStyles";
import Graph from "../Stats/Graph";
import StatsCard, { CardContainer } from "../UI/Card";
import DeliveredMail from "./assets/icons8-delivered-mail-96.png";
import UploadMail from "./assets/icons8-upload-mail-96.png";
import BouncedMail from "./assets/icons8-mail-error-96.png";
import OpenedMail from "./assets/icons8-email-open-96.png";
import ClickedMail from "./assets/icons8-mail-privacy-96.png";

const Summary = () => {
  const [recentData, setRecentData] = useState({});
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${appConstant.baseURL}/recentcampaign`)
      .then((res) => {
        if (mounted) {
          console.log(res);
          setRecentData(res.data.body.getCampaign);
          setGraphData(res.data.body.graphData);
        }
      })
      .catch((error) => {});
    return () => (mounted = false);
  }, []);

  return (
    <>
      {recentData && (
        <>
          <TitleContainer>
            <Heading>Recent Activity</Heading>
            <Heading>{recentData.name}</Heading>
            <Heading>
              {new Date(recentData.createdAt).toString().split("G")[0]}
            </Heading>
          </TitleContainer>
          <CardContainer>
            <StatsCard
              title="Delivered"
              stats={recentData.mailsent}
              icon={DeliveredMail}
            />
            <StatsCard
              title="Opens"
              stats={recentData.noopened}
              icon={OpenedMail}
            />
            <StatsCard
              title="Clicks"
              stats={recentData.noclicked}
              icon={ClickedMail}
            />
            <StatsCard
              title="Requested"
              stats={recentData.requested}
              icon={UploadMail}
            />
            <StatsCard
              title="Bounces"
              stats={recentData.bounces}
              icon={BouncedMail}
            />
          </CardContainer>
          <Graph graphData={graphData}></Graph>
        </>
      )}
    </>
  );
};

export default Summary;
