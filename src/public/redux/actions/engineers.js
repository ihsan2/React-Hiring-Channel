import axios from "axios";

export const getEngineer = url => ({
  type: "GET_ENGINEER",
  payload: axios.get(url)
});

export const getEngineers = url => ({
  type: "GET_ENGINEERS",
  payload: axios.get(url)
});

export const registerEngineer = (url, dataEngineer) => ({
  type: "REGISTER_ENGINEER",
  payload: axios.post(url, dataEngineer, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
});

export const updateEngineer = (url, dataEngineer) => ({
  type: "UPDATE_ENGINEER",
  payload: axios.put(url, dataEngineer, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
});

export const deleteEngineer = url => ({
  type: "DELETE_ENGINEER",
  payload: axios.delete(url)
});
