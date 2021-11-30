import * as actionTypes from './actionTypes';

const setInvoiceCategory = invoiceCategory => {
	return {
		type: actionTypes.SET_INVOICE_CATEGORY,
		invoiceCategory,
	};
};

const setInvoiceUser = invoiceUser => {
	return {
		type: actionTypes.SET_INVOICE_USER,
		invoiceUser,
	};
};

export const onSetInvoiceCategory = invoiceCategory => dispatch => {
	dispatch(setInvoiceCategory(invoiceCategory));
};

export const onSetInvoiceUser = invoiceUser => dispatch => {
	dispatch(setInvoiceUser(invoiceUser));
};