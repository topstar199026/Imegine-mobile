import axios from 'axios';
import { encrypt, objectEncrypt, aesEncrypt } from 'src/modules/Security';
import { SOCKET_API_SERVER } from 'src/temp';

axios.defaults.timeout = 2000;


export const getContactList = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'user/getContactList', {values});
    return res;
}

export const getContactList2 = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'user/getContactList2', {values});
    return res;
}

export const getContactList3 = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'user/getContactList3', {values});
    return res;
}

export const getContactList4 = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'user/getContactList4', {values});
    return res;
}

export const contactSave = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'user/saveContact', {values});
    return res;
}

export const groupSave = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'user/saveGroup', {values});
    return res;
}

export const getContactInfo = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'user/getContactInfo', {values});
    return res;
}

export const getGroupContactInfo = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'user/getGroupContactInfo', {values});
    return res;
}
