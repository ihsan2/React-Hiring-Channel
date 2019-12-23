const initialState = {
  pageDetail: [],
  engineerList: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false
};

const engineerList = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ENGINEERS_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_ENGINEERS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "GET_ENGINEERS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        engineerList: action.payload.data.data,
        pageDetail: action.payload.data.pageDetail
      };
    default:
      return state;
  }
};

export default engineerList;
