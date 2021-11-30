import React, { useEffect, useState } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, TextInput} from "react-native" ;
import {useSelector} from 'react-redux';
import * as yup from 'yup';

import { useNavigation } from '@react-navigation/native';

import {colors, fonts} from 'src/assets/themes';

import MainLayout from 'src/layouts';
import { _centerV, _flexCol, _style } from 'src/modules/Style';
import CPlannerDatePicker from 'src/components/planner/CPlannerDatePicker';
import CSetOutOffice from 'src/components/planner/CSetOutOffice';
import CReminder from 'src/components/planner/CReminder';
import CRepeat from 'src/components/planner/CRepeat';
import CAttach from 'src/components/planner/CAttach';
import CNote from 'src/components/planner/CNote';
import CDateTimePickerModal from 'src/components/modal/CDateTimePickerModal';
import CTimeScrollPickerModal from 'src/components/modal/CTimeScrollPickerModal';
import moment from 'moment';
import CLocation from 'src/components/planner/CLocation';
import { PlannerActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';

let validationSchema = yup.object().shape({
    title: 
        yup.string().required('Please enter correct value'),
    startDate: 
        yup.date().required('Please enter correct value'),
});

var styles = StyleSheet.create({
});

const NewPlanner = () => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);


    const navigation = useNavigation();

    const [eventTitle, setEventTitle] = useState('');
    const [dateTimePickerModalVisible, setDateTimePickerModalVisible] = useState(false);
    const [timeScrollPickerModalVisible, setTimeScrollPickerModalVisible] = useState(false);
    const [createdAppointmentModalVisible, setCreatedAppointmentModalVisible] = useState(false);

    const [tempTime, setTempTime] = useState(null);
    const [tempDate, setTempDate] = useState(null);
    const [tempType, setTempType] = useState(null);

    const [startDate, setStartDate] = useState(null);
    const [finishDate, setFinishDate] = useState(null);
    const [officeFlag, setOfficeFlag] = useState(true);

    const [startTime, setStartTime] = useState(null);
    const [reminderDate, setReminderDate] = useState(null);
    const [repeatType, setRepeatType] = useState(null);
    const [note, setNote] = useState(null);

    
    const [validate, setValidate] = useState(false);


    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    const handleTypeActive =(s) => {
        saveEvent();
    }

    const saveEvent = () => {
        let _r = reminderDate ? Object.keys(reminderDate)[0] : null;
        var data = {
            title: eventTitle,
            startDate: startDate,
            endDate: finishDate,
            officeFlag: officeFlag,
            reminderDate: _r,
            repeatType: repeatType,
            note: note,
        }

        validationSchema.validate(data)
        .then(res => {
            setValidate(false);
            setTimeout(() => {                     
                PlannerActions.plannerSave(rsa, data, res => {
                    if(res && res.status === true) {
                        setTimeout(() => {
                            navigation.goBack();
                        }, 1000);
                    }else if(res && res.status === false && res.error) {
                        Utils.toast(1, res.error);
                    }
                });
            }, 200);
        }).catch(err => {
            console.log('err', err)
            setValidate(true);
            Utils.toast(1, 'Input correct data.');
        });
    }

    const onPress =(item) => {
        navigation.navigate('SendMessage');
    } 
    
    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    const onSelectDate = (type) => {
        setTempType(type);
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

    const onSetData = (date) => {
        setTempDate(date);
        let _d = Object.keys(date)[0];
        let _t = moment(tempTime).format('HH:mm').toString();
        if(tempType === 'start') {
            setStartDate(_d + ' ' + _t);
            setStartTime(_t);
        }else{
            setFinishDate(_d + ' ' + _t);
        }
    }

    const onSetReminderDate = (date) => {
        setReminderDate(date);
    }

    const onRepeatType = (type) => {
        setRepeatType(type);
    }

    const onNote = (data) => {
        setNote(data);
    }

    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'newEvent'}
            handleTypeActive={(s) => handleTypeActive(s)} 
            active={'Planner'}
            backFlag={true}
            switchHome={(action) => switchHome(action)}>        
            <View
                style={_style([
                    {
                        height: '100%',
                        paddingTop: 70,
                        paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                        paddingLeft: 0,
                        paddingRight: 0,
                    },
                ])}>    
                <ScrollView
                    style={_style([
                        {
                            width: '100%',
                            paddingRight: 5,
                            flex: 1,
                        },
                    ])}>
                     <View
                        style={_style([
                            {
                                width: '100%',
                            },
                            _flexCol,
                        ])}>
                        <View
                            style={_style([
                                {
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }
                            ])}>
                            <TextInput
                                placeholder={'Title'}
                                placeholderTextColor={'rgba(50, 84, 131, 0.8)'}
                                secureTextEntry={false}
                                style={{
                                    fontFamily: fonts.$rubikMedium,
                                    fontSize: 27,
                                    color: colors.$secondaryBlue
                                }}
                                onChangeText={t => setEventTitle(t)}
                                value={eventTitle}
                                underlineColorAndroid={colors.$transparent}
                            />
                        </View>
                        <View
                            style={_style([
                                {
                                    marginTop: 10,
                                }
                            ])}>
                            <CPlannerDatePicker text={'Start date'} data={startDate} onPress={() => onSelectDate('start')} />
                        </View>
                        <View
                            style={_style([
                                {
                                    
                                }
                            ])}>
                            <CPlannerDatePicker text={'Finish date'} data={finishDate} onPress={() => onSelectDate('finish')} />
                        </View>
                        <View
                            style={_style([
                                {                                    
                                }
                            ])}>
                            <CSetOutOffice onChange={(flag) => setOfficeFlag(flag)}/>
                        </View>
                        <View
                            style={_style([
                                {                                    
                                }
                            ])}>
                            <CReminder startTime={startTime} setReminderDate={(date) => onSetReminderDate(date)} />
                        </View>
                        <View
                            style={_style([
                                {                                    
                                }
                            ])}>
                            <CRepeat setRepeatType={(type) => onRepeatType(type)} />
                        </View>
                        <View
                            style={_style([
                                {                                    
                                }
                            ])}>
                            <CAttach />
                        </View>
                        <View
                            style={_style([
                                {                                    
                                }
                            ])}>
                            <CLocation />
                        </View>
                        <View
                            style={_style([
                                {                                    
                                }
                            ])}>
                            <CNote setNote={(data) => onNote(data)} />
                        </View>
                    </View>
                    <CDateTimePickerModal 
                        title={'Set'}
                        date={null}
                        time={tempTime}
                        visible={dateTimePickerModalVisible}
                        handleGoBack={() => {
                            navigation.goBack();
                        }}
                        handleTimePicker={() => toggleTimeScrollPickerModal()}
                        handleModalClose={() => toggleDateTimePickerModal()}
                        setData={(date) => onSetData(date)}
                        onCreateAppointment={() => toggleCreatedAppointmentModal()}
                    />
                    <CTimeScrollPickerModal
                        visible={timeScrollPickerModalVisible}
                        onSetTime={(time) => setTempTime(time)}
                        handleModalClose={() => toggleTimeScrollPickerModal()}
                    />
                </ScrollView>
            </View>      
        </MainLayout>
    )
}

export default NewPlanner