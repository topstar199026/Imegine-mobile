import axios from 'axios';
import { encrypt, objectEncrypt, aesEncrypt } from 'src/modules/Security';
import { SOCKET_API_SERVER } from 'src/temp';

axios.defaults.timeout = 2000;


export const loginUser = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'user/loginUser', {values});
    return res;
}


export const registerUser = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'user/registerUser', {values});
    return res;
}


export const uploadImage = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'user/uploadImage', values,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return res;
}
