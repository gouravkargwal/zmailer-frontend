import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Modal, Drawer, Button } from "antd";
import { DeleteOutlined, WarningTwoTone } from "@ant-design/icons";
import appConstant from "../../Constant/appConstant";
import { getDomainPagination } from "../../Actions/asyncActions";
import { domainSchema } from "../../Validations/validation";
import { FormContainer, FormItem, Input } from "../UI/FormStyles";
import {
  TableContainer,
  TableBodyRow,
  TableHeadRow,
  TableCell,
  TableHeader,
} from "../UI/TableStyles";
import { Heading, TitleContainer } from "../UI/TitleStyles";
import {
  ButtonContainer,
  PaginationButton,
  ButtonForm,
} from "../UI/ButtonStyles";

const Domain = () => {
  const [getDomain, setDomainData] = useState([]);
  const [getTotal, setTotalData] = useState([]);

  const [pageNumber, setPageNumber] = useState("0");
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [deleteDomain, setDeleteDomain] = useState("");

  const pages = new Array(getTotal).fill(null).map((v, i) => i);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    getDomainPagination({}, setDomainData, setTotalData, pageNumber);
    // axios
    //   .get(`${appConstant.baseURL}/domain?page=${pageNumber}`)
    //   .then((res) => {
    //     console.log(res);
    //     setDomainData(res.data.body.getDomain);
    //     setTotalData(res.data.body.total);
    //   })
    //   .catch((err) => {
    //     message.error(err.response.data.error);
    //   });
  }, [pageNumber]);

  //Form Data Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);
    const isValid = await domainSchema.isValid(formData);
    console.log(isValid);
    if (isValid) {
      axios
        .post(`${appConstant.baseURL}/domain`, formData)
        .then((res) => {
          console.log(res);
          message.success(res.data.message);
          setVisible(false);
          getDomainPagination({}, setDomainData, setTotalData, pageNumber);
        })
        .catch((error) => {
          message.error(error.response.data.error);
        });
    } else {
      message.error("Fill Details");
    }
  };

  const showModal = (e, id) => {
    console.log(id);
    setVisible2(true);
    setDeleteDomain(id);
  };

  const handleOk = (e) => {
    const data = {};
    data.domainId = deleteDomain;
    axios
      .delete(`${appConstant.baseURL}/domain`, data)
      .then((res) => {
        message.success(res.data.message);
        setVisible2(false);
        axios
          .get(`${appConstant.baseURL}/domain?page=${pageNumber}`)
          .then((res) => {
            setDomainData(res.data.body.getUser);
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
        <Heading>Domain Management</Heading>
        <Button type="primary" onClick={showDrawer}>
          Add Domain
        </Button>
      </TitleContainer>
      <Drawer
        title="Add Domain"
        placement="right"
        width={400}
        onClose={onClose}
        visible={visible}
      >
        <FormContainer onSubmit={submitHandler}>
          <FormItem>
            <label htmlFor="domain">Domain</label>
            <Input type="text" name="domain" id="domain" required></Input>
          </FormItem>
          <FormItem>
            <label htmlFor="selector">Key Selector</label>
            <Input type="text" name="selector" id="selector" required></Input>
          </FormItem>
          <FormItem>
            <label htmlFor="dkim">Dkim Key</label>
            <Input type="text" name="dkim" id="dkim" required></Input>
          </FormItem>
          <FormItem>
            <ButtonForm>Submit</ButtonForm>
          </FormItem>
        </FormContainer>
      </Drawer>

      {!getDomain ? (
        "No Data Found"
      ) : (
        <TableContainer className="content-table">
          <thead>
            <TableHeadRow key="Domain List">
              <TableHeader key="Domain">Domain</TableHeader>
              <TableHeader key="Selector">Key Selector</TableHeader>
              <TableHeader key="Action">Action</TableHeader>
            </TableHeadRow>
          </thead>
          <tbody>
            {getDomain.map((domain, index) => {
              return (
                <TableBodyRow key={index}>
                  <TableCell key={`${index}0`}>{domain.domain}</TableCell>
                  <TableCell key={`${index}1`}>{domain.selector}</TableCell>
                  <TableCell key={`${index}2`}>
                    <Button onClick={(e) => showModal(e, domain._id)} danger>
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
              onClick={() => {
                setPageNumber(el);
              }}
              key={index}
            >
              {el + 1}
            </PaginationButton>
          );
        })}
      </ButtonContainer>
    </>
  );
};

export default Domain;
