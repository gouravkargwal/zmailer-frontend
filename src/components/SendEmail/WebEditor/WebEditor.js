import React, { useEffect, useState, useContext } from "react";
import { Button, message } from "antd";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import SendEmailContext from "../../../Context/SendEmailContext";
import "grapesjs-preset-webpage";
import "./WedEditor.css";
import { useHistory } from "react-router-dom";

let editor;
const WebEditor = (props) => {
  let history = useHistory();
  const { setHtmlData } = useContext(SendEmailContext);
  const [combinedCode, setCombinedCodeState] = useState("");

  useEffect(() => {
    loadGrapesJs();
  }, []);

  const loadGrapesJs = async () => {
    editor = await grapesjs.init({
      container: "#gjs",
      plugins: ["gjs-preset-webpage"],
      fromElement: true,
      height: "450px",
      width: "auto",
    });
  };

  const saveCode = () => {
    let htmlCode = editor.getHtml();
    let cssCode = editor.getCss();
    setCombinedCodeState(`<html>
      <head>
      <style>
      ${cssCode}
      </style>
      </head>
      <body>
      ${htmlCode}
      </body>
      </html>`);
    console.log(combinedCode);
  };
  const sendHtmlCode = (e) => {
    e.preventDefault();
    // console.log(enteredHTML === htmlTemplate);
    if (combinedCode) {
      setHtmlData(combinedCode);
      history.push("/zmailer/sendemail/contact", { from: "WebEditor" });
    } else {
      message.error("Empty form can't be submitted");
      console.log("wrong!!!!!!!!!!!!!!!!!!");
    }
  };
  return (
    <>
      <div className="panel__top">
        <div className="panel__basic-actions"></div>
        <div className="panel__devices"></div>
        <div className="panel__switcher"></div>
      </div>
      <div className="editor-row">
        <div className="editor-canvas">
          <div id="gjs"></div>
        </div>
        <div className="panel__right">
          <div className="layers-container"></div>
          <div className="styles-container"></div>
          <div className="blocks-container"></div>
          <div className="traits-container"></div>
        </div>
      </div>

      <div className="button-container">
        <Button size="large" type="default" danger onClick={saveCode}>
          Save
        </Button>
        <Button size="large" type="primary" onClick={sendHtmlCode}>
          Next
        </Button>
      </div>
    </>
  );
};

export default WebEditor;
