const initialState = {
  isLoading: false,
  isError: false,
  isLoggedIn: false,
  errorMsg: '',
  data: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLoggedIn: false,
      };
    case 'REGISTER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isLoggedIn: false,
        errorMsg: 'Data Rejected',
      };
    case 'REGISTER_FULFILLED':
      //   console.log(action.payload.data);
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLoggedIn: true,
        data: action.payload.data.data,
      };
    default:
      return state;
  }
};

export default auth;
