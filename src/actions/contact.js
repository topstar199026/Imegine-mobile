import { ContactApi, UserApi } from "src/apis";
import { aesDecrypt, aesEncrypt, aesRsaEncryption, decrypt, encrypt, objectEncrypt } from "src/modules/Security";


export const getContactList = async (rsa, values, callback) => {
	try {
		var res = await ContactApi.getContactList(values);

		let _key = res.data.data.key;
		_key = await decrypt(_key, rsa.private);
		let _data = res.data.data.data;
		_data = await aesDecrypt(_data, _key);
		_data = JSON.parse(_data);	

		if(res && res.data && res.data.success === true) {
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
		console.log('-------------------', error)
		callback({
			status: false,
			error: 'Can\'t access server.',
		});
	}    
};

export const getContactList2 = async (rsa, values, callback) => {
	try {
		var res = await ContactApi.getContactList2(values);

		let _key = res.data.data.key;
		_key = await decrypt(_key, rsa.private);
		let _data = res.data.data.data;
		_data = await aesDecrypt(_data, _key);
		_data = JSON.parse(_data);	

		if(res && res.data && res.data.success === true) {
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
		console.log('-------------------', error)
		callback({
			status: false,
			error: 'Can\'t access server.',
		});
	}    
};

export const getContactList3 = async (rsa, values, callback) => {
	try {
		var res = await ContactApi.getContactList3(values);

		let _key = res.data.data.key;
		_key = await decrypt(_key, rsa.private);
		let _data = res.data.data.data;
		_data = await aesDecrypt(_data, _key);
		_data = JSON.parse(_data);	

		if(res && res.data && res.data.success === true) {
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
		console.log('-------------------', error)
		callback({
			status: false,
			error: 'Can\'t access server.',
		});
	}    
};

export const getContactList4 = async (rsa, values, callback) => {
	try {
		var res = await ContactApi.getContactList4(values);

		let _key = res.data.data.key;
		_key = await decrypt(_key, rsa.private);
		let _data = res.data.data.data;
		_data = await aesDecrypt(_data, _key);
		_data = JSON.parse(_data);	

		if(res && res.data && res.data.success === true) {
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
		console.log('-------------------', error)
		callback({
			status: false,
			error: 'Can\'t access server.',
		});
	}    
};



export const contactSave = async (rsa, _values, callback) => {
	var values = await aesEncrypt(JSON.stringify(_values));
	const _key = await encrypt(values.key, rsa.server);
	values.key = _key;
	try {
		var res = await ContactApi.contactSave(values);
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
		callback({
			status: false,
			error: 'Can\'t access server.',
		});
	}    
};

export const groupSave = async (rsa, _values, callback) => {
	var values = await aesEncrypt(JSON.stringify(_values));
	const _key = await encrypt(values.key, rsa.server);
	values.key = _key;
	try {
		var res = await ContactApi.groupSave(values);
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
		callback({
			status: false,
			error: 'Can\'t access server.',
		});
	}    
};

export const getContactInfo = async (rsa, _values) => {
	try {
		var values = await aesRsaEncryption(_values, rsa);
		values.public = rsa.public;

		var res = await ContactApi.getContactInfo(values);


		

		if(res && res.data && res.data.success === true) {
			
			let _key2 = res.data.data.key;
			_key2 = await decrypt(_key2, rsa.private);
			let _data = res.data.data.data;
			_data = await aesDecrypt(_data, _key2);
			_data = JSON.parse(_data);

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
	
}

export const getGroupContactInfo = async (rsa, groupId) => {
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

	var res = await ContactApi.getGroupContactInfo(values);

	let _key2 = res.data.data.key;
	_key2 = await decrypt(_key2, rsa.private);
	let _data = res.data.data.data;
	_data = await aesDecrypt(_data, _key2);
	_data = JSON.parse(_data);

	if(res && res.data && res.data.success === true) {
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

