const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {},
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'PUTUSERS_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMsg: '',
      };
    case 'PUTUSERS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected!',
      };
    case 'PUTUSERS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
      };
    default:
      return state;
  }
};

export default users;
