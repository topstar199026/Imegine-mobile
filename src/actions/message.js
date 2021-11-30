import { ContactApi, UserApi, MessageApi } from "src/apis";
import { aesDecrypt, aesEncrypt, decrypt, encrypt, objectEncrypt } from "src/modules/Security";

import { ContactWorker, ChanelWorker, MessageWorker } from 'src/models';
import * as actionTypes from './actionTypes';

const setMessageStateFlag = messageStateFlag => {
	return {
		type: actionTypes.MESSAGE_STATE_FLAG,
		messageStateFlag,
	};
};

export const onSetMessageStateFlag = messageStateFlag => dispatch => {
	dispatch(setMessageStateFlag(messageStateFlag));
};

export const getGroupId = async (rsa, user, contactInfo) => {
	try {
		console.log('get group id request', contactInfo);

		const isContactInfo = contactInfo.groupId ? true : false;

		console.log('***********isContactInfo*isContactInfo**********', isContactInfo);

		if(isContactInfo === true) {
			let _private = !contactInfo.isGroup;
			let groupId = await ChanelWorker.getGroupId(contactInfo.groupId);
			console.log('----groupId', groupId, contactInfo);
			if(groupId) {
				return {
					status: true,
					data: groupId,
				};
			}else {
				const data = {
					sender: {
						id: user.id,
						userId: user.userId,
					},
					receiver: {
						id: contactInfo.contactUserId,
						contactId: contactInfo.contactId
					},
					groupId: contactInfo.groupId,
					private: _private,
				};
				var values = await aesEncrypt(JSON.stringify(data));
				const _key = await encrypt(values.key, rsa.server);
				values.key = _key;
				values.public = rsa.public;

				var res = await MessageApi.getGroupId(values);

				

				let _key2 = res.data.data.key;
				_key2 = await decrypt(_key2, rsa.private);
				let _data = res.data.data.data;
				_data = await aesDecrypt(_data, _key2);
				_data = JSON.parse(_data);

				console.log('get group id info -------------', _data)

				if(res && res.data && res.data.success === true) {

					ChanelWorker.saveGroupId(_data);
					return {
						status: true,
						data: _data,
					}
				}else if(res && res.data && res.data.success === false && res.data.error) {
					return {
						status: false,
						error: res.data.error,
					}
				}
			}
		}else{
			let groupId = await ChanelWorker.getGroupId2(user, contactInfo);
			console.log('----groupId --s-df--3--4343- 1st--', groupId, contactInfo);
			if(groupId) {
				return {
					status: true,
					data: groupId,
				};
			}else {
				const data = {
					sender: {
						id: user.id,
						userId: user.userId,
					},
					receiver: {
						id: contactInfo.id,
						contactId: contactInfo.userId
					},
					groupId: contactInfo.groupId,
					private: true,
				};
				console.log('----groupId --s-df--3--4343---', data);
				var values = await aesEncrypt(JSON.stringify(data));
				const _key = await encrypt(values.key, rsa.server);
				values.key = _key;
				values.public = rsa.public;

				var res = await MessageApi.getGroupId(values);

				

				let _key2 = res.data.data.key;
				_key2 = await decrypt(_key2, rsa.private);
				let _data = res.data.data.data;
				_data = await aesDecrypt(_data, _key2);
				_data = JSON.parse(_data);

				console.log('get group id info -------------', _data)

				if(res && res.data && res.data.success === true) {

					ChanelWorker.saveGroupId(_data);
					return {
						status: true,
						data: _data,
					}
				}else if(res && res.data && res.data.success === false && res.data.error) {
					return {
						status: false,
						error: res.data.error,
					}
				}
			}
		}
		
	} catch (error) {
		console.log('-------------------', error)
		return {
			status: false,
			error: 'Can\'t access server.',
		}
	}    
};

export const getGroupById2 = async (rsa, groupId) => {
	try {
		const data = {
			sender: {
				id: null,
				userId: null,
			},
			receiver: {
				id: null,
				contactId: null
			},
			groupId: groupId,
			private: null,
		};
		var values = await aesEncrypt(JSON.stringify(data));
		const _key = await encrypt(values.key, rsa.server);
		values.key = _key;
		values.public = rsa.public;

		var res = await MessageApi.getGroupId(values);
		console.log('----------9-----------------------')
		let _key2 = res.data.data.key;
		_key2 = await decrypt(_key2, rsa.private);
		let _data = res.data.data.data;
		_data = await aesDecrypt(_data, _key2);
		_data = JSON.parse(_data);

		if(res && res.data && res.data.success === true) {
			console.log('----------10-----------------------')
			await ChanelWorker.saveGroupId(_data);
			console.log('----------11-----------------------')
			return {
				status: true,
				data: _data,
			}
		}else if(res && res.data && res.data.success === false && res.data.error) {
			return {
				status: false,
				error: res.data.error,
			}
		}
		
	} catch (error) {
		console.log('-------------------', error)
		return {
			status: false,
			error: 'Can\'t access server.',
		}
	}    
};

export const getGroupById3 = async (_groupId) => {
	let groupId = await ChanelWorker.getGroupId(_groupId);
	if(groupId) {
		return {
			status: true,
			data: groupId,
		};
	}else{
		return {
			status: false,
			data: null,
		};
	}
}

export const getGroupById4 = async (rsa, groupId) => {
	try {
		const data = {
			sender: {
				id: null,
				userId: null,
			},
			receiver: {
				id: null,
				contactId: null
			},
			groupId: groupId,
			private: null,
		};
		var values = await aesEncrypt(JSON.stringify(data));
		const _key = await encrypt(values.key, rsa.server);
		values.key = _key;
		values.public = rsa.public;

		var res = await MessageApi.getGroupId(values);
		console.log('----------9-----------------------')
		let _key2 = res.data.data.key;
		_key2 = await decrypt(_key2, rsa.private);
		let _data = res.data.data.data;
		_data = await aesDecrypt(_data, _key2);
		_data = JSON.parse(_data);

		if(res && res.data && res.data.success === true) {
			console.log('----------10-----------------------')
			return {
				status: true,
				data: _data,
			}
		}else if(res && res.data && res.data.success === false && res.data.error) {
			return {
				status: false,
				error: res.data.error,
			}
		}
		
	} catch (error) {
		console.log('-------------------', error)
		return {
			status: false,
			error: 'Can\'t access server.',
		}
	}    
};

export const getGroupIdList = async (rsa, user, list) => {
	try {
		var values = await aesEncrypt(JSON.stringify(list));
		const _key = await encrypt(values.key, rsa.server);
		values.key = _key;
		values.public = rsa.public;

		var res = await MessageApi.getGroupIdList(values);

		

		let _key2 = res.data.data.key;
		_key2 = await decrypt(_key2, rsa.private);
		let _data = res.data.data.data;
		_data = await aesDecrypt(_data, _key2);
		_data = JSON.parse(_data);

		console.log('get group id info -------------', _data)

		if(res && res.data && res.data.success === true) {

			// ChanelWorker.saveGroupId(_data);
			return {
				status: true,
				data: _data,
			}
		}else if(res && res.data && res.data.success === false && res.data.error) {
			return {
				status: false,
				error: res.data.error,
			}
		}
		
	} catch (error) {
		console.log('-------------------', error)
		return {
			status: false,
			error: 'Can\'t access server.',
		}
	}    
};


export const deleteHistory = async (groupInfo) => {
	await MessageWorker.deleteHistory(groupInfo);
	await ChanelWorker.deleteHistory(groupInfo);
}

export const deleteMessageByIdArr = async (arr) => {
	await MessageWorker.deleteMessageByIdArr(arr);
}