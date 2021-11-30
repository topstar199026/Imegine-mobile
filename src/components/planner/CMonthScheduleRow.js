import { FlatList, View } from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
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
import { subFormatString } from 'src/modules/FormatUtil';

var styles = StyleSheet.create({
});


const MonthScheduleItem = (props) => {
    return (
        <TouchableOpacity>
            <View
                style={_style([
                    {
                        backgroundColor: colors.$secondaryBlue,
                        width: '100%',
                        borderRadius: 5,
                        marginBottom: 1,
                        height: 17,
                        paddingTop: 3,
                    }
                ])}>
                <Text 
                    style={_style([
                        {
                            textAlign: 'center',
                        },
                        _font(fonts.$rubikMedium, colors.$white, 11)
                    ])}>
                    {subFormatString(props.ss.title, 4)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}


const CMonthScheduleRow = (props) => {
    const data  = props.m;
    return (
        <View
            style={_style([
                {
                    width: '100%',
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: colors.$bubbles,
                },
                _flexRow,
            ])}>
            {
                data.map((w, l) =>
                    <View
                        key={l.toString()}
                        style={_style([
                            {
                                flex: 1,
                                height: '100%',
                                borderRightWidth: 1,
                                borderColor: colors.$bubbles,
                                alignItems: 'center',
                                // justifyContent: 'center',
                            },
                            _flexCol,
                            w.flag === true ?
                            {
                                backgroundColor: 'rgba(84, 229, 225, 0.3)',
                            } : {}
                        ])}>
                        <View
                            style={_style([
                                {
                                    width: 20,
                                    height: 20,
                                    marginTop: 3,
                                    marginBottom: 2,
                                },
                                _center,
                                w.flag === true ?
                                {
                                    borderRadius: 10,
                                    backgroundColor: '#54E5FF',
                                } : {}
                            ])}>
                            <Text
                                style={{
                                    fontFamily: fonts.$robotMedium,
                                    color: colors.$text,
                                    fontSize: 12,
                                }}>
                                {w.d}
                            </Text>
                        </View>
                        <View
                            style={_style([
                                {
                                    flex: 1,
                                    width: '100%',
                                    padding: 1,
                                    justifyContent: 'flex-end',
                                },
                                _flexCol,
                            ])}>
                            {
                                w.schedule.map((ss, p) =>
                                    p < 3 && <MonthScheduleItem ss={ss} key={p.toString()} />
                                )
                            }
                            {
                                w.schedule.length > 3 &&
                                <TouchableOpacity>
                                    <View
                                        style={_style([
                                            {
                                                width: '100%',
                                                borderRadius: 5,
                                                marginBottom: 1,
                                                height: 17,
                                                paddingTop: 3,
                                            }
                                        ])}>
                                        <Text 
                                            style={_style([
                                                {
                                                    textAlign: 'center',
                                                },
                                                _font(fonts.$rubikMedium, colors.$secondaryBlue, 11)
                                            ])}>
                                            {(w.schedule.length - 3).toString() + ' more'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                ) 
            }
        </View>
    );
}

export default CMonthScheduleRow;
