import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {View, StatusBar, Keyboard, VirtualizedList, RefreshControl} from "react-native" ;
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {colors} from 'src/assets/themes';
import { useNavigation } from '@react-navigation/native';

import CBottomMessageBar from 'src/components/bar/CBottomMessageBar';
import CChatItem from 'src/components/messages/CChatItem';
import CSearch from 'src/components/messages/CSearch';
import MainLayout from 'src/layouts';

import {SocketContext} from 'src/contexts/SocketContext';
import CNewMail from 'src/components/messages/CNewMail';
import { loadMessage } from 'src/models/MessageWorker';
import { ContactActions, MessageActions } from 'src/actions';
import CReadByModal from 'src/components/modal/CReadBy';
import CScheduleModal from 'src/components/modal/CScheduleModal';
import CBusyModal from 'src/components/modal/CBusyModal';
import { _style } from 'src/modules/Style';
import CBottomEraseBar from 'src/components/bar/CBottomEraseBar';
import { deleteMessageByIdArr } from 'src/actions/message';
import * as Utils from 'src/modules/Toast';

// https://forums.expo.dev/t/react-native-flatlist-render-error-virtualizedlist/49968
// https://stackoverflow.com/questions/44743904/virtualizedlist-you-have-a-large-list-that-is-slow-to-update

const DATA_Email = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        type: '15'
    }
];

