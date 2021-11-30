import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

import { SOCKET_SERVER } from 'src/temp';
import { MessageActions, SystemActions } from 'src/actions';
import { initialRsaKey, aesDecrypt, aesEncrypt, decrypt, encrypt, objectEncrypt, aesRsaEncryption } from "src/modules/Security";
import { saveMessage, savePendingMessage, saveReadMeState, saveReadState } from 'src/models/MessageWorker';
import { savePendingRead } from 'src/models/ReadWorker';


import { saveHistory } from 'src/models/HistoryWorker';
import { updateChanel, updateChanelByPending } from 'src/models/ChanelWorker';
import moment from 'moment';

export const SocketContext = createContext({});

var socket = io(SOCKET_SERVER, {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 2000,
});

const SocketContextProvider = ({ children }) => {

    const dispatch = useDispatch();
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    // @ts-ignore
    const user = useSelector((state) => state.auth.user);
    // @ts-ignore
    const token = useSelector((state) => state.auth.token);
    // @ts-ignore
    const messageStateFlag = useSelector((state) => state.socket.messageStateFlag);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Message state
    const [newMessage, setNewMessage] = useState(null);
    const [messageHistory, setMessageHistory] = useState(null);
    const [typingStatus, setTypingStatus] = useState(null);
    const [messageReadState, setMessageReadState] = useState(null);

    // Planner state
    const [newPlanner, setNewPlanner] = useState(null);

    useEffect(() => {
        if(rsa === undefined || Object.keys(rsa).length === 0) {
            (async () => {
                const _temp = await initialRsaKey();
                dispatch(SystemActions.onSetRSA(_temp));
            })();
        }
        // return () => {
        //     // socketDisconnect();
        // }
    }, [rsa])

    useEffect(() => {
        if(user && user.userId) {
            (async () => {
                socketConnect();
            })();
        }
        // return () => {
        //     // socketDisconnect();
        // }
    }, [user])
    
    
    const socketConnect = async () => {
        console.log('start connect')

        socket.connect();
        
        socket.on('connect', () => {
            socket.emit("socket:info", {
                type: 'mobile',
                userId: user.userId,
                deviceId: user.deviceId,
            });                      
        });

        socket.on('reconnect', () => {
            socket.emit("socket:info", {
                type: 'mobile',
                userId: user.userId,
                deviceId: user.deviceId,
            });                      
        });        
    
        socket.on('disconnect', (reason) => {
            console.log('connection to server lost.', reason);            
        });

        socket.on('message:group:receive', async (message) => {
            let _key = message.key;
            _key = await decrypt(_key, rsa.private);
            let _data = message.data;
            _data = await aesDecrypt(_data, _key);
            _data = JSON.parse(_data);
            _data['date'] = message.date;
            _data['messageId'] = message.messageId;

            console.log('new group message ---- s-----', _data);
            saveMessage(_data);    
            updateChanel(rsa, _data, user);     
            setNewMessage(_data);

        });

        socket.on('message:read:request', async (message) => {
            // console.log('message:read:request', message)
            // let _key = message.key;
            // _key = await decrypt(_key, rsa.private);
            // let _data = message.data;
            // _data = await aesDecrypt(_data, _key);
            // _data = JSON.parse(_data);
            // _data['date'] = message.date;
            // console.log('message:read:request', _data)
            // if(user.id !== _data.sender.id) {                
            //     setMessageReadState(_data);
            //     saveReadState(_data, user);
            // }            
        });

        socket.on('message:read:state:request', async (message) => {
            // console.log('message:read:request', message)
            let _key = message.key;
            _key = await decrypt(_key, rsa.private);
            let _data = message.data;
            _data = await aesDecrypt(_data, _key);
            _data = JSON.parse(_data);
            _data['date'] = message.date;
            console.log('message:read:request', _data)
            if(user.id !== _data.sender.id) {                
                setMessageReadState(_data);
                saveReadState(_data, user);
            }            
        });
           
        socket.on('message:history', (message) => {
            setMessageHistory(message);
        });

        socket.on('message:pending:load', async (message) => {
            console.log('message:pending:load', message);
            const list = message.data2.messagePendingList;
            const readList = message.data2.readPendingList;
            var _temp = [];
            for(var i = 0; i < list.length; i++) {
                let message = list[i];        
                let _key = message.key;
                _key = await decrypt(_key, rsa.private);
                let _data = message.data;
                _data = await aesDecrypt(_data, _key);
                _data = JSON.parse(_data);
                _data['date'] = message.date;
                _data['messageId'] = message.messageId;
                
                _temp.push(_data);
            }

            var _key2 = readList.key;
            _key2 = await decrypt(_key2, rsa.private);
            let _data2 = readList.data;
            _data2 = await aesDecrypt(_data2, _key2);
            _data2 = JSON.parse(_data2);
            console.log('pending message data', _temp, _data2);
              
            savePendingMessage(_temp, _data2);
            await updateChanelByPending(rsa, _temp, user, res => {
                dispatch(MessageActions.onSetMessageStateFlag(messageStateFlag !== null ? !messageStateFlag : true));
            });
            savePendingRead(_data2);
        });

        socket.on('message:typing:start', (message) => {
            console.log('message:typing', message);
            setTypingStatus(message);
        });

        socket.on('planner:send', (message) => {
            console.log('new planner received');
            setNewPlanner(moment().format());
        });
        
    }

    const socketDisconnect = async () => {
        console.log('connection to server remove.');
        socket.disconnect();
    }   

    const loadRequestMessage = async (user, contactInfo) => {

        const data = {
            sender: {
                id: user.id,
                userId: user.userId,
            },
            receiver: {
                id: contactInfo.contactUserId,
                contactId: contactInfo.contactId
            },

        }
        socket.emit("message:load:request", data);
    }

    const emptyMessageHistory = async () => {
        setMessageHistory(null);
    }

    const emptyNewMessage = async () => {
        setNewMessage(null);
    }

    const sendMessage = async (message, contactInfo) => {
        console.log('sender user', user)
        const data = {
            groupId: 0,
            sender: {
                id: user.id,
                userId: user.userId,
                deviceId: user.deviceId,
                nickName: user.nickName,
                avatar: user.avatar,
            },
            receiver: {
                id: contactInfo.contactUserId,
                contactId: contactInfo.contactId
            },
            senderType: 'mobile',
            messageType: 0,
            message:  message

        }
        var values = await aesEncrypt(JSON.stringify(data));
        const _key = await encrypt(values.key, rsa.server);
        values.key = _key;
        socket.emit("message:send", values);
    }

    const sendMessageToGroup = async (message, groupInfo) => {
        console.log('--- *** **** sender groupInfo', groupInfo)
        const data = {
            sender: {
                id: user.id,
                userId: user.userId,
                deviceId: user.deviceId,
                nickName: user.nickName,
                avatar: user.avatar,
            },
            group: {
                id: groupInfo.id,
            },
            senderType: 'mobile',
            messageType: 0,
            message:  message
        }
        var values = await aesRsaEncryption(data, rsa);
        socket.emit("message:group:send", values);
    }

    const sendReadByRequest = async (message, groupInfo) => {
        const data = {
            sender: {
                id: user.id,
                userId: user.userId,
            },
            group: {
                id: groupInfo.id,
            },

            senderType: 'mobile',
            messageType: 101,
            // messageId:  message.messageId
            messageList:  [{
                messageId: message.messageId,
                messageType: message.messageType,
            }],
        }
        await saveReadMeState([{
            messageId: message.messageId,
            messageType: message.messageType,
        }])
        
        console.log('newMessage--read-', data)
        var values = await aesEncrypt(JSON.stringify(data));
        const _key = await encrypt(values.key, rsa.server);
        values.key = _key;
        // socket.emit('message:read:request', values);
        socket.emit('message:read:state:request', values);

    }

    const sendReadStateRequest = async (messageList, groupInfo) => {
        console.log('read action request')
        const data = {
            sender: {
                id: user.id,
                userId: user.userId,
            },
            group: {
                id: groupInfo.id,
            },

            senderType: 'mobile',
            messageType: 101,
            messageList:  messageList,
        }
        await saveReadMeState(messageList)
        var values = await aesEncrypt(JSON.stringify(data));
        const _key = await encrypt(values.key, rsa.server);
        values.key = _key;
        socket.emit('message:read:state:request', values);
    }


    const sendTypingStatus = async (user, groupInfo, status) => {
        const data = {
            sender: {
                id: user.id,
                userId: user.userId,
            },
            group: {
                id: groupInfo.id,
            },
            status: status,
        }
        socket.emit("message:typing:start", data);
    }

    const messageReadStateSend = async (newMessage, user, contactInfo) => {
        const data = {
            sender: {
                id: user.id,
                userId: user.userId,
            },
            receiver: {
                id: contactInfo.contactUserId,
                contactId: contactInfo.contactId
            },
            message: {
                id: newMessage.id,
            },

        }
        socket.emit("message:read_at:request", data);
    }

    return (
        <SocketContext.Provider
            value={{
                newMessage,
                messageHistory,
                typingStatus,
                messageReadState,
                socketConnect,
                sendMessage,
                sendMessageToGroup,
                sendReadByRequest,
                sendReadStateRequest,
                loadRequestMessage,
                emptyMessageHistory,
                sendTypingStatus,
                emptyNewMessage,
                messageReadStateSend,

                newPlanner,
            }}
        >
        {children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;
