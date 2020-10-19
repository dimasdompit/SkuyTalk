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

    case 'SEARCH_CONTACT_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'SEARCH_CONTACT_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected!',
      };
    case 'SEARCH_CONTACT_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
      };

    case 'ADD_CONTACT_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'ADD_CONTACT_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected!',
      };
    case 'ADD_CONTACT_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    default:
      return state;
  }
};

export default contact;
