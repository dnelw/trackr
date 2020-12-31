import { getAuthorizedAxios } from "./AxiosInstance";

export const getUser = async (user, token) => {
  const axios = getAuthorizedAxios(token);
  if (user && token) {
    const { sub } = user;
    return axios.get(`/user/${sub}`, {});
  }
};