const SendMessage = (props) => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const user = useSelector((state) => state.auth.user);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    // @ts-ignore
    const messageStateFlag = useSelector((state) => state.socket.messageStateFlag);

    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    const flatListRef = useRef();
    const {
        // @ts-ignore
        newMessage, 
        // @ts-ignore
        messageHistory, emptyMessageHistory, 
        // @ts-ignore
        typingStatus, messageReadState, sendTypingStatus,
        // @ts-ignore
        emptyNewMessage, sendReadByRequest, sendReadStateRequest, sendMessage, sendMessageToGroup,
    } = socket;
    
    const navigation = useNavigation();

    const _group = props.route.params.item ? JSON.parse(props.route.params.item) : null;
    const contactInfo = props.route.params ? JSON.parse(props.route.params.contactInfo) : null;
    const _groupId = props.route.params.groupId ? props.route.params.groupId : null;

    const [showKeyBoard, setShowKeyBoard] = useState(false);
    const [activeType, setActiveType] = useState('all');
   
    const [searchString, setSearchString] = useState(null);

    const [readByModalVisible, setReadByModalVisible] = useState(false);
    const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
    const [busyModalVisible, setBusyModalVisible] = useState(false);
    const [refreshing] = useState(false);
    
    const [chats, setChats] = useState([]);
    const [myTypingStatus, setMyTypingStatus] = useState(false);
    const [groupInfo, setGroupInfo] = useState(null);

    const [groupContactInfo, setGroupContactInfo] = useState([]);
    const [groupContactMap, setGroupContactMap] = useState(new Map());

    const [selectState, setSelectState] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState(new Map());

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setShowKeyBoard(true)
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setShowKeyBoard(false)
        });

        handleGetGroupId();
        
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };       
        
    }, []);

    useEffect(() => {
        console.log('selectState-------------', selectState);
        setSelectedMessages(new Map());
    }, [selectState])

    useEffect(() => {        
        showKeyBoard && setTimeout(() => {
            // @ts-ignore
            chats.length > 0 && flatListRef && flatListRef.current && flatListRef.current.scrollToEnd({animated: true})
        }, 10);
    }, [showKeyBoard]);

    useEffect(() => {        
        setTimeout(() => {
            // @ts-ignore
            chats.length > 0 && flatListRef && flatListRef.current && flatListRef.current.scrollToEnd({animated: true})
        }, 1000);
    }, [chats]);

    useEffect(() => {
        if(messageReadState && Object.keys(messageReadState).length > 0 && groupInfo) {
            
            if(messageReadState.group.id === groupInfo.id) {
                handleReadState(messageReadState);
            }
        }
    }, [messageReadState])
    

    useEffect(() => {
        handleTypingStatus(typingStatus);
    }, [typingStatus])

    useEffect(() => {
        groupInfo && groupInfo.id && sendTypingStatus(user, groupInfo, myTypingStatus);
    }, [myTypingStatus])

    useEffect(() => {

    }, [messageHistory]);

    useEffect(() => {
        (async () => {
            // if(newMessage && Object.keys(newMessage).length > 0 && activeType !== 'emails') { 
            if(newMessage && Object.keys(newMessage).length > 0) { 
                if(groupInfo && groupInfo.id === newMessage.group.id) {
                    var _newMessage = newMessage;

                    newMessage.sender.id !== user.id && 
                    sendReadByRequest(_newMessage, groupInfo);

                    await makeReceiveItem(_newMessage);
                }
            }
        })();
    }, [newMessage]);  
    
    useEffect(() => {
        if(activeType === 'emails') {
            groupInfo && groupInfo.id && handMessageHistoryLoad();
        }else{
            groupInfo && groupInfo.id && handMessageHistoryLoad();
        }
    }, [activeType, groupInfo])
    
    useEffect(() => {
        if(groupInfo && groupInfo.id) {
            (async()=>{
                const groupContactInfo = await ContactActions.getGroupContactInfo(rsa, groupInfo.id);
                if(groupContactInfo && groupContactInfo.status === true) {
                    const _temp = new Map();
                    const arr = groupContactInfo.data;
                    for(var i=0; i<arr.length; i++) {
                        var _item = arr[i];
                        _temp.set(_item.userId, _item)
                    }
                    setGroupContactMap(_temp);
                    setGroupContactInfo(groupContactInfo.data);
                } else {
                    setGroupContactInfo([]);
                    setGroupContactMap(new Map());
                }
            })();
        };        
    }, [groupInfo])
    
    const handleGetGroupId = async () => {
        if(_groupId) {
            const groupId = await MessageActions.getGroupById3(_groupId);
            groupId && groupId.status === true && setGroupInfo(groupId.data);
        }else{
            const groupId = await MessageActions.getGroupId(rsa, user, contactInfo);
            groupId && groupId.status === true && setGroupInfo(groupId.data);
        }
    }

    const handleTypeActive = (s) => {
        setActiveType(s);
    }

    const onPress =(item) => {
        if(item.item.type === '5'){
            toggleScheduleModal();
        }else if(item.item.type === '7'){
            navigation.navigate('ChatEmailDetail');
        }else{
            toggleReadByModal();
        }
        // navigation.navigate('CreatePassword');
    }    

    const toggleReadByModal = () => {
        setReadByModalVisible(!readByModalVisible);
    }

    const toggleScheduleModal = () => {
        setScheduleModalVisible(!scheduleModalVisible);
    }

    const toggleBusyModal = () => {
        setBusyModalVisible(!busyModalVisible);
    }

    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    //--- Chat Actions ---//
    const handMessageHistoryLoad = async () => {
        if(groupInfo && groupInfo.id) {
            const messageHistory = await loadMessage({
                query: '',
                activeType: activeType,
                groupId: groupInfo.id,
            });

            await dispatch(MessageActions.onSetMessageStateFlag(messageStateFlag !== null ? !messageStateFlag : true));
            initialChatHistory(messageHistory);
        }
        
    }

    const handleSend = (message) => {   
        groupInfo && sendMessageToGroup(message, groupInfo);
    }

    const handleTyping = (_state) => {        
        setMyTypingStatus(_state);
    }

    const handleReadState = (messageReadState) => {
        console.log('read state got -----------------------------------------', messageReadState)
        const _temp = [...chats];
        for(var i=0; i<chats.length; i++) {
            var _t = _temp[i];

            for(var j=0; j<messageReadState.messageList.length; j++) {
                console.log('------------------', _t, messageReadState.messageList[j])
                if(_t.messageId && _t.messageId === messageReadState.messageList[j].messageId) {
                    _t.readBy = true;
                    break;
                }
            }
        }
        setChats(_temp);
    }

    const handleChange = (t) => {
        setSearchString(t);
    }

    const handleNewMail = () => {
        navigation.navigate('NewRMail', {
            groupInfo: JSON.stringify(groupInfo),
            contactInfo: JSON.stringify(contactInfo),
        });
    }

    const handleTypingStatus = (typingStatus) => {
        if(typingStatus && groupInfo && typingStatus.group.id === groupInfo.id && typingStatus.sender.id !== user.id) {
            var _temp = [...chats];
            if(typingStatus && typingStatus.status) {
                let _item = {
                    id: _temp.length,
                    type: '20',
                    sender: typingStatus.sender,
                }
                _temp.push(_item);
                setChats(_temp);
            }else{
                if(_temp.length > 0) {                
                    let _item = _temp[_temp.length - 1];
                    if(_item.type === '20') {
                        _temp.splice(_temp.length - 1, 1);
                    }
                    setChats(_temp);
                }
            }
        }
    }

    const getMessageType = (item, user) => {
        if(activeType === 'emails') {
            return '11';
        } else
            if(item.messageType.toString() === '0') {
                if(item.sender.id === user.id) {
                    return '1';
                }else{
                    return '2';
                }
            } else if(item.messageType.toString() === '5') {
                if(item.sender.id === user.id) {
                    return '7';
                }else{
                    return '8';
                }
            }
    }
    
    const makeHistoryItem = (index, item, user) => {
        return {
            id: index,
            messageId: item.id,
            sender: item.sender,
            name: 'Steve Williams',
            title: 'App Patent Registration',
            message: item.message,
            type: getMessageType(item, user),
            messageType: item.messageType,
            mailTo: item.mailTo,
            subject: item.subject,
            date: item.createdAt,
            readBy: item.readBy,
            readAt: item.readAt,
        };
    }

    const makeReadItem =  (item, user) => {
        if(item.messageType.toString() === '0') {
            if(item.sender.id !== user.id && item.readBy === false) {
                return {
                    messageId: item.id,
                    messageType: item.messageType,
                }
            }
        }

        return null;
    }

    const makeReceiveItem = async (newMessage) => {
        const messageType = getMessageType(newMessage, user);
        var _temp = [...chats];
        var _item =  {
            id: _temp.length,
            messageId: newMessage.messageId,
            sender: newMessage.sender,
            name: 'Steve Williams',
            title: 'App Patent Registration',
            message: newMessage.message,
            type: messageType,
            mailTo: newMessage.mailTo,
            subject: newMessage.subject,
            date: newMessage.date,
            readBy: newMessage.readBy || false,
            readAt: newMessage.date,
        };

        if(typingStatus && typingStatus['status'] === true) {
			_temp.splice(_temp.length - 1, 0, _item)
		}else{
			_temp.push(_item);
		}
        setChats(_temp);
        if(messageType === '2') {
            sendReadByRequest(_item, groupInfo);
        }
    }

    const initialChatHistory = (messageHistory) => {
        var _temp = [];
        var _readTemp = [];
        var me = user;
        var history = messageHistory;

        var readFlag = false;
        for(var i = 0; i < history.length; i++) {
            var _item = makeHistoryItem(i, history[i], me);
            _temp.push(_item);

            var _rItem = makeReadItem(history[i], user);
            _rItem && _readTemp.push(_rItem);

            if(i === history.length - 1) {
                // sendReadByRequest(_item, groupInfo);
                readFlag = true;
            }
            
        }

        console.log('_--------------------------', _readTemp, readFlag)
        if(activeType === 'emails') {
            if(_temp.length > 0) {
                setChats(_temp);
            }else {
                setChats(DATA_Email);
            }
        } else
            setChats(_temp);


        if(readFlag === true && _readTemp.length > 0) {
            sendReadStateRequest(_readTemp, groupInfo);
        }
    };

    const RenderItem_ = useMemo((item) => 
        <CChatItem data={item} onPress={() => {onPress(item)}}
            styles={{
                height: hp(100) - 176 - StatusBar.currentHeight
            }}
        />
    , [chats]);

    const handleSelectMessage = (data) => {
        var mId = data.messageId;
        const _temp = selectedMessages;
        if(_temp.has(mId)) {
            _temp.delete(mId)
        }else{
            _temp.set(mId, data)
        }
        console.log(_temp)
        setSelectedMessages(new Map(_temp));
    }

    const handleMessageDelete = async() => {
        var mIdArr = Array.from(selectedMessages.keys());
        console.log(mIdArr);
        if(mIdArr.length > 0) {
            await deleteMessageByIdArr(mIdArr);
            setTimeout(() => {
                setSelectState(false);
                Utils.toast(1, 'Delete Successfully.');
                setTimeout(() => {
                    handMessageHistoryLoad();
                }, 1000);
            }, 1000);
        }else{
            Utils.toast(1, 'No selected message');
        }
        
    }

    return (
        <MainLayout 
            controlBarPosition={controlBarPosition}
            topBarId={'messageSend'}
            switchHome={(action) => switchHome(action)}
            backFlag={true}
            bottomFlag={
                true
            }
            handleTypeActive={(s) => handleTypeActive(s)} 
            activeType={activeType}
            data={{
                contactInfo: contactInfo,
                groupInfo: _group,
            }}>        
            <View
                style={_style([
                    {
                        height: '100%',
                        paddingTop: 88,
                        paddingBottom: activeType === 'emails' ? 10 : 88,
                        paddingLeft: 10,
                        paddingRight: 10,
                    }
                ])}>
                {
                    activeType === 'emails' ? 
                        <CSearch 
                            placeholder={'Search Emails'}
                            style={{marginBottom: 10}} 
                            handleChange={(t) => handleChange(t)}
                            value={searchString}
                        /> 
                        : 
                        activeType === 'messages' ? 
                            null
                            :
                            null
                }
                <VirtualizedList
                    ref={flatListRef}
                    data={chats}
                    initialNumToRender={15}
                    removeClippedSubviews
                    renderItem={item => 
                        <CChatItem 
                            groupContactMap={groupContactMap}
                            data={item} 
                            selectState={selectState}
                            onPress={() => {onPress(item)}}
                            onLongPress={() =>{
                                setSelectState(!selectState);
                            }}
                            handleSelectMessage={(data) => handleSelectMessage(data)}
                            styles={{
                                height: hp(100) - 176 - StatusBar.currentHeight
                            }}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    getItemCount={(chats) => chats.length}
                    getItem={(item, index) => {
                        return chats[index];
                    }}
                    onEndReached={() => {
                        console.log('--------')
                    }}
                    refreshControl={
                        <RefreshControl
                            // colors={[colors.primary]}
                            // tintColor={colors.primary}
                            refreshing={refreshing}
                            onRefresh={() => {}}
                        />
                    }
                />
                
            </View>
            {
                activeType !== 'emails' ?
                !selectState && <CBottomMessageBar 
                    active={'Messages'} 
                    handleTyping={(s) => handleTyping(s)} 
                    handleSend={(message) =>  handleSend(message)}
                    controlBarPosition={controlBarPosition}
                />      
                :                
                !selectState && <CNewMail onPress={() => handleNewMail()} />
            }
            {
                selectState && <CBottomEraseBar handleMessageDelete={() => handleMessageDelete()} />
            }
            <CReadByModal 
                visible={readByModalVisible}
                handleModalClose={() => toggleReadByModal()}
            />
            <CScheduleModal 
                visible={scheduleModalVisible}
                handleModalClose={() => toggleScheduleModal()}
            />
            <CBusyModal 
                visible={busyModalVisible}
                handleGoBack={() => {
                    navigation.goBack();
                }}
                handleModalClose={() => toggleBusyModal()}
            />
        </MainLayout>
    )
}

export default SendMessage



/*  ----   temp code ----*/
{/* <VirtualizedList
    data={chats}
    initialNumToRender={4}
    renderItem={item => 
        <CChatItem data={item} onPress={() => {onPress(item)}}
            styles={{
                height: hp(100) - 176 - StatusBar.currentHeight
            }}
        />
    }
    keyExtractor={(item, index) => index.toString()}   
    getItemCount={getItemCount}
    getItem={getItem}
/> */}
{/* <FlatList
    ref={flatListRef}
    onScrollToIndexFailed={()=>{}}
    data={
        chats
    }
    renderItem={item => 
        <CChatItem data={item} onPress={() => {onPress(item)}}
            styles={{
                height: hp(100) - 176 - StatusBar.currentHeight
            }}
        />
    }
    keyExtractor={item => item.id}                        
/> */}