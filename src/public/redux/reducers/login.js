const initialState = {
  loginData: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  isLoggedin: false,
  accessToken: ""
};

const login = (state = initialState, action) => {
  switch (action.type) {
    // login company
    case "LOGIN_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
        isLoggedin: false
      };
    case "LOGIN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
        isLoggedin: false
      };
    case "LOGIN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        isLoggedin: true,
        loginData: action.payload.data.data,
        accessToken: action.payload.data.accessToken
      };

    default:
      return state;
  }
};

export default login;
