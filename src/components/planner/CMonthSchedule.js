import { FlatList, View } from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text, Image, TouchableOpacity, StyleSheet, TouchableHighlight, TouchableWithoutFeedback} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useSelector} from 'react-redux';

import {colors, images, fonts} from 'src/assets/themes';
import { dayEventList, dayWeekList } from 'src/datas/sample';
import { style } from 'styled-system';
import { _center, _flexCol, _flexRow, _font, _size, _style } from 'src/modules/Style';
import { PlannerActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import CMonthScheduleRow from './CMonthScheduleRow';

var styles = StyleSheet.create({
});



const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold:  80,
};

const CMonthSchedule = (props) => {

    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);

    const [expanded, setExpanded] = useState(false);
    
   
    const [currentMonth, setCurrentMonth] = useState(null);
    const [monthList, setMonthList] = useState([]);
    const [eventList, setEventList] = useState(null);

    useEffect(() => {      
        setInitial();
    }, []);

    useEffect(() => {
        loadPlanner();
    }, [currentMonth])

    useEffect(() => {
        if(eventList) {            
            currentMonth !== null && getCurrentMonth();
        }
    }, [eventList])

    const setInitial = () => {
        const currentDate = moment().format('YYYY-MM-DD');
        setCurrentMonth(currentDate);
    }

    const loadPlanner = () => {

        const startOfMonth = moment(currentMonth, 'YYYY-MM-DD').startOf('month').format('YYYY-MM-DD');
        const endOfMonth   = moment(currentMonth, 'YYYY-MM-DD').endOf('month').format('YYYY-MM-DD');

        let startDate = moment(startOfMonth, 'YYYY-MM-DD').add(getDayOfWeek(startOfMonth) * -1, 'days').format('YYYY-MM-DD');
        let endDate = moment(endOfMonth, 'YYYY-MM-DD').add(6 - getDayOfWeek(endOfMonth), 'days').format('YYYY-MM-DD');
 
        var data = {
            startDate: startDate,
            endDate: endDate,
        };

        PlannerActions.plannerGet(rsa, data, res => {
            if(res && res.status === true) {
                var data = res.data;
                setEventList(data);
            }else if(res && res.status === false && res.error) {
                setEventList([])
                Utils.toast(1, res.error);
            }
        });
    }

    const onSwipeLeft = (gestureState) => {
        const previousMonth = moment(currentMonth).subtract(1,'months').format('YYYY-MM-DD');
        setCurrentMonth(previousMonth);
        props.handleScroll && props.handleScroll();
    }
     
    const onSwipeRight = (gestureState) => {
        const nextMonth = moment(currentMonth).add(1,'months').format('YYYY-MM-DD');
        setCurrentMonth(nextMonth);
        props.handleScroll && props.handleScroll();
    }

    const getCurrentMonth = () => {
        const startOfMonth = moment(currentMonth).startOf('month').format('YYYY-MM-DD');
        const endOfMonth   = moment(currentMonth).endOf('month').format('YYYY-MM-DD');
        const endOfPreviousMonth = moment(startOfMonth).subtract(1,'months').endOf('month').format('YYYY-MM-DD');

        let startDate = moment(startOfMonth, 'YYYY-MM-DD').add(getDayOfWeek(startOfMonth) * -1, 'days').format('YYYY-MM-DD');

        const monthArray = [];

        for(var i=0; i<5; i++) {
            const weekArray = [];
            for(var j=0; j<7; j++) {
                var l = i*7 + j;
                let d = moment(startDate, 'YYYY-MM-DD').add(l, 'days').format('YYYY-MM-DD');

                const _arrTT = [];
                for(var k = 0; k < eventList.length; k++){
                    var _t = eventList[k];
                    var _tT = moment(_t.startTime, 'YYYY-MM-DD');
                    if(d === _t.startDate){
                        _arrTT.push(_t);
                    }
                }


                weekArray.push({
                    d: getDay(d),
                    date: d,
                    flag: getCurrentFlag(d),
                    schedule: _arrTT,
                })
            }
            monthArray.push(weekArray);
        }

        setMonthList(monthArray);
        
    }

    const getDayOfWeek = (day) => {
        return moment(day, 'YYYY-MM-DD').day();
    }

    const getDay = (day) => {
        return moment(day).date();
    }

    const getCurrentFlag = (date) => {
        const currentDate = moment().format('YYYY-MM-DD');        
        const compareDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');        
        return moment(currentDate).isSame(compareDate);
    }

    return (
        <GestureRecognizer
            config={config}
            onSwipeLeft={(state) => onSwipeLeft(state)}
            onSwipeRight={(state) => onSwipeRight(state)}
            style={_style([
                {
                flex: 1,
                    height: '100%',
                }
            ])}>
            <View
                style={_style([
                    {
                        height: '100%',
                    },
                    _flexCol,
                ])}>
                <View
                    style={_style([
                        {
                            height: 35,
                            borderBottomWidth: 2,
                            borderColor: 'rgba(50, 84, 131, 0.5)',
                            paddingRight: 5,
                        },
                        _flexRow,
                    ])}>
                    {
                        dayWeekList.map((s, i) => 
                            <View 
                                key={i.toString()+s.dayWeek} 
                                style={_style([
                                    {
                                        flex: 1,
                                        borderRightWidth: 1,
                                        borderColor: colors.$bubbles,
                                    },
                                    _center,
                                ])}>
                                <View
                                    style={_style([
                                        {
                                        },
                                        _size(22, 22),
                                        _center,
                                    ])}>
                                    <Text
                                        style={_style([{
                                            },
                                            _font(fonts.$rubikMedium, colors.$secondaryBlue, 17)
                                        ])}>
                                        {s.dayWeek}
                                    </Text>
                                </View>
                            </View>
                        )
                    }
                </View>
                <TouchableWithoutFeedback  
                    style={{flex: 1,}} 
                    onPress={() => {
                        props.handleScroll && props.handleScroll();
                    }}>
                    <View
                        style={_style([
                            {
                                flex: 1,
                                paddingRight: 5,
                                height: '100%',
                            },
                            _flexCol,
                        ])}>
                        {   
                            monthList && monthList.length > 0 &&
                            monthList.map((m, j) => 
                                <CMonthScheduleRow m={m} key={j.toString()} />
                            )
                        }                  
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </GestureRecognizer>
    );
};

export default CMonthSchedule;
