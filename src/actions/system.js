import * as actionTypes from './actionTypes';

const setOS = os => {
	return {
		type: actionTypes.SET_OS,
		os,
	};
};

const setRSA = rsa => {
	return {
		type: actionTypes.SET_RSA,
		rsa,
	};
};

const setControlBarPosition = position => {
	return {
		type: actionTypes.SET_CONTROL_BAR_POSITION,
		position,
	};
};

const setLoadingState = loadingState => {
	return {
		type: actionTypes.SET_LOADING_STATE,
		loadingState,
	};
};


export const onSetOS = os => dispatch => {
	dispatch(setOS(os));
};

export const onSetRSA = rsa => dispatch => {
	dispatch(setRSA(rsa));
};

export const onSetControlBarPosition = position => dispatch => {
	dispatch(setControlBarPosition(position));
};

export const onSetLoadingState = loadingState => dispatch => {
	dispatch(setLoadingState(loadingState));
};


