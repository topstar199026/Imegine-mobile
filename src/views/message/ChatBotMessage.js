import React, { useEffect, useState } from 'react';
import {Image, Text, View, StyleSheet, StatusBar, FlatList} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {useSelector} from 'react-redux';

import {colors, fonts, images} from 'src/assets/themes';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import CTopMessageBar from 'src/components/bar/CTopMessageBar2';
import CBottomMessageBar from 'src/components/bar/CBottomMessageBar';
import CChatItem from 'src/components/messages/CChatItem';
import CSearch from 'src/components/messages/CSearch';
import CReadByModal from 'src/components/modal/CReadBy';
import CScheduleModal from 'src/components/modal/CScheduleModal';
import CBusyModal from 'src/components/modal/CBusyModal';
import CTopChatBotBar from 'src/components/bar/CTopChatBotBar';
import CBottomChatBotBar from 'src/components/bar/CBottomChatBotBar';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Bot_DATA } from 'src/datas/sample';
import CBottomChatBotActionBar from 'src/components/bar/CBottomChatBotActionBar';
import CDateTimePickerModal from 'src/components/modal/CDateTimePickerModal';
import CCreatedAppointmentModal from 'src/components/modal/CCreatedAppointmentModal';
import CTimeScrollPickerModal from 'src/components/modal/CTimeScrollPickerModal';
import MainLayout from 'src/layouts';

var styles = StyleSheet.create({
    
});



const ChatBotMessage = () => {

     // @ts-ignore
     const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
     // @ts-ignore
     const user = useSelector((state) => state.auth.user);

    const navigation = useNavigation();

    const [chats, setChats] = useState(Bot_DATA);
    const [activeType, setActiveType] = useState('all');
    const [dateTimePickerModalVisible, setDateTimePickerModalVisible] = useState(false);
    const [createdAppointmentModalVisible, setCreatedAppointmentModalVisible] = useState(false);
    const [timeScrollPickerModalVisible, setTimeScrollPickerModalVisible] = useState(false);
    
    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
        // setBusyModalVisible(true);
    }, [])

    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    const handleTypeActive = (s) => {
        setActiveType(s);
    }

    const onPress =(item) => {
    }    

    const onActionPress = (type) => {
        toggleDateTimePickerModal();
    }

    const toggleDateTimePickerModal = () => {
        setDateTimePickerModalVisible(!dateTimePickerModalVisible);
    }

    const toggleCreatedAppointmentModal = () => {
        setDateTimePickerModalVisible(false);
        setCreatedAppointmentModalVisible(!createdAppointmentModalVisible);
    }

    const toggleTimeScrollPickerModal = () => {
        setTimeScrollPickerModalVisible(!timeScrollPickerModalVisible);
    }

    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'chatBotMessage'}
            switchHome={(action) => switchHome(action)}
            backFlag={true}
            handleTypeActive={(s) => {}} 
            activeType={activeType}
            data={null}
            >        
            <View
                style={[{
                    height: '100%',
                    paddingTop: 70,
                    paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                    paddingLeft: 0,
                    paddingRight: 0,
                }]}>
                <View
                    style={{
                    }}
                    >
                    {
                        activeType === 'emails' ? 
                                null 
                                : 
                                activeType === 'messages' ? 
                                <CSearch style={{marginBottom: 10}} />
                                    :
                                    null
                    }
                    
                    
                    <FlatList
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
                    />
                </View>  
            </View>
            <CBottomChatBotActionBar active={'Messages'} onActionPress={(type) => onActionPress(type)}/>
            <CDateTimePickerModal 
                visible={dateTimePickerModalVisible}
                handleGoBack={() => {
                    navigation.goBack();
                }}
                handleTimePicker={() => toggleTimeScrollPickerModal()}
                handleModalClose={() => toggleDateTimePickerModal()}
                onCreateAppointment={() => toggleCreatedAppointmentModal()}
            />
            <CCreatedAppointmentModal
                visible={createdAppointmentModalVisible}
                handleModalClose={() => toggleCreatedAppointmentModal()}
            />
            <CTimeScrollPickerModal
                visible={timeScrollPickerModalVisible}
                handleModalClose={() => toggleTimeScrollPickerModal()}
            />
        </MainLayout>
    )
}

export default ChatBotMessage