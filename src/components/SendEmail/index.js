import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { Button, Drawer, Card, Row, Col, message, Modal } from "antd";
import PreviewEmail from "./PreviewEmail";
import WebEditor from "./WebEditor/WebEditor";
import Contact from "./Contact";
import ConfirmSending from "./ConfirmSending";
import { mailSchema } from "../../Validations/validation";
import appConstant from "../../Constant/appConstant";
import { getCampaign } from "../../Actions/asyncActions";
import {
  TableBodyRow,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeadRow,
} from "../UI/TableStyles";
import { Heading, TitleContainer } from "../UI/TitleStyles";
import { ButtonContainer, PaginationButton } from "../UI/ButtonStyles";
import SelectEditor from "./SelectEditor/SelectEditor";

const SendEmail = () => {
  const [getTotal, setTotalData] = useState([]);
  const [getData, setGetData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  useEffect(() => {
    getCampaign({}, setGetData, setTotalData, pageNumber);
  }, [pageNumber]);

  const pages = new Array(getTotal).fill(null).map((v, i) => i);

  let history = useHistory();

  const [editorDrawer, setEditorDrawer] = useState(false);
  const [htmlDrawer, setHtmlDrawer] = useState(false);
  const [webDrawer, setWebDrawer] = useState(false);
  const [mod, setMod] = useState("");
  const [mailData, setMailData] = useState({
    campaign: "",
    sender: "",
    subject: "",
    html: "",
    receiver: "",
    domain: "",
    tracking: "",
  });

  const selectEditorDrawer = () => {
    setEditorDrawer(true);
  };
  const onCloseEditorDrawer = () => {
    setEditorDrawer(false);
  };
  const onCloseHtmlDrawer = () => {
    setHtmlDrawer(false);
  };
  const openHtmlDrawer = (e) => {
    setHtmlDrawer(true);
    setMod("htmleditor");
  };
  const onCloseWebDrawer = () => {
    setWebDrawer(false);
  };
  const openWebDrawer = (e) => {
    setWebDrawer(true);
    setMod("webeditor");
  };

  const onChangeModHandler = (val) => {
    setMod(val);
  };

  const setMessageData = (data) => {
    setMailData((prevState) => {
      return {
        ...prevState,
        campaign: data.campaign,
        sender: data.sender,
        subject: data.subject,
        receiver: data.receiver,
        domain: data.domain,
        tracking: data.tracking,
      };
    });
  };

  const setHtmlData = (data) => {
    console.log(data, "html");
    setMailData((prevState) => {
      return { ...prevState, html: data };
    });
  };

  const submitHandler = async (e) => {
    const isValid = await mailSchema.isValid(mailData);
    if (isValid) {
      console.log(mailData, "all data");
      axios
        .post(`${appConstant.baseURL}/sendmail`, mailData)
        .then((res) => {
          message.success(res.data.message);
          console.log(res);
          getCampaign({}, setGetData, setTotalData, pageNumber);
          history.push("/");
        })
        .catch((error) => {
          message.error(error.response.data.error);
        });
    } else {
      message.error("Mail sending failed!");
    }
  };

  function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(
      Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])
    ).toString();
  }

  //------Campaign Model Start------//
  const [isCampaignModalVisible, setIsCampaignModalVisible] = useState(false);
  const showCampaignModel = (e, id) => {
    console.log(id);
    setIsCampaignModalVisible(true);
  };
  const handleCampaignOk = () => {
    setIsCampaignModalVisible(false);
  };
  const handleCampaignCancel = () => {
    setIsCampaignModalVisible(false);
  };
  //------Campaign Model End------//

  return (
    <>
      <TitleContainer>
        <Heading>Create Single Send</Heading>
        <Link to={"/zmailer/sendemail/selecteditor"}>
          <Button type="primary" onClick={selectEditorDrawer}>
            Create Single Send
          </Button>
        </Link>
      </TitleContainer>

      {getData && (
        <>
          <TableContainer>
            <thead>
              <TableHeadRow key="Campaign List">
                <TableHeader key="Name">Campaign Name</TableHeader>
                <TableHeader key="Mail Sent">Mail Sent</TableHeader>
                <TableHeader key="Date">Campaign Date</TableHeader>
                <TableHeader key="Action">Action</TableHeader>
              </TableHeadRow>
            </thead>
            <tbody>
              {getData.map((data, index) => {
                return (
                  <TableBodyRow key={index}>
                    <TableCell key={`${index}0`}>{data.name}</TableCell>
                    <TableCell key={`${index}1`}>{data.mailsent}</TableCell>
                    <TableCell key={`${index}2`}>
                      {parseISOString(data.createdAt)}
                    </TableCell>
                    <TableCell key={`${index}3`}>
                      <Button
                        danger
                        onClick={(e) => showCampaignModel(e, data.campid)}
                      >
                        View
                      </Button>
                      <Modal
                        title="Campaign Details"
                        visible={isCampaignModalVisible}
                        onOk={handleCampaignOk}
                        onCancel={handleCampaignCancel}
                      >
                        <p>Name-{data.name}</p>
                        <p>Mail Sent-{data.mailsent}</p>
                        {/* <p>Imgae of sent mail</p> */}
                      </Modal>
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
    </>
  );
};

export default SendEmail;
