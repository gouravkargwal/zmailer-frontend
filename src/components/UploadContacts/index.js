import React, { useState, useEffect } from "react";
import axios from "axios";
import { Drawer, Button, message, Modal } from "antd";
import { DeleteOutlined, WarningTwoTone } from "@ant-design/icons";
import { uploadSchema } from "../../Validations/validation";
import { getContact } from "../../Actions/asyncActions";
import appConstant from "../../Constant/appConstant";
import { FormContainer, FormItem, Input } from "../UI/FormStyles";
import {
  TableContainer,
  TableBodyRow,
  TableHeadRow,
  TableCell,
  TableHeader,
} from "../UI/TableStyles";
import { TitleContainer } from "../UI/TitleStyles";
import { ButtonContainer, PaginationButton } from "../UI/ButtonStyles";

const UploadContact = () => {
  const [file, setFileState] = useState("");
  const [group, setGroupState] = useState("");
  const [getData, setGetData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [getTotal, setTotalData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [visible2, setVisible2] = useState(false);
  const [deleteContact, setDeleteContact] = useState("");

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    getContact({}, setGetData, setTotalData, pageNumber);
    // axios
    //   .get(`${appConstant.baseURL}/contact?page=${pageNumber}`)
    //   .then((res) => {
    //     setGetData(res.data.body.getContact2);
    //     setTotalData(res.data.body.total);
    //   })
    //   .catch((err) => {
    //     message.error(err.response.data.error);
    //   });
  }, [pageNumber]);

  const handleChange = (event) => {
    setFileState(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const sendUploadedFile = async (e) => {
    e.preventDefault();
    let data = {};
    data.group = group;
    data.file = file;
    const isValid = await uploadSchema.isValid(data);
    if (isValid) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("group", group);
      axios
        .post(`${appConstant.baseURL}/contact`, formData, {})
        .then((res) => {
          console.log(res);
          getContact({}, setGetData, setTotalData, pageNumber);
          message.success(res.data.message);
          setVisible(false);
          setFileState("");
          setGroupState("");
        })
        .catch((error) => {
          message.error(error.response.data.error);
        });
    } else {
      message.error("Fill the Data");
    }
  };

  const pages = new Array(getTotal).fill(null).map((v, i) => i);

  const showModal = (e, id) => {
    setVisible2(true);
    console.log(id);
    setDeleteContact(id);
  };

  const handleOk = (e) => {
    console.log(deleteContact, "Delete list id");
    const data = {};
    data.emailinglistid = deleteContact;
    axios
      .delete(`${appConstant.baseURL}/contact`, data)
      .then((res) => {
        message.success(res.data.message);
        getContact({}, setGetData, setTotalData, pageNumber);
        setVisible2(false);
      })
      .catch((error) => {
        message.error(error.response.data.error);
        setVisible2(false);
      });
  };

  const handleCancel = () => {
    setVisible2(false);
  };

  return (
    <>
      <TitleContainer>
        <h1>Contact Lists</h1>
        <Button type="primary" onClick={showDrawer}>
          Add Contacts
        </Button>
      </TitleContainer>
      <Drawer
        title="Upload CSV"
        placement="right"
        width={400}
        onClose={onClose}
        visible={visible}
      >
        <FormContainer>
          <FormItem>
            <label htmlFor="group">Enter Group Name</label>
            <Input
              type="text"
              id="group"
              name="group"
              value={group}
              placeholder="Choose a unique name..."
              onChange={(e) => setGroupState(e.target.value)}
            ></Input>
          </FormItem>
          <FormItem>
            <label htmlFor="upload">Upload CSV</label>
            <Input
              type="file"
              id="upload"
              name="upload"
              onChange={handleChange}
            ></Input>
          </FormItem>
          <FormItem>
            <Button onClick={sendUploadedFile} type="submit">
              Upload
            </Button>
          </FormItem>
        </FormContainer>
      </Drawer>

      {!getData ? (
        "No Data Found"
      ) : (
        <TableContainer>
          <thead>
            <TableHeadRow key="Contact List">
              <TableHeader key="List Name">Emailing List</TableHeader>
              <TableHeader key="Count">Count</TableHeader>
              <TableHeader key="Action">Action</TableHeader>
            </TableHeadRow>
          </thead>
          <tbody>
            {getData.map((data, index) => {
              return (
                <TableBodyRow key={index}>
                  <TableCell key={`${index}0`}>{data.name}</TableCell>
                  <TableCell key={`${index}1`}>{data.count}</TableCell>
                  <TableCell key={`${index}2`}>
                    <Button onClick={(e) => showModal(e, data._id)} danger>
                      <DeleteOutlined></DeleteOutlined>
                    </Button>
                    <Modal
                      title="Warning!"
                      visible={visible2}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <div>
                        <h3>
                          <WarningTwoTone />
                          <span> </span> Are you sure?
                        </h3>
                        <p>This can't be reversed.</p>
                      </div>
                    </Modal>
                  </TableCell>
                </TableBodyRow>
              );
            })}
          </tbody>
        </TableContainer>
      )}
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
  );
};

export default UploadContact;
