import { FlatList, ScrollView, View } from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useSelector} from 'react-redux';

import {colors, images, fonts} from 'src/assets/themes';
import { style } from 'styled-system';
import { _center, _flex, _flexCol, _flexRow, _font, _size, _style } from 'src/modules/Style';
import CWeekScheduleItem from './CWeekScheduleItem';
import { PlannerActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';


const CPlannerModalScheduleItem = (props) => {
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    
    const [eventList, setEventList] = useState(null);

    return (
        <View
            style={_style([
                {
                    paddingTop: 5,
                    paddingBottom: 5,
                },
                _flexRow,
            ])}>
            <View
                style={_style([
                    {

                    },
                    _flex,
                    _center,
                ])}>
                <View
                    style={_style([
                        {
                            borderRadius: 5,
                            backgroundColor: props.index && props.index % 2 === 1 ? '#41C6E2' : '#FB7D7D',
                        },
                        _size(10, 10)
                    ])}>

                </View>
            </View>
            <View
                style={_style([
                    {
                        paddingLeft: 10,        
                    },
                ])}>
                <Text
                    style={_style([{
                        },
                        _font(fonts.$rubikBold, colors.$white, 14)
                    ])}>
                    {'09:30 hrs'}
                </Text>
                <Text
                    style={_style([{
                        },
                        _font(fonts.$rubikMedium, colors.$white, 18)
                    ])}>
                    {'Meet with Friends'}
                </Text>
            </View>
        </View>
    );
};

export default CPlannerModalScheduleItem;
