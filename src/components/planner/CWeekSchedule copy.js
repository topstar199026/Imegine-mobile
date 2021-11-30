import { FlatList, View } from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';
import GestureRecognizer from 'react-native-swipe-gestures';

import {colors, images, fonts} from 'src/assets/themes';
import { style } from 'styled-system';

var styles = StyleSheet.create({
    selectedTab: {
        opacity: 1,
    },
    tab: {
        fontFamily: fonts.$rubikBold,
        color: colors.$text,
        fontSize: 20,
        opacity: 0.5,
    }
});

export const _weekList = [    
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S',
];

const ScheduleItem = (props) => {
    
    return (
        <TouchableOpacity>
            <View
                style={{
                    backgroundColor: colors.$secondaryBlue,
                    width: '100%',
                    borderRadius: 5,
                    marginBottom: 1,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.$robotMedium,
                        color: colors.$white,
                        fontSize: 11,
                        textAlign: 'center',
                    }}>
                    {
                        'BreakfaA'
                    }
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const WeekScheduleItem = (props) => {
    console.log('props.weekList', props.weekList)
    return (
        <View
            style={{
                width: '100%',
                borderBottomWidth: 1,
                borderColor: colors.$bubbles,
                display: 'flex',
                flexDirection: 'row',
                minHeight: 40,
            }}>
            <View
                style={{
                    width: 40,
                    paddingTop: 20,
                    paddingLeft: 10,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.$rubikRegular,
                        color: colors.$secondaryBlue,
                        fontSize: 13,
                    }}>
                    {props.item.item.time}
                </Text>
            </View>
            
            {/* {
                props.weekList && props.weekList.length > 0 && 
                props.weekList.map((s, i) => 
                    <View 
                        key={i.toString()} 
                        style={[
                            {
                                flex: 1,
                                borderLeftWidth: 1,
                                borderColor: colors.$bubbles,
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 1,
                            },
                            s.flag === true ?
                            {
                                backgroundColor: 'rgba(84, 229, 225, 0.3)',
                            } : {}
                        ]}>
                        <ScheduleItem />
                    </View>
                )
            }             */}
        </View>
    );
}

const CWeekSchedule = (props) => {

    

    const [scheduleList,setScheduleList] = useState([]);

    const [currentWeek, setCurrentWeek] = useState(null);
    const [weekList, setWeekList] = useState(null);
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold:  80,
    };

    useEffect(() => {
        // setInitial();
    }, [])

    useEffect(() => {
        // currentWeek !== null && getCurrentWeek();
    }, [currentWeek])

    const setInitial = () => {
        // const currentDate = moment().format('YYYY-MM-DD');
        // setCurrentWeek(currentDate);
        // const arr = hourScheduleMake();
        // setScheduleList(arr);  
    }

    // const onSwipeLeft = (gestureState) => {
    //     const previousWeek = moment(currentWeek, 'YYYY-MM-DD').subtract(1,'weeks').format('YYYY-MM-DD');
    //     setCurrentWeek(previousWeek);
    // }
     
    // const onSwipeRight = (gestureState) => {
    //     const nextWeek = moment(currentWeek, 'YYYY-MM-DD').add(1,'weeks').format('YYYY-MM-DD');
    //     setCurrentWeek(nextWeek);
    // }

    // const getCurrentWeek = () => {

    //     const startOfWeek = moment(currentWeek, 'YYYY-MM-DD').startOf('week').format('YYYY-MM-DD');
    //     const endOfWeek   = moment(currentWeek, 'YYYY-MM-DD').endOf('week').format('YYYY-MM-DD');

    //     console.log('---1---', startOfWeek, endOfWeek);
    //     makeWeekList(startOfWeek, endOfWeek);
        
    // }

    // const getDayOfWeek = (day) => {
    //     return moment(day, 'YYYY-MM-DD').day();
    // }

    // const getDay = (day) => {
    //     return moment(day, 'YYYY-MM-DD').date();
    // }

    // const getCurrentFlag = (date) => {
    //     const currentDate = moment().format('YYYY-MM-DD');
    //     const compareDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
        
    //     return moment(currentDate).isSame(compareDate);
    // }

    // const makeWeekList = (startOfWeek, endOfWeek) => {
    //     const arr = [];
    //     // for(var i = getDay(startOfWeek); i <= getDay(endOfWeek); i++) {
    //     for(var i = 0; i <= 6; i++) {
    //         const _cD = moment(startOfWeek, 'YYYY-MM-DD').add(i,'days').format('YYYY-MM-DD');
    //         arr.push(
    //             {
    //                 dayWeek: _weekList[getDayOfWeek(_cD)],
    //                 date: getDay(_cD),
    //                 flag:  getCurrentFlag(
    //                     moment(startOfWeek, 'YYYY-MM-DD').format('YYYY-MM') + '-' + ( getDay(_cD) < 9 ? '0' : '') + getDay(_cD).toString()
    //                 ),
    //             }
    //         );
    //     }
    //     setWeekList(arr);
    // }

    // const hourScheduleMake = () => {
    //     const _arr = [];
    //     const _arrExam = dayEventList;
    //     for(var i = 0; i <= 23; i++) {
    //         var format = 'hh:mm:ss';
    //         var _s = (i < 10 ? '0' : '') + i.toString() + ':00:00';
    //         var _e = (i < 10 ? '0' : '') + i.toString() + ':59:59';
    //         var _sT = moment(_s, format);
    //         var _eT = moment(_e, format);
    //         const _arrT = [];
    //         for(var j = 0; j < _arrExam.length; j++){
    //             var _t = _arrExam[j];
    //             var _tT = moment(_t.time + ':00', format);
    //             if(_tT.isBetween(_sT, _eT)){
    //                 _arrT.push({
    //                     expanded: false,
    //                     item: _t,
    //                 });
    //             }
    //         }
    //         _arr.push({
    //             id: i,
    //             // time: (i < 10 ? '0' : '') + i.toString() + ':00',
    //             time: (i < 10 ? '0' : '') + i.toString() + 'h',
    //             schedule: _arrT,
    //         })

    //     }
    //     return _arr;
    // }

    return (
        <View
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}>
            {/* <GestureRecognizer
                config={config}
                onSwipeLeft={(state) => onSwipeLeft(state)}
                onSwipeRight={(state) => onSwipeRight(state)}
                style={{
                    height: 48,
                }}
                >
                <View
                    style={{
                        borderBottomWidth: 2,
                        borderColor: 'rgba(50, 84, 131, 0.5)',
                        display: 'flex',
                        flexDirection: 'row',
                        paddingRight: 5,
                    }}>
                    <View style={{width: 45,}}>
                        
                    </View>
                    {
                        weekList && weekList.length > 0 &&
                        weekList.map((s, i) => 
                            <View 
                                key={i.toString()} 
                                style={[
                                    {
                                        flex: 1,
                                        borderLeftWidth: 1,
                                        borderColor: colors.$bubbles,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    },
                                    s.flag === true ?
                                    {
                                        backgroundColor: 'rgba(84, 229, 225, 0.3)',
                                    } : {}
                                ]}>
                                <View
                                    style={[
                                        {
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 22,
                                            height: 22,
                                            
                                        },
                                        s.flag === true ?
                                        {
                                            borderRadius: 11,
                                            backgroundColor: '#54E5FF',
                                        } : {}
                                    ]}>
                                    <Text
                                        style={{
                                            fontFamily: fonts.$rubikMedium,
                                            color: colors.$secondaryBlue,
                                            fontSize: 17,
                                        }}>
                                        {s.dayWeek}
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontFamily: fonts.$rubikMedium,
                                            color: colors.$secondaryBlue,
                                            fontSize: 17,
                                        }}>
                                        {s.date}
                                    </Text>
                                </View>
                            </View>
                        )
                    }
                </View>
                
            </GestureRecognizer> */}
            
            <View
                style={{
                    flex: 1,
                    paddingLeft: 5,
                    paddingRight: 5,
                }}>
                {
                    {/* weekList && weekList.length > 0 &&
                    <FlatList
                        data={scheduleList}
                        renderItem={(item, index) => 
                            <WeekScheduleItem 
                                item={item} 
                                weekList={weekList}                  
                            />
                        }
                        keyExtractor={(item, index) => index.toString()}
                    /> */}
                }                
            </View>
        </View>
    );
};

export default CWeekSchedule;
