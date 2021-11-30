import * as actionTypes from 'src/actions/actionTypes';

const initialState = {
  	os: true,
	controlBarPosition: 'bottom',
	rsa: {},
	loadingState: {
		state: false,
		title: null,
	}
};

export default (state = initialState, action = {}) => {
	switch (action.type) {
		case actionTypes.SET_OS:
			return {
				...state,
				os: action.os,
			};
		case actionTypes.SET_CONTROL_BAR_POSITION:
			return {
				...state,
				controlBarPosition: action.position,
			};
		case actionTypes.SET_RSA:
			return {
				...state,
				rsa: action.rsa,
			};
		case actionTypes.SET_LOADING_STATE:
			return {
				...state,
				loadingState: action.loadingState,
			};
			
		default:
			return state;
	}
};
