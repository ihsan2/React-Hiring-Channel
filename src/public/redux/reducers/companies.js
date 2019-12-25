const initialState = {
  companyList: [],
  isLoading: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
  isFulfilled: false,
  isRejected: false
};

const companyList = (state = initialState, action) => {
  switch (action.type) {
    // get companiy by id
    case "GET_COMPANY_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_COMPANY_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "GET_COMPANY_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        companyList: action.payload.data.data
      };

    // get companies
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
        isRejected: false,
        companyList: action.payload.data.data
      };

    // register company
    case "REGISTER_COMPANY_PENDING": {
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };
    }

    case "REGISTER_COMPANY_FULFILLED": {
      return {
        ...state,
        companyList: [...state.companyList, action.payload.data],
        isLoading: false,
        isFulfilled: true,
        isRejected: false
      };
    }

    case "REGISTER_COMPANY_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    }

    // update company
    case "UPDATE_COMPANY_PENDING": {
      return {
        ...state,
        isLoadingUpdate: true,
        isRejected: false,
        isFulfilled: false
      };
    }

    case "UPDATE_COMPANY_FULFILLED": {
      return {
        ...state,
        companyList: [...state.companyList, action.payload.data],
        isLoadingUpdate: false,
        isFulfilled: true,
        isRejected: false
      };
    }

    case "UPDATE_COMPANY_REJECTED": {
      return {
        ...state,
        isLoadingUpdate: false,
        isRejected: true
      };
    }

    // delete company
    case "DELETE_COMPANY_PENDING": {
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };
    }

    case "DELETE_COMPANY_FULFILLED": {
      return {
        ...state,
        companyList: [],
        isLoading: false,
        isFulfilled: true,
        isRejected: false
      };
    }

    case "DELETE_COMPANY_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    }
    default:
      return state;
  }
};

export default companyList;
