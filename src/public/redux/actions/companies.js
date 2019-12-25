import axios from "axios";

export const getCompany = url => ({
  type: "GET_COMPANY",
  payload: axios.get(url)
});

export const getCompanies = url => ({
  type: "GET_COMPANIES",
  payload: axios.get(url)
});

export const registerCompany = (url, dataCompany) => ({
  type: "REGISTER_COMPANY",
  payload: axios.post(url, dataCompany, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
});

export const updateCompany = (url, dataCompany) => ({
  type: "UPDATE_COMPANY",
  payload: axios.put(url, dataCompany, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
});

export const deleteCompany = url => ({
  type: "DELETE_COMPANY",
  payload: axios.delete(url)
});
