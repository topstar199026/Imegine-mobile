import { io } from 'socket.io-client';
import { SOCKET_SERVER } from 'src/temp';

let _socket;

export const createSocketIO = (userId) => {
    _socket = io(SOCKET_SERVER, {
        query: {
            userId: userId,
        },
    });

    console.log('start connect')
    _socket.connect();
    
    _socket.on('connect', () => {
        console.log('connected', _socket.id)
        const userId = '123';
    });

    _socket.on('disconnect', (reason) => {
        console.log('connection to server lost.', reason);
        // socket.connect();
    });
    
    _socket.on('newMessage', (message) => {
        console.log(message);
    });

    _socket.on('user:typing', (message) => {
        console.log('typing...');
    });

    _socket.on('message:receive', (message) => {
        console.log('typing...', message);
    });
};

export const sendMessage = (message, user, contactInfo) => {
    console.log(_socket)
    const data = {
        sender: {
            id: user.id,
            userId: user.userId,
        },
        receiver: {
            contactId: contactInfo.contactId
        },
        message:  message

    }
    _socket.emit("message:send", data);
}

