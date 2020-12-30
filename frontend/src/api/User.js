import { getAuthorizedAxios } from "./AxiosInstance";

export const getUser = async (user, token) => {
  const axios = getAuthorizedAxios(token);
  if (user && token) {
    const { sub } = user;
    axios.get(`/user/${sub}`, {}).then((data) => {
      console.log(data.data);
    });
  }
};
