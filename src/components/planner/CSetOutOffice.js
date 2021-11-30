import { View } from 'native-base';
import React, { useState } from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _centerV, _flexCol, _flexRow, _font, _style } from 'src/modules/Style';
import { flex, style } from 'styled-system';

var styles = StyleSheet.create({
    
});

const CSetOutOffice = (props) => {

    const [flag, setFlag] = useState(true);

    const handleClick =  () => {
        props.onChange && props.onChange(!flag);
        setFlag(!flag);
    }

    return (
        <View
            style={_style([
                {
                    paddingTop: 15,
                },
                _flexCol,
            ])}>
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
                    <Image source={images.plannerPage.officeBlue} />
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
                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 17)
                        ])}>
                        {'Set out of office'}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={handleClick}>
                    <View
                        style={_style([
                            {
                                width: 57,
                                height: 33,
                                backgroundColor: flag === true ? '#54E5FF' : '#ABABAB',
                                borderRadius: 20,
                                padding: 1.5,
                            },
                            _flexCol,
                            {
                                alignItems: flag === true ? 'flex-end' : 'flex-start'
                            },
                        ])}>
                        <View
                            style={_style([
                                {
                                    width: 30,
                                    height: 30,
                                    backgroundColor: colors.$white,
                                    borderRadius: 15,
                                }
                            ])}>
                            
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default CSetOutOffice;
