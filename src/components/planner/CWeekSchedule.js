import { ScrollView, View } from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {Text, StyleSheet} from "react-native" ;
import moment from 'moment';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useSelector} from 'react-redux';

import {colors, fonts} from 'src/assets/themes';
import { _flexCol, _flexRow, _font, _style } from 'src/modules/Style';
import CWeekScheduleItem from './CWeekScheduleItem';
import { PlannerActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import { SocketContext } from 'src/contexts/SocketContext';

export const _weekList = [    
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S',
];

const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold:  80,
};

const CWeekSchedule = (props) => {
    const socket = useContext(SocketContext);

    const {
        // @ts-ignore
        newPlanner, 
    } = socket;

    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    const [scheduleList,setScheduleList] = useState([]);

    const [currentWeek, setCurrentWeek] = useState(null);
    const [weekList, setWeekList] = useState(null);
    const [eventList, setEventList] = useState(null);
    
    const weekRange = props.weekRange;

    useEffect(() => {
        setInitial();
    }, [])

    useEffect(() => {
        if(weekList && weekList.length > 0) {
            
            loadPlanner();
        }
    }, [weekList]);

    useEffect(() => {
        if(newPlanner !== null && weekList && weekList.length > 0) {
            loadPlanner();
        }
    }, [newPlanner])

    useEffect(() => {
        currentWeek !== null && getCurrentWeek();
    }, [currentWeek]);

    useEffect(() => {
    }, [scheduleList])


    useEffect(() => {
        currentWeek !== null && getCurrentWeek();
    }, [weekRange])

    useEffect(() => {
        if(eventList) {
            const arr = hourScheduleMake();
            setScheduleList(arr);
        }
    }, [eventList])

    const handleScroll = () =>  {
        props.handleScroll && props.handleScroll();
    }

    const setInitial = () => {
        let currentDate = moment().format('YYYY-MM-DD');
        if(props.index === 1) {
            currentDate = moment().add(7, 'days').format('YYYY-MM-DD');
        }
        setCurrentWeek(currentDate);
    }


    const loadPlanner = () => {

        const startDate = weekList[0]._data;
        const endDate   = weekList[weekList.length - 1]._data;

        var data = {
            startDate: startDate,
            endDate: endDate,
        };

        PlannerActions.plannerGet(rsa, data, res => {
            if(res && res.status === true) {
                var data = res.data;
                setEventList(data);
            }else if(res && res.status === false && res.error) {
                Utils.toast(1, res.error);
            }
        });
    }

    const onSwipeLeft = (gestureState) => {
        const previousWeek = moment(currentWeek, 'YYYY-MM-DD').subtract(1,'weeks').format('YYYY-MM-DD');
        setCurrentWeek(previousWeek);
    }
     
    const onSwipeRight = (gestureState) => {
        const nextWeek = moment(currentWeek, 'YYYY-MM-DD').add(1,'weeks').format('YYYY-MM-DD');
        setCurrentWeek(nextWeek);
    }

    const getCurrentWeek = () => {

        const startOfWeek = moment(currentWeek, 'YYYY-MM-DD').startOf('week').format('YYYY-MM-DD');
        const endOfWeek   = moment(currentWeek, 'YYYY-MM-DD').endOf('week').format('YYYY-MM-DD');
        makeWeekList(startOfWeek, endOfWeek);
        
    }

    const getDayOfWeek = (day) => {
        return moment(day, 'YYYY-MM-DD').day();
    }

    const getDay = (day) => {
        return moment(day, 'YYYY-MM-DD').date();
    }

    const getCurrentFlag = (date) => {
        const currentDate = moment().format('YYYY-MM-DD');
        const compareDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
        return moment(currentDate).isSame(compareDate);
    }

    const makeWeekList = (startOfWeek, endOfWeek) => {
        const arr = [];
        let _num = (props.weekRange === 0) ? 1 : 6;
        for(var i = 0; i <= _num; i++) {
            const _cD = 
                props.weekRange === 0 ?
                moment().add(i,'days').format('YYYY-MM-DD')
                :
                moment(startOfWeek, 'YYYY-MM-DD').add(i,'days').format('YYYY-MM-DD');
            arr.push(
                {
                    dayWeek: _weekList[getDayOfWeek(_cD)],
                    date: getDay(_cD),
                    _data: _cD,
                    flag:  getCurrentFlag(_cD
                        // moment(startOfWeek, 'YYYY-MM-DD').format('YYYY-MM') + '-' + ( getDay(_cD) < 9 ? '0' : '') + getDay(_cD).toString()
                    ),
                }
            );
        }
        setWeekList(arr);
    }

    const hourScheduleMake = () => {
        const _arr = [];
        const _arrExam = eventList;
        for(var i = 0; i <= 23; i++) {
            var format = 'HH:mm:ss';
            var _s = (i < 10 ? '0' : '') + i.toString() + ':00:00';
            var _e = (i < 10 ? '0' : '') + i.toString() + ':59:59';
            var _sT = moment(_s, format);
            var _eT = moment(_e, format);
            const _arrT = [];
            for(var j = 0; j < weekList.length; j++) {
                const _weekDayC = weekList[j]._data;
                const _arrTT = [];
                for(var k = 0; k < _arrExam.length; k++){
                    var _t = _arrExam[k];
                    // var _tT = moment(_t.time + ':00', format);
                    var _tT = moment(_t.startTime, format);
                    
                    // if(_weekDayC === _t.startDate &&  _tT.isBetween(_sT, _eT)){
                    if(_weekDayC === _t.startDate &&  _sT <= _tT && _tT < _eT){
                        // console.log('-------', _t)
                        _arrTT.push({
                            item: _t,
                        });
                    }
                }
                _arrT.push({
                    item: _arrTT,
                    flag: getCurrentFlag(_weekDayC),
                });
            }

            _arr.push({
                id: i,
                // time: (i < 10 ? '0' : '') + i.toString() + ':00',
                time: (i < 10 ? '0' : '') + i.toString() + 'h',
                schedule: _arrT,
            })

        }
        return _arr;
    }

    return (
        <View
            style={_style([
                {
                    height: '100%',
                },
                _flexCol,
            ])}>
            <GestureRecognizer
                config={config}
                onSwipeLeft={(state) => onSwipeLeft(state)}
                onSwipeRight={(state) => onSwipeRight(state)}
                style={_style([
                    {
                        height: 48,
                    }
                ])}>
                <View
                    style={_style([
                        {   
                            borderBottomWidth: 2,
                            borderColor: 'rgba(50, 84, 131, 0.5)',
                            paddingRight: 5,
                        },
                        _flexRow,
                    ])}>
                    <View style={{width: 45,}} />
                    {
                        weekList && weekList.length > 0 &&
                        weekList.map((s, i) => 
                            <View 
                                key={i.toString()} 
                                style={_style([
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
                                ])}>
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
                                        style={_style([{
                                            },
                                            _font(fonts.$rubikMedium, colors.$secondaryBlue, 17)
                                        ])}>
                                        {s.dayWeek}
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        style={_style([{
                                            },
                                            _font(fonts.$rubikMedium, colors.$secondaryBlue, 17)
                                        ])}>
                                        {s.date}
                                    </Text>
                                </View>
                            </View>
                        )
                    }
                </View>
                
            </GestureRecognizer>
            <View
                style={_style([
                    {
                        flex: 1,
                        paddingLeft: 5,
                        paddingRight: 5, 
                    }
                ])}>
                <ScrollView
                    onScroll={() => handleScroll()}>
                    {
                        scheduleList && scheduleList.length>0 && scheduleList.map((item, index) =>
                             <CWeekScheduleItem 
                                key={index.toString()}
                                item={item} 
                                weekList={weekList}   
                                toggleModal={(data) => props.toggleModal(data)}               
                            />
                            
                        )
                    }
                </ScrollView>
            </View>
        </View>
    );
};

export default CWeekSchedule;
