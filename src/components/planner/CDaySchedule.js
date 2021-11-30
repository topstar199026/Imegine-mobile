import { FlatList, View } from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';

import {colors, images, fonts} from 'src/assets/themes';
// import { dayEventList } from 'src/datas/sample';
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

const dayHourList = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
];

const ScheduleItem = (props) => {
    // console.log('props', props.item.item)
    const [visible, setVisible] = useState(false);

    const toggleExpanded = () => {
        // setVisible(!visible);
        props.toggleExpanded(props.i, props.j);
    }

    useEffect(() => {
        // props.toggleExpanded();
    }, [visible])

    return (
        <TouchableOpacity
            onPress={() => toggleExpanded()}>
            <View
                style={{
                    borderRadius: 20,
                    minHeight: 40,
                    backgroundColor: colors.$secondaryBlue,
                    marginTop: 1,
                    marginBottom: 1,
                    paddingLeft: props.item.expanded ? 20 : 15,
                    paddingRight: props.item.expanded ? 20 : 15,
                    paddingTop: props.item.expanded ? 20 : 4,
                    paddingBottom: props.item.expanded ? 20 : 4,
                }}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                    <View
                        style={{
                            flex: 1,
                        }}>
                        <View>
                            <Text
                                style={{
                                    fontFamily: props.item.expanded ? fonts.$rubikBold : fonts.$rubikMedium,
                                    color: colors.$white,
                                    fontSize: props.item.expanded ? 14 : 13,
                                }}>
                                {moment(props.item.item.startTime, 'HH:mm:ss').format('HH:mm')}{' hrs'}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikMedium,
                                    color: colors.$white,
                                    fontSize: props.item.expanded ? 18 : 13,
                                }}>
                                {props.item.item.title}
                            </Text>
                        </View>
                    </View>
                    {
                        props.item.expanded &&
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity>
                                <View
                                    style={{
                                        width: 22,
                                    }}>
                                    <Image source={images.editWhitePlanner} />
                                </View>
                            </TouchableOpacity>
                            <View style={{width: 10}} />
                            <TouchableOpacity>
                                <View
                                    style={{
                                        width: 22,
                                    }}>
                                    <Image source={images.plusCircleWhitePlanner} />
                                </View>
                            </TouchableOpacity>
                        </View>  
                    }
                                      
                </View>
                {
                    props.item.expanded === true &&
                    <View
                        style={{
                            marginTop: 32,
                        }}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                            <View
                                style={{
                                    width: 40,
                                }}>
                                <Image source={images.contactWhite} />
                            </View>
                            <View>
                                <Text
                                    style={{
                                        width: 185,
                                        fontFamily: fonts.$rubikBold,
                                        color: colors.$white,
                                        fontSize: 13,
                                        lineHeight: 16,
                                    }}>
                                    {'Pablo Zehle, Alexander Ehm, Jorge Martínez'}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                marginTop: 15,
                                width: '100%',
                            }}>
                            <TouchableOpacity onPress={() => props.toggleMapWithModal()}>
                                <Image 
                                    source={images.mapView} 
                                    style={{
                                        width: '100%',
                                        borderRadius: 15,
                                    }}    
                             /> 
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                marginTop: 10,
                                width: '100%',
                            }}>
                            <Text
                                style={{
                                    width: 185,
                                    fontFamily: fonts.$rubikRegular,
                                    color: colors.$white,
                                    fontSize: 13,
                                    lineHeight: 16,
                                }}>
                                {'143 Wolfsgangstraße Fráncfort del Meno, Hesse'}
                            </Text>
                        </View>
                    </View>
                }
            </View>
        </TouchableOpacity>
    );
}

