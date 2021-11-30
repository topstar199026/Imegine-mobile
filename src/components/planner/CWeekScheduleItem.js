import { View } from 'native-base';
import React, {} from 'react';
import {Text, TouchableOpacity} from "react-native" ;

import {colors, fonts} from 'src/assets/themes';
import { subFormatString } from 'src/modules/FormatUtil';
import { _flexCol, _flexRow, _font, _style } from 'src/modules/Style';

const ScheduleItem = (props) => {
    // console.log('props--------------', props)
    const item = props.item.item;
    return (
        <TouchableOpacity
            style={_style([
                {
                    width: '100%',
                }
            ])}
            onPress={() => {
                props.toggleModal('data') ;
            }}>
            <View
                style={_style([
                    {
                        backgroundColor: colors.$secondaryBlue,
                        width: '100%',
                        borderRadius: 5,
                        marginBottom: 1,
                    }
                ])}>
                <Text 
                    style={_style([
                        {
                            textAlign: 'center',
                        },
                        _font(fonts.$robotMedium, colors.$white, 11)
                    ])}>
                    {subFormatString(item.title, 4)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}


const CWeekScheduleItem = (props) => {
    return (
        <View
            style={_style([
                {
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: colors.$bubbles,
                    minHeight: 40,
                },
                _flexRow,
            ])}>
            <View
                style={_style([
                    {
                        width: 40,
                        paddingTop: 20,
                        paddingLeft: 10,
                    }
                ])}>
                <Text
                    style={{
                        fontFamily: fonts.$rubikRegular,
                        color: colors.$secondaryBlue,
                        fontSize: 13,
                    }}>
                    {props.item.time}
                </Text>
            </View>
            {
                
                props.item.schedule.map((s, i) => 
                    <View 
                        key={i.toString()} 
                        style={_style([
                            {
                                flex: 1,
                                borderLeftWidth: 1,
                                borderColor: colors.$bubbles,
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                padding: 1,
                            },
                            _flexCol,
                            s.flag === true ?
                            {
                                backgroundColor: 'rgba(84, 229, 225, 0.3)',
                            } : {}
                        ])}>
                        {
                            s.item.map((data, j) => 
                                j < 1 &&
                                <ScheduleItem 
                                    key={j.toString()} item={data} 
                                    toggleModal={(data) => props.toggleModal(data)}  
                                />
                            )
                        }
                        {
                            s.item.length > 1 &&
                            <TouchableOpacity>
                                <View
                                    style={_style([
                                        {
                                            width: '100%',
                                            borderRadius: 5,
                                            marginBottom: 1,
                                        }
                                    ])}>
                                    <Text 
                                        style={_style([
                                            {
                                                textAlign: 'center',
                                            },
                                            _font(fonts.$rubikMedium, colors.$secondaryBlue, 10)
                                        ])}>
                                        {(s.item.length - 1).toString() + ' more'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                )
            }            
        </View>
    );
}

export default CWeekScheduleItem;
