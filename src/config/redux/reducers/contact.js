const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {},
};

const contact = (state = initialState, action) => {
  switch (action.type) {
    case 'GETALLCONTACT_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'GETALLCONTACT_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected!',
      };
    case 'GETALLCONTACT_FULFILLED':
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

export default contact;
