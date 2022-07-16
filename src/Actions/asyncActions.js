import { message } from "antd";
import { makeAsyncRequest } from "../Constant/dataController";
import appConstant from "../Constant/appConstant";

export const getContact = (data, cbFunc1, cbFunc2, page = 0) => {
  makeAsyncRequest("get", `${appConstant.baseURL}/contact?page=${page}`, data)
    .then((res) => {
      if (res.status === 200) {
        const { getContact, total } = res.data.body;
        cbFunc1(getContact);
        cbFunc2(total);
      } else {
        message.error("Error in fetching data");
      }
    })
    .catch((error) => {
      console.log(error.response);
      message.error(error.response.data.error);
    });
};

export const getUserPagination = (data, cbFunc1, cbFunc2, page = 0) => {
  makeAsyncRequest("get", `${appConstant.baseURL}/user?page=${page}`, data)
    .then((res) => {
      if (res.status === 200) {
        const { getUser, total } = res.data.body;
        cbFunc1(getUser);
        cbFunc2(total);
      } else {
        message.error("Error in fetching data");
      }
    })
    .catch((error) => {
      message.error(error.response.data.error);
    });
};

export const getDomainPagination = (data, cbFunc1, cbFunc2, page = 0) => {
  makeAsyncRequest("get", `${appConstant.baseURL}/domain?page=${page}`, data)
    .then((res) => {
      if (res.status === 200) {
        const { getDomain, total } = res.data.body;
        cbFunc1(getDomain);
        cbFunc2(total);
      } else {
        message.error("Error in fetching data");
      }
    })
    .catch((error) => {
      message.error(error.response.data.error);
    });
};

export const getDomainForm = (data, cbFunc1) => {
  makeAsyncRequest("get", `${appConstant.baseURL}/domain`, data)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data.body);
        const { getDomain } = res.data.body;
        cbFunc1(getDomain);
      } else {
        message.error("Error in fetching data");
      }
    })
    .catch((error) => {
      message.error(error.response.data.error);
    });
};

export const getUserForm = (data, cbFunc1) => {
  makeAsyncRequest("get", `${appConstant.baseURL}/user`, data)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data.body);
        const { getUser } = res.data.body;
        cbFunc1(getUser);
      } else {
        message.error("Error in fetching data");
      }
    })
    .catch((error) => {
      message.error(error.response.data.error);
    });
};

export const getGroup = (data, cbFunc) => {
  makeAsyncRequest("get", `${appConstant.baseURL}/group`, data)
    .then((res) => {
      if (res.status === 200) {
        cbFunc(res.data.body);
      } else {
        message.error("Error in fetching data");
      }
    })
    .catch((error) => {
      message.error(error.response.data.error);
    });
};

export const getCampaign = (data, cbFunc1, cbFunc2, page = 0) => {
  makeAsyncRequest("get", `${appConstant.baseURL}/campaign?page=${page}`, data)
    .then((res) => {
      if (res.status === 200) {
        const { getCampaign, total } = res.data.body;
        cbFunc1(getCampaign);
        cbFunc2(total);
      } else {
        message.error("Error in fetching data");
      }
    })
    .catch((error) => {
      console.log(error);
      message.error(error.response.data.error);
    });
};

export const postMailData = (data, cbFunc) => {
  makeAsyncRequest("post", `${appConstant.baseURL}/sendmail`, data)
    .then((res) => {
      if (res.data.code === 200) {
        cbFunc(res.data.body);
      } else {
        message.error("Error in sending data");
      }
    })
    .catch((error) => {
      message.error(error);
    });
};

export const postContactData = (data, cbFunc) => {
  makeAsyncRequest("post", `${appConstant.baseURL}/upload`, data)
    .then((res) => {
      if (res.data.code === 200) {
        cbFunc(res.data.body);
      } else {
        message.error("Error in sending data");
      }
    })
    .catch((error) => {
      message.error(error);
    });
};
