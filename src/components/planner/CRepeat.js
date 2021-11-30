import { View } from 'native-base';
import React, { useState } from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flexCol, _flexRow, _font, _style } from 'src/modules/Style';
import { style } from 'styled-system';

var styles = StyleSheet.create({
    
});

const repeatArr = [
    'Daily',
    'Weekly',
    'Weekdays',
    'Monthly',
    'Yearly',
];
const CRepeat = (props) => {

    const [expanded, setExpanded] = useState(false);
    const [repeat, setRepeat] = useState(null)

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
                    setExpanded(!expanded);
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
                        <Image source={expanded ? images.plannerPage.repeatWhite : images.plannerPage.repeatBlue} />
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
                            {'Repeat'}
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
                                {repeat ? repeat : 'Select'}
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
                    {
                        repeatArr.map((d, index) =>
                        <TouchableOpacity
                            key={index.toString()}
                            style={{width: '100%'}}
                            onPress={() => {
                                setRepeat(d);
                                props.setRepeatType(d);
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
                                        {d}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        
                        )
                    }
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
        </View>
    );
};

export default CRepeat;
