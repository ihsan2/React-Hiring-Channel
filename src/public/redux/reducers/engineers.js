const initialState = {
  pageDetail: [],
  engineerList: [],
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false
};

const engineerList = (state = initialState, action) => {
  switch (action.type) {
    // get engineer by id
    case "GET_ENGINEER_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_ENGINEER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "GET_ENGINEER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        engineerList: action.payload.data.data
      };

    // get engineers
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
        isRejected: false,
        engineerList: action.payload.data.data,
        pageDetail: action.payload.data.pageDetail
      };

    // register company
    case "REGISTER_ENGINEER_PENDING": {
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };
    }

    case "REGISTER_ENGINEER_FULFILLED": {
      return {
        ...state,
        engineerList: [...state.engineerList, action.payload.data],
        isLoading: false,
        isFulfilled: true,
        isRejected: false
      };
    }

    case "REGISTER_ENGINEER_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    }

    // update engineer
    case "UPDATE_ENGINEER_PENDING": {
      return {
        ...state,
        isLoadingUpdate: true,
        isRejected: false,
        isFulfilled: false
      };
    }

    case "UPDATE_ENGINEER_FULFILLED": {
      return {
        ...state,
        engineerList: [...state.engineerList, action.payload.data],
        isLoadingUpdate: false,
        isFulfilled: true,
        isRejected: false
      };
    }

    case "UPDATE_ENGINEER_REJECTED": {
      return {
        ...state,
        isLoadingUpdate: false,
        isRejected: true
      };
    }

    // delete engineer
    case "DELETE_ENGINEER_PENDING": {
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };
    }

    case "DELETE_ENGINEER_FULFILLED": {
      return {
        ...state,
        engineerList: [],
        isLoading: false,
        isFulfilled: true,
        isRejected: false
      };
    }

    case "DELETE_ENGINEER_REJECTED": {
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

export default engineerList;
