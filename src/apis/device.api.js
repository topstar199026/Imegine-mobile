import axios from 'axios';
import { encrypt, objectEncrypt, aesEncrypt } from 'src/modules/Security';
import { SOCKET_API_SERVER } from 'src/temp';

axios.defaults.timeout = 2000;


export const deviceLink = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'device/linkDevice', {values});
    return res;
}

export const deviceUnlink = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'device/unlinkDevice', {values});
    return res;
}

export const deviceStatus = async () => {
    const res = await axios.post(SOCKET_API_SERVER + 'device/getDeviceStatus');
    return res;
}
