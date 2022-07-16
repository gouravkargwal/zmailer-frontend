import axios from "axios";
import { getCookie } from "../components/Auth/Helpers";

const AsyncRequest = axios.create();
const Request = axios.create();

export const makeAsyncRequest = (
  method,
  url,
  data = {},
  headers = { Authorization: `Bearer ${getCookie("token")}` }
) => {
  const options = { method, url, data, headers };
  return AsyncRequest(options);
};
export const makeRequest = (method, url, data, headers = {}) => {
  const options = { method, url, data, headers };
  return Request(options);
};
