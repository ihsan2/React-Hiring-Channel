import axios from "axios";

export const getEngineers = test => ({
  type: "GET_ENGINEERS",
  payload: axios.get(
    `${process.env.REACT_APP_BASE_URL}/engineers?sort=name&limit=12`
  )
});
