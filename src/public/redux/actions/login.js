import axios from "axios";

export const loginEngineer = data => ({
  type: "LOGIN",
  payload: axios.post(`${process.env.REACT_APP_BASE_URL}/auth/engineer`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  })
});

export const loginCompany = data => ({
  type: "LOGIN",
  payload: axios.post(`${process.env.REACT_APP_BASE_URL}/auth/company`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  })
});
