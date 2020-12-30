import axios from "axios";
const serverURL = process.env.REACT_APP_API_URI;

export const getAuthorizedAxios = (token) => {
  return axios.create({
    baseURL: serverURL,
    timeout: 5000,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAxios = () => {
  return axios.create({ baseURL: serverURL, timeout: 5000 });
};
