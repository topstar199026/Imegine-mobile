import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flexCol, _flexRow, _font, _style } from 'src/modules/Style';
import { style } from 'styled-system';
import CEventDatePickerModal from '../modal/CEventDatePickerModal';

var styles = StyleSheet.create({
    
});

const CReminder = (props) => {

    const [expanded, setExpanded] = useState(false)
    const [dateTimePickerModalVisible, setDateTimePickerModalVisible] = useState(false);
    const [tempDate, setTempDate] = useState(null);

    const [date, setDate] = useState(null)

    useEffect(() => {
        
    }, [date])

    const toggleDateTimePickerModal = () => {
        setDateTimePickerModalVisible(!dateTimePickerModalVisible);
    }

    const onSetData = (date) => {
        setTempDate(date);
        let _d = Object.keys(date)[0];
        console.log(_d);
        setDate(_d);
        date && props.setReminderDate && props.setReminderDate(date);
    }
    

    return (
        <View
            style={_style([
                {
                    paddingTop: 15,
                    backgroundColor: expanded ? colors.$secondaryBlue : null,
                },
                _flexCol,
            ])}>
            <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => {
                    props.startTime && setExpanded(!expanded);
                }}>
                <View
                    style={_style([
                        {
                            width: '100%',
                            height: 50,
                            borderColor: 'rgb(112, 112, 112)',
                            borderBottomWidth: 1,
                            paddingBottom: 15,
                            paddingLeft: 10,
                            paddingRight: 10,
                        },
                        _flexRow,
                        _center,
                    ])}>
                    <View
                        style={_style([
                            {

                            },
                        ])}>
                        <Image source={expanded ? images.plannerPage.reminderWhite : images.plannerPage.reminderBlue} />
                    </View>
                    <View
                        style={_style([
                            {
                                flex: 1,
                            },
                        ])}>
                        <Text
                            style={_style([{
                                    marginTop: 2,
                                    paddingLeft: 10,
                                },
                                _font(fonts.$rubikRegular, expanded ? colors.$white : colors.$secondaryBlue, 17)
                            ])}>
                            {'Remind me'}
                        </Text>
                    </View>
                    
                    <TouchableOpacity>
                        <View
                            style={_style([
                                {
                                    // width: 120,
                                },
                                _flexRow,
                                _center,
                            ])}>
                            <Text
                                style={_style([{
                                        marginTop: 2,
                                        paddingLeft: 10,
                                        paddingRight: expanded ? 15 : 0,
                                    },
                                    _font(fonts.$rubikRegular, expanded ? colors.$white : colors.$secondaryBlue, 17)
                                ])}>
                                {date && props.startTime ? date + ' ' + props.startTime : 'Add Reminder'}
                            </Text>
                            {
                                expanded &&
                                <Image style={{marginTop: 3,marginRight: 5,}} source={images.plannerPage.closeWhite} />
                                
                            }
                        </View>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
            {
                expanded &&

                <View
                    style={_style([
                        {
                            width: '100%'
                        },
                        _flexCol,
                    ])}>
                    <TouchableOpacity
                        style={{width: '100%'}}
                        onPress={() => {
                            setExpanded(!expanded);
                        }}>
                        <View
                            style={_style([
                                {
                                    width: '100%',
                                    height: 50,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                },
                                _flexRow,
                                _center,
                            ])}>
                            <View
                                style={_style([
                                    {

                                    },
                                ])}>
                                <Image source={images.plannerPage.calendarWhite} />
                            </View>
                            <View
                                style={_style([
                                    {
                                        flex: 1,
                                    },
                                ])}>
                                <Text
                                    style={_style([{
                                            marginTop: 2,
                                            paddingLeft: 10,
                                        },
                                        _font(fonts.$rubikRegular, colors.$white, 17)
                                    ])}>
                                    {'Later Today'}
                                </Text>
                            </View>
                            
                            <TouchableOpacity>
                                <View
                                    style={_style([
                                        {
                                            // width: 120,
                                        },
                                        _flexRow,
                                        _center,
                                    ])}>
                                    <Text
                                        style={_style([{
                                                marginTop: 2,
                                                paddingLeft: 10,
                                                paddingRight: 0,
                                            },
                                            _font(fonts.$rubikRegular, colors.$white, 17)
                                        ])}>
                                        {'At ' + props.startTime}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{width: '100%'}}
                        onPress={() => {
                            setExpanded(!expanded);
                        }}>
                        <View
                            style={_style([
                                {
                                    width: '100%',
                                    height: 50,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                },
                                _flexRow,
                                _center,
                            ])}>
                            <View
                                style={_style([
                                    {

                                    },
                                ])}>
                                <Image source={images.plannerPage.calendarWhite} />
                            </View>
                            <View
                                style={_style([
                                    {
                                        flex: 1,
                                    },
                                ])}>
                                <Text
                                    style={_style([{
                                            marginTop: 2,
                                            paddingLeft: 10,
                                        },
                                        _font(fonts.$rubikRegular, colors.$white, 17)
                                    ])}>
                                    {'Tomorrow'}
                                </Text>
                            </View>
                            
                            <TouchableOpacity>
                                <View
                                    style={_style([
                                        {
                                            // width: 120,
                                        },
                                        _flexRow,
                                        _center,
                                    ])}>
                                    <Text
                                        style={_style([{
                                                marginTop: 2,
                                                paddingLeft: 10,
                                                paddingRight: 0,
                                            },
                                            _font(fonts.$rubikRegular, colors.$white, 17)
                                        ])}>
                                        {'At ' + props.startTime}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{width: '100%'}}
                        onPress={() => {
                            toggleDateTimePickerModal();
                            setExpanded(!expanded);
                        }}>
                        <View
                            style={_style([
                                {
                                    width: '100%',
                                    height: 50,
                                    paddingLeft: 10,
                                    paddingRight: 10
                                },
                                _flexRow,
                                _center,
                            ])}>
                            <View
                                style={_style([
                                    {

                                    },
                                ])}>
                                <Image source={images.plannerPage.calendarWhite} />
                            </View>
                            <View
                                style={_style([
                                    {
                                        flex: 1,
                                    },
                                ])}>
                                <Text
                                    style={_style([{
                                            marginTop: 2,
                                            paddingLeft: 10,
                                        },
                                        _font(fonts.$rubikRegular, colors.$white, 17)
                                    ])}>
                                    {'Pick a day'}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View
                        style={_style([
                            {
                                width: '100%',
                                height: 15,
                                borderColor: 'rgb(112, 112, 112)',
                                borderBottomWidth: 1,
                                paddingLeft: 10,
                                paddingRight: 10
                            },
                            _flexRow,
                            _center,
                        ])}>
                    </View>
                </View>

            }
            <CEventDatePickerModal 
                title={'Set'}
                date={null}
                visible={dateTimePickerModalVisible}
                handleGoBack={() => {
                    //navigation.goBack();
                }}
                handleModalClose={() => toggleDateTimePickerModal()}
                setData={(date) => onSetData(date)}
                // onCreateAppointment={() => toggleCreatedAppointmentModal()}
            />
        </View>
    );
};

export default CReminder;
