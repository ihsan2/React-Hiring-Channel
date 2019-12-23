import axios from "axios";

export const getEngineers = url => ({
  type: "GET_ENGINEERS",
  payload: axios.get(url)
});
