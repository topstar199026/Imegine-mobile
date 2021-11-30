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
import CInvoiceDatePicker from 'src/components/wallet/CInvoiceDatePicker';
import CInvoiceUser from 'src/components/wallet/CInvoiceUser';
import CInvoiceCategory from 'src/components/wallet/CInvoiceCategory';
import CInvoiceAttach from 'src/components/wallet/CInvoiceAttach';
import CInvoiceNote from 'src/components/wallet/CInvoiceNote';

let validationSchema = yup.object().shape({
});

var styles = StyleSheet.create({
});

const WalletNewInvoice = () => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    // @ts-ignore
    const invoiceCategory = useSelector((state) => state.wallet.invoiceCategory);
    // @ts-ignore
    const invoiceUser = useSelector((state) => state.wallet.invoiceUser);

    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [dateTimePickerModalVisible, setDateTimePickerModalVisible] = useState(false);
    const [timeScrollPickerModalVisible, setTimeScrollPickerModalVisible] = useState(false);
    const [createdAppointmentModalVisible, setCreatedAppointmentModalVisible] = useState(false);

    const [tempTime, setTempTime] = useState(null);
    const [tempDate, setTempDate] = useState(null);
    const [tempType, setTempType] = useState(null);

    const [createDate, setCreateDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [officeFlag, setOfficeFlag] = useState(true);

    const [startTime, setStartTime] = useState(null);
    const [reminderDate, setReminderDate] = useState(null);
    const [repeatType, setRepeatType] = useState(null);
    const [note, setNote] = useState(null);
    const [category, setCategory] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    
    const [validate, setValidate] = useState(false);


    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    useEffect(() => {
        setCategory(invoiceCategory);
    }, [invoiceCategory])

    useEffect(() => {
        setSelectedUser(invoiceUser);

        console.log(invoiceUser)
    }, [invoiceUser])

    const handleTypeActive =(s) => {
        saveEvent();
    }

    const saveEvent = () => {
        let _r = Object.keys(reminderDate)[0];
        var data = {
            title: title,
            createDate: createDate,
            dueDate: dueDate,
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
            setValidate(true);
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
            setCreateDate(_d + ' ' + _t);
            setStartTime(_t);
        }else{
            setDueDate(_d + ' ' + _t);
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
            topBarId={'newInvoice'}
            handleTypeActive={(s) => handleTypeActive(s)} 
            active={''}
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
                                onChangeText={t => setTitle(t)}
                                value={title}
                                underlineColorAndroid={colors.$transparent}
                            />
                        </View>
                        <View
                            style={_style([
                                {                                    
                                }
                            ])}>
                            <CInvoiceUser />
                        </View>
                        <View
                            style={_style([
                                {
                                }
                            ])}>
                            <CInvoiceDatePicker text={'Creation date'} data={createDate} onPress={() => onSelectDate('start')} />
                        </View>
                        <View
                            style={_style([
                                {
                                    
                                }
                            ])}>
                            <CInvoiceDatePicker text={'Due date'} data={dueDate} onPress={() => onSelectDate('finish')} />
                        </View>
                        <View
                            style={_style([
                                {                                    
                                }
                            ])}>
                            <CInvoiceCategory category={category} />
                        </View>                        
                        <View
                            style={_style([
                                {                                    
                                }
                            ])}>
                            <CInvoiceAttach />
                        </View>
                        <View
                            style={_style([
                                {                                    
                                }
                            ])}>
                            <CInvoiceNote setNote={(data) => onNote(data)} />
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

export default WalletNewInvoice