const initialState = {
  companyList: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false
};

const companyList = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COMPANIES_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_COMPANIES_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "GET_COMPANIES_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        companyList: action.payload.data.data
      };
    default:
      return state;
  }
};

export default companyList;
