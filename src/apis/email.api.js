import axios from 'axios';
import { SOCKET_API_SERVER } from 'src/temp';

axios.defaults.timeout = 2000;

export const emailSave = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'email/saveEmail', {values});
    return res;
}

export const uploadFile = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'email/uploadFile', values,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return res;
}