import * as actionTypes from 'src/actions/actionTypes';

const initialState = {
  invoiceCategory: null,
  invoiceUser: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_INVOICE_CATEGORY:
      return {
        ...state,
        invoiceCategory: action.invoiceCategory,
      };
    case actionTypes.SET_INVOICE_USER:
      return {
        ...state,
        invoiceUser: action.invoiceUser,
      };
    default:
      return state;
  }
};
