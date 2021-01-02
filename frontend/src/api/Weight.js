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

export const deleteWeightEntryCall = async (user, token, date) => {
  const axios = getAuthorizedAxios(token);
  if (user && token) {
    const { sub } = user;
    return axios.delete(`/weight/${sub}`, {
      data: { date },
    });
  }
};

export const modifyWeightEntryCall = async (user, token, date, weight) => {
  const axios = getAuthorizedAxios(token);
  if (user && token) {
    const { sub } = user;
    return axios.put(`/weight/${sub}`, {
      date,
      weight,
    });
  }
};
