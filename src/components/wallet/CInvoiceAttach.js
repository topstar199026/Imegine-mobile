import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flexCol, _flexRow, _font, _style } from 'src/modules/Style';
import { style } from 'styled-system';

var styles = StyleSheet.create({
    
});

const CInvoiceAttach = (props) => {

    return (
        <View
            style={_style([
                {
                    paddingTop: 15,
                },
                _flexCol,
            ])}>
            <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => {
                    
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
                                paddingTop: 5,
                            },
                        ])}>
                        <Image source={images.plannerPage.attachBlue} />
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
                            {'Attachments'}
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <View
                            style={_style([
                                {
                                    // width: 120,
                                }
                            ])}>
                            <Text
                                style={_style([{
                                        marginTop: 2,
                                        paddingLeft: 10,
                                    },
                                    _font(fonts.$rubikRegular, colors.$secondaryBlue, 17)
                                ])}>
                                {'+ Add'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CInvoiceAttach;
