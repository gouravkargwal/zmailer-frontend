import { useState, createContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { mailSchema } from "../Validations/validation";
import axios from "axios";
import { getCampaign } from "../Actions/asyncActions";
import appConstant from "../Constant/appConstant";
import { message } from "antd";

const SendEmailContext = createContext({});

export const SendEmailProvider = ({ children }) => {
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

  const onCloseHtmlDrawer = () => {
    setHtmlDrawer(false);
  };
  const openHtmlDrawer = () => {
    setHtmlDrawer(true);
  };
  const onCloseWebDrawer = () => {
    setWebDrawer(false);
  };
  const openWebDrawer = (e) => {
    setWebDrawer(true);
  };

  const onChangeModHandler = (val) => {
    setMod(val);
    console.log(mod);
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
    setMailData((prevState) => {
      return { ...prevState, html: data };
    });
  };

  const submitHandler = async (e) => {
    const isValid = await mailSchema.isValid(mailData);
    if (isValid) {
      console.log(mailData, "-----------------Mail Data---------------");
      axios
        .post(`${appConstant.baseURL}/sendmail`, mailData)
        .then((res) => {
          message.success(res.data.message);
          console.log(res);
          getCampaign({}, setGetData, setTotalData, pageNumber);
          history.push("/zmailer/sendemail");
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
  console.log(mailData);
  return (
    <SendEmailContext.Provider
      value={{
        onChangeModHandler,
        editorDrawer,
        openWebDrawer,
        openHtmlDrawer,
        htmlDrawer,
        webDrawer,
        onCloseHtmlDrawer,
        onCloseWebDrawer,
        setHtmlData,
        mailData,
        setMessageData,
        submitHandler,
      }}
    >
      {children}
    </SendEmailContext.Provider>
  );
};

export default SendEmailContext;
