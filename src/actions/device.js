import { ContactApi, UserApi, DeviceApi } from "src/apis";
import { aesDecrypt, aesEncrypt, decrypt, encrypt, objectEncrypt } from "src/modules/Security";

export const deviceLink = async (rsa, _values, callback) => {
	var values = await aesEncrypt(JSON.stringify(_values));
	const _key = await encrypt(values.key, rsa.server);
	values.key = _key;
	try {
		var res = await DeviceApi.deviceLink(values);
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

export const deviceUnlink = async (rsa, _values, callback) => {
	var values = await aesEncrypt(JSON.stringify(_values));
	const _key = await encrypt(values.key, rsa.server);
	values.key = _key;
	try {
		var res = await DeviceApi.deviceUnlink(values);
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

export const getDeviceStatus = async (rsa, callback) => {	
	try {
		var res = await DeviceApi.deviceStatus();
		if(res && res.data && res.data.success === true) {

			let _key2 = res.data.data.key;
			_key2 = await decrypt(_key2, rsa.private);
			let _data = res.data.data.data;
			_data = await aesDecrypt(_data, _key2);
			_data = JSON.parse(_data);
			
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
