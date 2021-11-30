import React, { useEffect, useState } from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from "react-native" ;
import ReactNativeModal from 'react-native-modal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({    
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    modalView: {
        width: wp(90),
        padding: 15,
        backgroundColor: colors.$white,
        borderRadius: 15,

        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 8,

        alignItems: 'center',
    }
});

const CTimeScrollPickerModal = (props) => {

    var date = new Date();
    var offsetInHours = date.getTimezoneOffset() / 60;

    console.log('offsetInHours', offsetInHours)

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        console.log(time);
    }, [time])

    return (
            <ReactNativeModal
                isVisible={props.visible}
                avoidKeyboard={false}
                swipeDirection={'down'}
                useNativeDriverForBackdrop
                scrollHorizontal={true}
                backdropColor={'#F6F6F6'}
                backdropOpacity={0.9}
                onSwipeComplete={() => props.handleModalClose()}
                style={[styles.modal]}
                >
                <View
                    style={[styles.modalView]}
                    >
                    <View>
                        <Text
                            style={{
                                marginTop: 21,
                                fontFamily: fonts.$rubikRegular,
                                color: colors.$secondaryBlue,
                                fontSize: 24,
                            }}>
                            {'Select a Time'}
                            
                        </Text>
                        
                    </View>
                    <View
                        style={{
                            marginTop: 15,
                        }}>
                        <DatePicker
                            style={{
                                height: 120,
                            }}
                            date={time}
                            minuteInterval={5}
                            mode="time"
                            textColor={colors.$secondaryBlue}
                            // timeZoneOffsetInMinutes={0}
                            onDateChange={(date) => {
                                setTime(date);
                            }}
                        />

                    </View>   
                    <View
                        style={{
                            marginTop: 15,
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                        <View style={{flex: 1,}} />
                        <TouchableOpacity
                            onPress={() =>{ 

                                props.handleModalClose()
                            }}>
                            <View>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikRegular,
                                        color: colors.$secondaryBlue,
                                        fontSize: 19,
                                    }}>
                                    {'Cancel'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View
                            style={{width: 30,}}>

                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                props.onSetTime(time)
                                props.handleModalClose()
                            }}>
                            <View>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikRegular,
                                        color: colors.$secondaryBlue,
                                        fontSize: 19,
                                    }}>
                                    {'Ok'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View
                            style={{width: 30,}}>

                        </View>
                    </View>                 
                </View>
            </ReactNativeModal>
    );
};

export default CTimeScrollPickerModal;
