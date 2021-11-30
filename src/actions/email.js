import { EmailApi, UserApi } from "src/apis";
import { aesDecrypt, aesEncrypt, decrypt, encrypt, objectEncrypt } from "src/modules/Security";

export const emailSave = async (rsa, _values, callback) => {
	var values = await aesEncrypt(JSON.stringify(_values));
	const _key = await encrypt(values.key, rsa.server);
	values.key = _key;
	try {
		var res = await EmailApi.emailSave(values);
		if(res && res.data && res.data.success === true) {
			if (typeof callback === 'function') {
				console.log('res---3-', res.data)
				callback({
					status: true,
					error: null,
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

export const emailSave2 = async (rsa, _values) => {
	var values = await aesEncrypt(JSON.stringify(_values));
	const _key = await encrypt(values.key, rsa.server);
	values.key = _key;
	try {
		var res = await EmailApi.emailSave(values);
		if(res && res.data && res.data.success === true) {
			return {
				status: true,
				error: null,
			}
		}else if(res && res.data && res.data.success === false && res.data.error) {
			return {
				status: false,
				error: res.data.error,
			}
		}
	} catch (error) {
		return {
			status: false,
			error: 'Can\'t access server.',
		}
	}    
};


export const fileUpload = async (_values, callback) => {	
	try {
		var res = await EmailApi.uploadFile(_values);
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
