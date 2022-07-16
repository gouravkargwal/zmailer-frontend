import { Button, message, Tabs } from "antd";
import React, { useState, useEffect, useContext } from "react";
import useSessionStorage from "../Hooks/useSessionStorage";
import Editor from "./Editor";
import { FaHtml5, FaCss3Alt, FaJsSquare } from "react-icons/fa";
import "./PreviewEmail.css";
import SendEmailContext from "../../Context/SendEmailContext";
import { useHistory } from "react-router-dom";

const PreviewEmail = () => {
  const { mailData, setHtmlData } = useContext(SendEmailContext);
  let history = useHistory();

  const { TabPane } = Tabs;
  const [enteredHTML, setHTMLState] = useState(mailData.html);
  const [html, setHtml] = useSessionStorage("html", " ");
  const [css, setCss] = useSessionStorage("css", " ");
  const [js, setJs] = useSessionStorage("js", " ");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`<html>
      <head>
      <style>${css}</style>
      </head>
      <body>${html}
      </body>
      </html>`);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const htmlHandler = () => {
    setHTMLState(srcDoc);
    console.log(enteredHTML);
  };
  const sendHtmlCode = (e) => {
    e.preventDefault();
    if (enteredHTML) {
      setHtmlData(enteredHTML);
      history.push("/zmailer/sendemail/contact", { from: "previewMail" });
    } else {
      message.error("Empty form can't be submitted");
    }
  };
  return (
    <>
      <div className="container">
        <div className="preview-container">
          <div className="html-container">
            <Tabs defaultActiveKey="1" tabPosition="left">
              <TabPane
                tab={
                  <span>
                    <FaHtml5 style={{ verticalAlign: "middle" }} />
                    HTML
                  </span>
                }
                key="1"
              >
                <Editor language="xml" value={html} onChange={setHtml}></Editor>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <FaCss3Alt style={{ verticalAlign: "middle" }} />
                    CSS
                  </span>
                }
                key="2"
              >
                <Editor language="css" value={css} onChange={setCss}></Editor>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <FaJsSquare style={{ verticalAlign: "middle" }} />
                    JS
                  </span>
                }
                key="3"
              >
                <Editor
                  language="javascript"
                  value={js}
                  onChange={setJs}
                ></Editor>
              </TabPane>
            </Tabs>
          </div>
          <iframe
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            srcDoc={srcDoc}
            className="output-container"
          />
        </div>
      </div>
      <div className="button-container">
        <Button onClick={htmlHandler} size="large" type="default" danger>
          Save
        </Button>
        <Button onClick={sendHtmlCode} size="large" type="primary">
          Next
        </Button>
      </div>
    </>
  );
};

export default PreviewEmail;
