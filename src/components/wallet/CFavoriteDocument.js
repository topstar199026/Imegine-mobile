import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _font, _size, _style } from 'src/modules/Style';
import { textAlign } from 'styled-system';

var styles = StyleSheet.create({
    container: {
        width: '98%',
        height: 49,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        marginTop: 9,
        marginBottom: 9,
        marginLeft: 2,
        marginRight: 2,

        display: 'flex',
        flexDirection: 'row',

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

const CFavoriteDocument = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            <View style={[styles.container, props.style]}>
                <View
                    style={_style([{
                            width: 40,
                        },
                        _center
                    ])}>
                    <Image style={_size(16, 15)} source={images.size4.wallet.favoriteBlue4x} />
                </View>
                <View
                    style={{
                        flex: 1,
                    }}>
                    <Text
                        style={_style([
                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 15)
                        ])}>
                        {'Favorite documents'}
                    </Text>
                </View>
                <View
                    style={_style([{
                            width: 40,
                        },
                        _center
                    ])}>
                    <Image style={_size(7.4, 12)} source={images.size4.wallet.nextGray4x} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CFavoriteDocument;
