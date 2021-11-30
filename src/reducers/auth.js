import * as actionTypes from 'src/actions/actionTypes';

const initialState = {
  login: {
    success: false
  },
  user: null,
  token: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        login: {success : action.data.success},
        user: action.data.user,
        token: action.data.token
      };
    default:
      return state;
  }
};
