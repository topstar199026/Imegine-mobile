import React, { useEffect, useState } from 'react';
import {Image, Text, View, StyleSheet, StatusBar, FlatList} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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

var styles = StyleSheet.create({
    
});



const ChatBotMessage = () => {

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
        <SafeAreaView>
            <StatusBar />
            <View
                style={{
                    alignItems: 'center'  ,
                    height: '100%',
                    paddingTop: 88,
                    paddingBottom: 245, //88,
                }}
                >
                <CTopChatBotBar active={'all'} handleTypeActive={(s) => handleTypeActive(s)} activeType={activeType} navigation={navigation} />
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
                <CBottomChatBotActionBar active={'Messages'} onActionPress={(type) => onActionPress(type)}/>
            </View>
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
            
        </SafeAreaView>
    )
}

export default ChatBotMessage