const DayScheduleItem = (props) => {
    // console.log(props)
    return (
        <View
            style={{
                width: '100%',
            }}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: props.expanded === true ? 'column' : 'row',
                    minHeight: 40,
                }}>
                <View
                    style={{
                        width: 80,
                        paddingTop: 10,
                    }}>
                    <Text
                        style={{
                            fontFamily: fonts.$rubikRegular,
                            color: colors.$secondaryBlue,
                            fontSize: 13,
                        }}>
                        {props.item.item.time}{' hrs'}
                    </Text>
                </View>
                
                <View
                    style={{
                        flex: 1,
                        padding: 1,
                    }}>
                    {
                        props.item.item.schedule.map((s, i) => 
                            <ScheduleItem 
                                toggleMapWithModal={() => props.toggleMapWithModal()}
                                expanded={props.expanded} 
                                key={i.toString()} 
                                i={props.item.index} 
                                j={i} 
                                item={s}
                                toggleExpanded={(i, j) => props.toggleExpanded(i, j)} 
                            />
                        )
                    }
                </View>
                {/* <View
                    style={{
                        width: 50,
                    }}>

                </View> */}
            </View>
            <View style={{
                borderWidth: 1,
                borderColor: colors.$bubbles
            }} />
            
        </View>
    );
}

const CDaySchedule = (props) => {

    const dayEventList = props.eventList;

    const [scheduleList,setScheduleList] = useState([]);
    const [expanded, setExpanded] = useState(false);
    
    useEffect(() => {
        console.log('dayEventList', dayEventList)
        const arr = hourScheduleMake();
        console.log('hourScheduleMake', arr)
        setScheduleList(arr);
    }, [dayEventList]);

    useEffect(() => {
        // console.log(expanded)
    }, [expanded])

    const getExpandedItemCount = (_scheduleList) => {
        let count = 0;
        for(let i=0; i<_scheduleList.length; i++){
            for(let j=0; j<_scheduleList[i].schedule.length; j++){
                if(_scheduleList[i].schedule[j].expanded === true) count++;
            }
        }
        return count;
    }

    const toggleExpanded = (i, j) => {
        // console.log(scheduleList[i].schedule[j], i, j);
        const _prev = [...scheduleList];        
        if(_prev[i].schedule[j].expanded === false && expanded === false) {
            _prev[i].schedule[j].expanded = !_prev[i].schedule[j].expanded;
            setExpanded(!expanded);
            setScheduleList(_prev);
        }else if(_prev[i].schedule[j].expanded === false && expanded === true) {
            _prev[i].schedule[j].expanded = !_prev[i].schedule[j].expanded;
            setScheduleList(_prev);
        }else if(_prev[i].schedule[j].expanded === true && expanded === true) {
            getExpandedItemCount(_prev) < 2 && setExpanded(!expanded);
            _prev[i].schedule[j].expanded = !_prev[i].schedule[j].expanded;
            setScheduleList(_prev);
        }
    }

    const hourScheduleMake = () => {
        const _arr = [];
        const _arrExam = dayEventList;

        console.log('_arrExam', _arrExam)
        for(var i = 0; i <= 23; i++) {
            var format = 'hh:mm:ss';
            var _s = (i < 10 ? '0' : '') + i.toString() + ':00:00';
            var _e = (i < 10 ? '0' : '') + i.toString() + ':59:59';
            var _sT = moment(_s, format);
            var _eT = moment(_e, format);
            const _arrT = [];
            for(var j = 0; j < _arrExam.length; j++){
                var _t = _arrExam[j];
                // var _tT = moment(_t.time + ':00', format);
                var _tT = moment(_t.startTime, format);
                // console.log(_tT, _sT, _eT)
                // if(_tT.isBetween(_sT, _eT)){
                if(_sT <= _tT && _tT < _eT){
                    _arrT.push({
                        expanded: false,
                        item: _t,
                    });
                }
            }
            _arr.push({
                id: i,
                time: (i < 10 ? '0' : '') + i.toString() + ':00',
                schedule: _arrT,
            })

        }
        return _arr;
    }

    return (
        <FlatList
            onScroll={() => {
                props.handleScroll && props.handleScroll();
            }}
            data={scheduleList}
            renderItem={(item) => 
                <DayScheduleItem 
                    toggleMapWithModal={() => props.toggleMapWithModal()}
                    toggleExpanded={(i, j) => toggleExpanded(i, j)} 
                    expanded={expanded} item={item}                    
                />
            }
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default CDaySchedule;
