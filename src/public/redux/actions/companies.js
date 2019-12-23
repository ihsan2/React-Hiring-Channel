import axios from "axios";

export const getCompanies = url => ({
  type: "GET_COMPANIES",
  payload: axios.get(url)
});
