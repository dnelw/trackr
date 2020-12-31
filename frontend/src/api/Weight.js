import { getAuthorizedAxios } from "./AxiosInstance";

export const addWeightEntryCall = async (user, token, date, weight) => {
  const axios = getAuthorizedAxios(token);
  if (user && token) {
    const { sub } = user;
    return axios.post(`/weight/${sub}`, {
      date,
      weight,
    });
  }
};
