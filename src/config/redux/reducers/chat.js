const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {},
  chat: []
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case 'GETCHATS_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMsg: '',
      };
    case 'GETCHATS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected!',
      };
    case 'GETCHATS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
      };

    case 'SHOW_ALL_CHATS_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMsg: '',
      };
    case 'SHOW_ALL_CHATS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected!',
      };
    case 'SHOW_ALL_CHATS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        chat: action.payload.data.data,
      };

    case 'POST_CHATS_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMsg: '',
      };
    case 'POST_CHATS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected!',
      };
    case 'POST_CHATS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        chat: action.payload.data.data
      };

    case 'UPDATE_CHATS_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMsg: '',
      };
    case 'UPDATE_CHATS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected!',
      };
    case 'UPDATE_CHATS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    default:
      return state;
  }
};

export default chat;
