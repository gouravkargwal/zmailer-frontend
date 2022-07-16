import React, { useContext } from "react";
import { Button } from "antd";
import SendEmailContext from "../../Context/SendEmailContext";
import { TitleContainer } from "../UI/TitleStyles";
import { Redirect, useHistory } from "react-router-dom";

const ConfirmSending = () => {
  const history = useHistory();
  console.log(history.location.state);
  const { submitHandler } = useContext(SendEmailContext);

  const handleBackClick = (e) => {
    e.preventDefault();
    history.push("/zmailer/sendemail/contact");
  };

  return (
    <>
      {history.location.state ? (
        <>
          <TitleContainer>Are You Sure To Send Emails?</TitleContainer>
          <div className="button-container">
            <Button onClick={handleBackClick} size="large" type="primary">
              Back
            </Button>
            <Button onClick={submitHandler} size="large" type="primary">
              Submit
            </Button>
          </div>
        </>
      ) : (
        <Redirect to={"/zmailer/sendemail"} />
      )}
    </>
  );
};

export default ConfirmSending;
