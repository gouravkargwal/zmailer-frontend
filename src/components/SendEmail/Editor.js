import React from "react";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "./Editor.css";
import { Controlled as ControlledEditor } from "react-codemirror2";

const Editor = (props) => {
  const { displayName, language, value, onChange } = props;

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  return (
    <>
      <div className="editor-container">
        <div className="editor-title">{displayName}</div>
        <ControlledEditor
          onBeforeChange={handleChange}
          value={value}
          options={{
            lineNumbers: true,
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: "material",
          }}
          // style={{ height: "78vh" }}
        />
      </div>
    </>
  );
};

export default Editor;
