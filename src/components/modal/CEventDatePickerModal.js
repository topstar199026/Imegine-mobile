import React, { useState } from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from "react-native" ;
import ReactNativeModal from 'react-native-modal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Calendar } from 'react-native-calendars';

import {colors, images, fonts} from 'src/assets/themes';
import moment from 'moment';
import { date } from 'yup/lib/locale';

var styles = StyleSheet.create({    
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalView: {
        // height: 327,
        backgroundColor: colors.$white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

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

const CEventDatePickerModal = (props) => {

    const [markedDate, setMarkedDate] = useState(null)
    const dateFunction = () => {
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        return {
            firstDay: firstDay,
            lastDay: lastDay,
        }
        // {
        //     dateFunction().firstDay.toString()
        // }
        // {
        //     dateFunction().lastDay.toString()
        // }
    }

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
                            {'Select a Event Date'}
                            
                        </Text>
                    </View>
                    <View>
                        <Calendar
                            style={{
                                width: wp(90),
                                borderRadius: 8,
                                backgroundColor: colors.card,
                            }}
                            renderArrow={direction => {
                                return (
                                    direction == 'left' ?
                                    <Image source={images.dateBackMessage} />
                                    :
                                    <Image source={images.dateNextMessage} />
                                );
                            }}
                            // markedDates={startMode ? markedDatesIn : markedDatesOut}
                            // @ts-ignore
                            current={new Date()}
                            minDate={new Date()}
                            //maxDate={maxDate}
                            onDayPress={day => {
                            //   setDaySelected(day.dateString, startMode);
                                setMarkedDate({[day.dateString]:{selected: true}})
                            }}
                            monthFormat={'MMMM  yyyy'}
                            theme={{
                                calendarBackground: colors.card,
                                textSectionTitleColor: colors.$secondaryBlue,
                                selectedDayBackgroundColor: 'rgba(64, 125, 255, 0.5)',
                                selectedDayTextColor: colors.$secondaryBlue,
                                todayTextColor: colors.$secondaryBlue,
                                dayTextColor: 'rgba(20, 20, 20, 0.3)',
                                // textDisabledColor: BaseColor.grayColor,
                                dotColor: 'red',
                                selectedDotColor: 'rgba(20, 20, 20, 0.3)',
                                arrowColor: colors.primary,
                                monthTextColor: colors.$secondaryBlue,
                                textDayFontFamily: fonts.$rubikRegular,
                                textMonthFontFamily: fonts.$rubikRegular,
                                textDayHeaderFontFamily: fonts.$rubikRegular,
                                // textMonthFontWeight: 'bold',
                                textDayFontSize: 22,
                                textMonthFontSize: 19,
                                textDayHeaderFontSize: 13,
                            }}
                            markedDates={markedDate}
                        />
                    </View>
                    <View
                        style={{
                            padding: 19,
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                markedDate && props.setData && props.setData(markedDate);
                                props.handleModalClose()
                            }}>
                            <View
                                style={{
                                    width: 234,
                                    height: 43,
                                    borderRadius: 15,
                                    borderColor: colors.$secondaryBlue,
                                    borderWidth: 1,
                                    padding: 7,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikRegular,
                                        color: colors.$secondaryBlue,
                                        fontSize: 22,
                                    }}>
                                    {props.title || 'Create Appointment'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </ReactNativeModal>
    );
};

export default CEventDatePickerModal;
