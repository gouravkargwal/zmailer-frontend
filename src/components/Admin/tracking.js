import React, { useState } from "react";
import axios from "axios";
import appConstant from "../../Constant/appConstant";

const Tracking = () => {
  const [file, setFileState] = useState("");
  const [name, setNameState] = useState("");

  const handleChange = (event) => {
    setFileState(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const sendUploadedFile = (e) => {
    e.preventDefault();
    console.log("Hello");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    axios.post(`${appConstant.baseURL}/tracking`, formData, {}).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setNameState(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="upload">Upload Email Tracking Image</label>
          <input
            type="file"
            id="upload"
            name="upload"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <button onClick={sendUploadedFile} type="submit">
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default Tracking;
