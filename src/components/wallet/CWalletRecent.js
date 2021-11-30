import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flex, _flexRow, _font, _size, _style } from 'src/modules/Style';
import { textAlign } from 'styled-system';

var styles = StyleSheet.create({
    titleContainer: {
        padding: 5,
        width: '98%',
        display: 'flex',
        flexDirection: 'row',
    },

    container: {
        width: '98%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        marginTop: 9,
        marginBottom: 9,
        marginLeft: 2,
        marginRight: 2,

        padding: 10,

        display: 'flex',
        flexDirection: 'column',

        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 12,
    },
});

const CWalletRecent = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            <View style={[styles.titleContainer]}>
                <View>
                    <Text
                        style={_style([
                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 15)
                        ])}>
                        {'Recent'}
                    </Text>
                </View>
                <View style={{flex: 1}}></View>
                <View>
                    <Text
                        style={_style([
                            _font(fonts.$rubikBold, colors.$secondaryBlue, 15)
                        ])}>
                        {'Show more'}
                    </Text>
                </View>
            </View>
            <View 
                style={[styles.container, props.style]}>
                <View
                    style={_style([{
                            paddingTop: 5,
                            paddingBottom: 5,
                        },
                        _flexRow,
                        _center,
                    ])}>
                    <View
                        style={_style([
                            {
                                // width: 40,
                            },
                            _center,
                        ])}>
                        <Image style={_size(24, 24)} source={images.size4.wallet.recent.recent0} />
                    </View>
                    <View
                        style={_style([
                            {
                                justifyContent: 'center',
                                flex: 1,
                                paddingLeft: 5,
                            }
                        ])}>
                        <Text
                            style={_style([
                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 22)
                            ])}>
                            {'Train pass'}
                        </Text>
                    </View>
                    <View
                        style={_style([{
                                // width: 100,
                            },
                            _center,
                        ])}>
                        <Text
                            style={_style([
                                {
                                    opacity: 0.4,
                                },
                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                            ])}>
                            {'JUN. 22 10:31'}
                        </Text>
                    </View>
                </View>

                <View
                    style={_style([{
                            paddingTop: 5,
                            paddingBottom: 5,
                        },
                        _flexRow,
                        _center,
                    ])}>
                    <View
                        style={_style([
                            {
                                // width: 40,
                            },
                            _center,
                        ])}>
                        <Image style={_size(24, 24)} source={images.size4.wallet.recent.recent1} />
                    </View>
                    <View
                        style={_style([
                            {
                                justifyContent: 'center',
                                flex: 1,
                                paddingLeft: 5,
                            }
                        ])}>
                        <Text
                            style={_style([
                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 22)
                            ])}>
                            {'Dinner Ticket'}
                        </Text>
                    </View>
                    <View
                        style={_style([{
                                // width: 100,
                            },
                            _center,
                        ])}>
                        <Text
                            style={_style([
                                {
                                    opacity: 0.4,
                                },
                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                            ])}>
                            {'JUN. 22 10:31'}
                        </Text>
                    </View>
                </View>

                <View
                    style={_style([{
                            paddingTop: 5,
                            paddingBottom: 5,
                        },
                        _flexRow,
                        _center,
                    ])}>
                    <View
                        style={_style([
                            {
                                // width: 40,
                            },
                            _center,
                        ])}>
                        <Image style={_size(24, 24)} source={images.size4.wallet.recent.recent2} />
                    </View>
                    <View
                        style={_style([
                            {
                                justifyContent: 'center',
                                flex: 1,
                                paddingLeft: 5,
                            }
                        ])}>
                        <Text
                            style={_style([
                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 22)
                            ])}>
                            {'Movie Discount'}
                        </Text>
                    </View>
                    <View
                        style={_style([{
                                // width: 100,
                            },
                            _center,
                        ])}>
                        <Text
                            style={_style([
                                {
                                    opacity: 0.4,
                                },
                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                            ])}>
                            {'JUN. 22 10:31'}
                        </Text>
                    </View>
                </View>
                
            </View>
        </TouchableOpacity>
    );
};

export default CWalletRecent;
