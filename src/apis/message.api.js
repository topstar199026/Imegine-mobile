import axios from 'axios';
import { encrypt, objectEncrypt, aesEncrypt } from 'src/modules/Security';
import { SOCKET_API_SERVER } from 'src/temp';

axios.defaults.timeout = 2000;


export const getGroupId = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'message/getGroupId', {values});
    return res;
}

export const getGroupIdList = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'message/getGroupIdList', {values});
    return res;
}

