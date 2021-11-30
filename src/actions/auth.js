import axios from 'axios';

import { encrypt, objectEncrypt, aesEncrypt, aesDecrypt, decrypt } from 'src/modules/Security';
import { UserApi } from 'src/apis';
import * as actionTypes from './actionTypes';

import { createSocketIO, sendMessage } from 'src/modules/Socket';

const onLogin = data => {
	return {
		type: actionTypes.LOGIN,
		data
	};
};

export const login = (rsa, _values, callback) =>  async dispatch => {
	var values = await objectEncrypt(_values, rsa.server);
	try {
		var res = await UserApi.loginUser(values);
		if(res && res.data && res.data.success === true) {
			let _key = res.data.data.key;
			_key = await decrypt(_key, rsa.private);
			let _data = res.data.data.data;
			_data = await aesDecrypt(_data, _key);
			_data = JSON.parse(_data);				
			console.log('login user', _data);
			axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
			// createSocketIO(_data.userId);
			dispatch(onLogin({
				login: {success: true},
				user: _data,
				token: res.data.token,
			}));
			if (typeof callback === 'function') {
				callback({
					status: true,
					data: _data,
				});
			}
		}else if(res && res.data && res.data.success === false && res.data.error) {
			callback({
				status: false,
				error: res.data.error,
			});
		}
	} catch (error) {
		callback({
			status: false,
			error: 'Can\'t access server.',
		});
	}    
};

export const register = (rsa, _values, callback) =>  async dispatch => {
	var values = await objectEncrypt(_values, rsa.server);
	// console.log('_values', values)
	try {
		var res = await UserApi.registerUser(values);
		if(res && res.data && res.data.success === true) {
			if (typeof callback === 'function') {
				callback({
					status: true,
					data: null,
				});
			}
		}else if(res && res.data && res.data.success === false && res.data.error) {
			callback({
				status: false,
				error: res.data.error,
			});
		}
	} catch (error) {
		console.log('error', error)
		callback({
			status: false,
			error: 'Can\'t access server.',
		});
	}    
};

export const logout = (values, callback) =>  async dispatch => {
  
};

export const imageUpload = async (_values, callback) => {	
	try {
		var res = await UserApi.uploadImage(_values);
		if(res && res.data && res.data.success === true) {
			if (typeof callback === 'function') {
				callback({
					status: true,
					data: res.data.imageName,
				});
			}
		}else if(res && res.data && res.data.success === false && res.data.error) {
			callback({
				status: false,
				error: res.data.error,
			});
		}
	} catch (error) {
		console.log('error', error)
		callback({
			status: false,
			error: 'Can\'t access server.',
		});
	}    
};

// export const logout = (values, callback) =>  async dispatch => {
// 	try{
// 	  axios.defaults.headers.common['Authorization'] = ``;
// 	  await dispatch(onLogin({success:false,user:null,token:null}));
// 	  if (typeof callback === 'function') {
// 		callback(values);
// 	  }
// 	}catch(e){
// 	  if (typeof callback === 'function') {
// 		callback(values);
// 	  }
// 	}  
//   };