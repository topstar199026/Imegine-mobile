import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flex, _flexRow, _font, _size, _style } from 'src/modules/Style';

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

const CWalletUpcoming = (props) => {
    return (
        <>
        
            <View style={[styles.titleContainer]}>
                <View>
                    <Text
                        style={_style([
                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 15)
                        ])}>
                        {'Upcoming events'}
                    </Text>
                </View>
                <View style={{flex: 1}}></View>
                <View>
                    <Text
                        style={_style([
                            _font(fonts.$rubikBold, colors.$secondaryBlue, 15)
                        ])}>
                        {/* {'View more'} */}
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => props.onPress()}>
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
                            <Image style={_size(24, 24)} source={images.size4.wallet.eventBlue4x} />
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
                                    _font(fonts.$rubikRegular, colors.$secondaryBlue, 11)
                                ])}>
                                {'Boarding pass'}
                            </Text>
                            <Text
                                style={_style([
                                    _font(fonts.$rubikRegular, colors.$secondaryBlue, 17)
                                ])}>
                                {'Train to France'}
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
                                {'AUG 30'}
                            </Text>
                        </View>
                        <View
                            style={_style([
                                {
                                    // width: 40,
                                    paddingLeft: 5,
                                },
                                _center,
                            ])}>
                            <Image style={_size(24, 24)} source={images.size4.wallet.upcomingGray4x_1} />
                        </View>
                    </View>
                </View>            
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.onPress()}>
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
                            <Image style={_size(24, 24)} source={images.size4.wallet.eventBlue4x} />
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
                                    _font(fonts.$rubikRegular, colors.$secondaryBlue, 11)
                                ])}>
                                {'Boarding pass'}
                            </Text>
                            <Text
                                style={_style([
                                    _font(fonts.$rubikRegular, colors.$secondaryBlue, 17)
                                ])}>
                                {'Train to France'}
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
                                {'AUG 30'}
                            </Text>
                        </View>
                        <View
                            style={_style([
                                {
                                    // width: 40,
                                    paddingLeft: 5,
                                },
                                _center,
                            ])}>
                            <Image style={_size(24, 24)} source={images.size4.wallet.upcomingGray4x_1} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};

export default CWalletUpcoming;
