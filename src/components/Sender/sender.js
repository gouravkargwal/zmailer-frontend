import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Modal, Drawer, Button } from "antd";
import { DeleteOutlined, WarningTwoTone } from "@ant-design/icons";
import appConstant from "../../Constant/appConstant";
import { getUserPagination } from "../../Actions/asyncActions";
import { userSchema } from "../../Validations/validation";
import { FormContainer, FormItem, Input } from "../UI/FormStyles";
import {
  TableContainer,
  TableBodyRow,
  TableHeadRow,
  TableCell,
  TableHeader,
} from "../UI/TableStyles";
import { Heading, TitleContainer } from "../UI/TitleStyles";
import { ButtonContainer, PaginationButton } from "../UI/ButtonStyles";

const Sender = () => {
  //Form Data States
  const [sender, setSender] = useState("");

  const [getSender, setSenderData] = useState([]);
  const [getTotal, setTotalData] = useState([]);

  const [pageNumber, setPageNumber] = useState("0");
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [deleteUser, setDeleteUser] = useState("");

  const pages = new Array(getTotal).fill(null).map((v, i) => i);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    getUserPagination({}, setSenderData, setTotalData, pageNumber);
  }, [pageNumber]);

  //Form Data Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    let data = {};
    data.sender = sender;
    console.log(data);
    const isValid = await userSchema.isValid(data);
    if (isValid) {
      axios
        .post(`${appConstant.baseURL}/user`, data)
        .then((res) => {
          message.success(res.data.message);
          setVisible(false);
          setSender("");

          getUserPagination({}, setSenderData, setTotalData, pageNumber);
        })
        .catch((error) => {
          message.error(error.response.data.error);
          setSender("");
        });
    } else {
      message.error("Fill Details");
    }
  };

  const showModal = (e, id) => {
    console.log(id);
    setVisible2(true);
    setDeleteUser(id);
  };

  const handleOk = (e) => {
    const data = {};
    data.senderId = deleteUser;
    axios
      .delete(`${appConstant.baseURL}/user`, data)
      .then((res) => {
        message.success(res.data.message);
        setVisible2(false);
        axios
          .get(`${appConstant.baseURL}/user?page=${pageNumber}`)
          .then((res) => {
            setSenderData(res.data.body.getUser);
            setTotalData(res.data.body.total);
          })
          .catch((err) => {
            message.error(err.response.data.error);
          });
      })
      .catch((error) => {
        setVisible2(false);
        message.error(error.response.data.error);
      });
  };

  const handleCancel = () => {
    setVisible2(false);
  };
  return (
    <>
      <TitleContainer>
        <Heading>Sender Management</Heading>
        <Button type="primary" onClick={showDrawer}>
          Create Sender
        </Button>
      </TitleContainer>
      <Drawer
        title="Add Sender"
        placement="right"
        width={400}
        onClose={onClose}
        visible={visible}
      >
        <FormContainer>
          <FormItem>
            <label htmlFor="sender">Sender</label>
            <Input
              type="text"
              name="sender"
              id="sender"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
            ></Input>
          </FormItem>
          <FormItem>
            <Button type="submit" onClick={submitHandler}>
              Submit
            </Button>
          </FormItem>
        </FormContainer>
      </Drawer>
      {!getSender ? (
        "No Data Found"
      ) : (
        <TableContainer className="content-table">
          <thead>
            <TableHeadRow key="User List">
              <TableHeader key="Sender">Sender</TableHeader>
              <TableHeader key="Action">Action</TableHeader>
            </TableHeadRow>
          </thead>
          <tbody>
            {getSender.map((user, index) => {
              return (
                <TableBodyRow key={index}>
                  <TableCell key={`${index}0`}>
                    {user.sender.toUpperCase()}
                  </TableCell>
                  <TableCell key={`${index}1`}>
                    <Button onClick={(e) => showModal(e, user._id)} danger>
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

export default Sender;
