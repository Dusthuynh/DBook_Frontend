import axios from "axios";

export default (baseURL) => {
  return axios.create({
    baseURL,
    ...commonConfig,
  });
};

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
