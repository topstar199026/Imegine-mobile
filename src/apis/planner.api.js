import axios from 'axios';
import { encrypt, objectEncrypt, aesEncrypt } from 'src/modules/Security';
import { SOCKET_API_SERVER } from 'src/temp';

axios.defaults.timeout = 2000;

export const plannerSave = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'planner/savePlanner', {values});
    return res;
}

export const plannerGet = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'planner/getPlanner', {values});
    return res;
}
