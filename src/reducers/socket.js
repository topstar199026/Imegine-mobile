import * as actionTypes from 'src/actions/actionTypes';

const initialState = {
  	newMessage: '',
	messageStateFlag: null,
};

export default (state = initialState, action = {}) => {
	switch (action.type) {
		case actionTypes.NEW_MESSAGE:
			return {
				...state,
				newMessage: action.newMessage,
			};
		case actionTypes.MESSAGE_STATE_FLAG:
			return {
				...state,
				messageStateFlag: action.messageStateFlag,
			};
		default:
			return state;
	}
};
