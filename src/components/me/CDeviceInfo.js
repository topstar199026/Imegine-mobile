import { View } from 'native-base';
import React, { useState } from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flex, _flexRow, _font, _style } from 'src/modules/Style';

const CDeviceInfo = (props) => {

    const [checked, setChecked] = useState(false)
    
    const handlePress = () => {
        setChecked(!checked);
        props.onPress();
    }

    return (
        <TouchableOpacity onPress={() => handlePress()}>
            <View
                style={_style([
                    {
                        marginTop: 1,
                    },
                    _flexRow,
                ])}>
                {
                    checked === true &&
                    <View
                        style={_style([
                            {
                                width: 50,
                            },
                            _center,
                        ])}>
                        <View style={_style([
                                {
                                    width: 24,
                                    height: 24,
                                    borderRadius: 12,
                                    backgroundColor: '#54E5FF',
                                },
                                _center,
                            ])}>
                            <Image source={images.messagePage.newGroup.checkWhite} style={_style([
                                {width: 15, height: 10}
                            ])} />
                        </View>
                    </View>
                }                
                <View
                    style={_style([
                        {
                            flex: 1,
                            backgroundColor: colors.$searchFilter,
                        },
                        _flexRow,
                    ])}>
                    <View
                        style={_style([
                            {
                                width: 50,
                            },
                            _flex,
                            _center,
                        ])}>
                        <Image source={images.me.pc} />
                    </View>
                    <View
                        style={_style([
                            {
                                flex: 1,
                                padding: 10,
                                paddingLeft: 0,
                            }
                        ])}>
                        <Text 
                            style={_style([
                                {
                                },
                                _font(fonts.$rubikMedium, colors.$secondaryBlue, 13)
                            ])}>
                            {'Dell G5 13 - Windows 10'}
                        </Text>    
                        <Text 
                            style={_style([
                                {
                                },
                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                            ])}>
                            {'Last active today at 09:43'}
                        </Text>  
                        <Text 
                            style={_style([
                                {
                                },
                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                            ])}>
                            {'132.135.32.627'}
                        </Text> 
                        <Text 
                            style={_style([
                                {
                                },
                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                            ])}>
                            {'New York, United States.'}
                        </Text>                                     
                    </View>
                </View>

            </View>
            </TouchableOpacity>
    );
}

export default CDeviceInfo;
