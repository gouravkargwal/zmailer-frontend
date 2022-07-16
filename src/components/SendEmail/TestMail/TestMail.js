import React from "react";
import axios from "axios";
import { message } from "antd";
import { contactSchema } from "../../../Validations/validation";
import appConstant from "../../../Constant/appConstant";
import { useHistory } from "react-router-dom";

const TestMail = () => {
  let history = useHistory();

  const handleInputs = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataObject = Object.fromEntries(formData);
    console.log(dataObject);
    const isValid = await contactSchema.isValid(dataObject);
    console.log(isValid);
    if (isValid) {
      axios
        .post(`${appConstant.baseURL}/sendtestmail`, dataObject)
        .then((res) => {
          message.success(res.data.message);
          history.push("/zmailer/testmail");
        })
        .catch((error) => {
          message.error(error.response.data.error);
        });
    } else {
      message.error("Fill all details");
    }
    event.target.reset();
  };

  return (
    <div className="contact-container">
      <div className="contact">
        <form onSubmit={handleInputs}>
          <div className="form-field">
            <label>Campaign Name</label>
            <input type="text" name="campaign" />
          </div>
          <div className="form-field">
            <label>Subject</label>
            <input type="text" name="subject" />
          </div>
          <div className="form-field">
            <label>Domain</label>
            <input type="text" name="domain" />
          </div>
          <div className="form-field">
            <label>Sender Address</label>
            <input type="text" name="sender" />
          </div>
          <div className="form-field">
            <label>Receiver</label>
            <input type="text" name="receiver" />
          </div>
          <div className="form-field">
            <label>Body</label>
            <input type="text" name="html" />
          </div>
          <div className="form-field">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestMail;
