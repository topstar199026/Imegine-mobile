import React, { useContext, useEffect, useState } from 'react';
import {StatusBar, View, FlatList} from 'react-native' ;
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {colors} from 'src/assets/themes';
import MainLayout from 'src/layouts';
import CSearch from 'src/components/messages/CSearch';
import CChatHistory from 'src/components/messages/CChatHistory';
import {SocketContext} from 'src/contexts/SocketContext';
import { loadChanelList } from 'src/models/ChanelWorker';
import { _style } from 'src/modules/Style';
import { MessageActions, SystemActions } from 'src/actions';

const Message = () => {    
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const messageStateFlag = useSelector((state) => state.socket.messageStateFlag);
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    // @ts-ignore
    const {newMessage} = socket;
    const navigation = useNavigation();

    const [chats, setChats] = useState([]);
    const [messageList, setMessageList] = useState(null);
    const [actionState, setActionState] = useState(false);

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
   
        handMessageHistoryLoad();
    }, [])

    useEffect(() => {
        (async () => {
            newMessage  && Object.keys(newMessage).length > 0 && 
            setTimeout(() => {
                handMessageHistoryLoad();
            }, 200);

        })();
    }, [newMessage]); 

    useEffect(() => {
        if(messageStateFlag !== null){
            setTimeout(() => {
                handMessageHistoryLoad();
            }, 1000);
        }
    }, [messageStateFlag])

    useEffect(() => {
        messageList && makeMessageHistory();
    }, [messageList])
    
    const handleActionStatus = () => {
        setActionState(!actionState);
    }

    const makeMessageHistory = () => {
        const _messageList = [...messageList];
        _messageList.push({
            id: 'ae723bea-c1b1-46c2-aed5-3ad5febb28ba',
            message: 'Favorite',
            type: 'favorite',
        })
        setChats(_messageList);
    }

    const handMessageHistoryLoad = async () => {
        // setMessageList([])
        const messageHistory = await loadChanelList({
            query: '',
        });

        console.log('------------------33333333333---------------------------')
        setTimeout(() => {
            setMessageList(messageHistory);
        }, 500);
    }

    const onPress =(item, contactInfo) => {
        setActionState(false);
        navigation.navigate('SendMessage', {screen: 'SendMessage', params: {            
            groupId: item.item.id,
            item: JSON.stringify(item.item),
            contactInfo: JSON.stringify(contactInfo),
        }});
    } 
    
    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    const handleDeleteHistory = async (item) => {
        // dispatch(MessageActions.onSetMessageStateFlag(messageStateFlag !== null ? !messageStateFlag : true)); 
        console.log('delete history', item);
        await MessageActions.deleteHistory(item.item);

        setTimeout(() => {
            handMessageHistoryLoad();
        }, 500);
    }
    
    return (
        <MainLayout 
            controlBarPosition={controlBarPosition}
            topBarId={'message'}
            active={'Messages'}
            switchHome={(action) => switchHome(action)}>        
            <View
                style={_style([
                    {
                        height: '100%',
                        paddingTop: 70,
                        paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                        paddingLeft: 10,
                        paddingRight: 10,
                    },
                ])}>
                <CSearch style={_style([{marginBottom: 10}])} placeholder={'Search Chats'} />      
                <FlatList
                    data={chats}
                    renderItem={item => 
                        <CChatHistory 
                            handleActionStatus={handleActionStatus} actionState={actionState} 
                            item={item} onPress={(contactInfo) => {onPress(item, contactInfo)}}
                            handleDeleteHistory={() => handleDeleteHistory(item)}
                        />
                    }
                    keyExtractor={item => item.id.toString()}
                />
            </View>      
        </MainLayout>
    )
}

export default Message