import React, { useState, useEffect, useContext } from "react";
import { Button, message } from "antd";
import "./Contact.css";
import {
  getGroup,
  getUserForm,
  getDomainForm,
} from "../../Actions/asyncActions";
import { contactSchema } from "../../Validations/validation";
import SendEmailContext from "../../Context/SendEmailContext";
import { useHistory, Redirect } from "react-router-dom";

const Contact = () => {
  const { openHtmlDrawer, openWebDrawer, setMessageData } =
    useContext(SendEmailContext);
  let history = useHistory();
  console.log(history.location.state);
  const [user, setUserData] = useState([]);
  const [group, setGroupData] = useState([]);
  const [domain, setDomainData] = useState([]);

  useEffect(() => {
    getUserForm({}, setUserData);
    getGroup({}, setGroupData);
    getDomainForm({}, setDomainData);
  }, []);

  const [data, setData] = useState({
    campaign: "",
    sender: "",
    subject: "",
    domain: "",
    receiver: "",
  });

  const handleInputs = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    history.push("/zmailer/sendemail/selecteditor");
    if (history.location.state) {
      if (history.location.state.from === "WebEditor") openWebDrawer();
      openHtmlDrawer();
    }
  };

  const PostData = async (e) => {
    console.log(data, "------------Contact Data-------------");
    const isValid = await contactSchema.isValid(data);
    if (isValid) {
      setMessageData(data);
      history.push("/zmailer/sendemail/confirmsending", { from: "Contact" });
    } else {
      message.error("Fill all details");
    }
  };

  let options = group.map((item, index) => {
    return { name: item.name, id: index };
  });

  return (
    <>
      {history.location.state ? (
        <div className="contact-container">
          <div className="contact">
            <form onSubmit={handleInputs} method="POST">
              <div className="form-field">
                <label>Campaign Name</label>
                <input
                  onChange={handleInputs}
                  id="campaign"
                  value={data.campaign}
                  type="text"
                  name="campaign"
                />
              </div>
              <div className="form-field">
                <label>Subject</label>
                <input
                  onChange={handleInputs}
                  id="subject"
                  value={data.subject}
                  type="text"
                  name="subject"
                />
              </div>
              <div className="form-field">
                <label>Domain</label>
                <select
                  name="domain"
                  id="domain"
                  onClick={handleInputs}
                  defaultValue="Select your domain"
                >
                  <option disabled>Select your domain</option>
                  {domain &&
                    domain.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.domain}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-field">
                <label>Sender Address</label>
                <select
                  name="sender"
                  id="sender"
                  onClick={handleInputs}
                  defaultValue="Select your receiver list"
                >
                  <option disabled>Select your sender</option>
                  {user &&
                    user.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.sender}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-field">
                <label>Receiver</label>
                <select
                  name="receiver"
                  id="receiver"
                  onClick={handleInputs}
                  defaultValue="Select your receiver list"
                >
                  <option disabled>Select your receiver list</option>
                  {group &&
                    group.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </form>
          </div>
          <div className="button-container">
            <Button onClick={handleBackClick} type="primary" size="large">
              Back
            </Button>
            <Button onClick={PostData} type="primary" size="large">
              Next
            </Button>
          </div>
        </div>
      ) : (
        <Redirect to={"/zmailer/sendemail"} />
      )}
    </>
  );
};

export default Contact;
