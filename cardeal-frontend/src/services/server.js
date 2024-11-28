import axios from "axios";
import { baseUrl } from "./constants";

const server = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: 'application/j  son',
      'Content-Type': 'application/json',
    },
  });

export const multipartServer = axios.create({
baseURL: baseUrl,
headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
},
});

export default server;