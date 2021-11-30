import { View } from 'native-base';
import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {colors, images} from 'src/assets/themes';
import { _center, _size, _style } from 'src/modules/Style';

var styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 57,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        backgroundColor: colors.$white,
        display: 'flex',
        flexDirection: 'row',
        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 11,
            height: 11,
        },
        shadowOpacity: 0.9,
        shadowRadius: 55,        
        elevation: 25,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const CBottomEmailDetailBar = (props) => {

    return (
        <View 
            style={_style([
                styles.bottomBar
            ])}>
            <View
                style={_style([
                    styles.tab, 
                    {width: 60}
                ])}>
                <TouchableOpacity>
                    <View
                        style={_style([
                            {
                            },
                            _size(24, 24),
                            _center,
                        ])}>
                        <Image source={images.size4.message.eraseBlue4x} style={_style([_size(24, 24)])} />
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={_style([
                    styles.tab, 
                    {flex: 1}
                ])}>
                <TouchableOpacity>
                    <View
                        style={_style([
                            {
                            },
                            _size(24, 24),
                            _center,
                        ])}>
                        <Image source={images.size4.message.prevBlue4x} style={_style([_size(24, 24)])} />
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={_style([
                    styles.tab, 
                    {width: 60}
                ])}>
                <TouchableOpacity>
                    <View
                       style={_style([
                            {
                            },
                            _size(24, 24),
                            _center,
                        ])}>
                        <Image source={images.size4.message.nextBlue4x} style={_style([_size(24, 24)])} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CBottomEmailDetailBar;
