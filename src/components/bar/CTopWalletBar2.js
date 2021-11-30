import { View } from 'native-base';
import React from 'react';
import {Text, Image, StyleSheet} from "react-native" ;
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _font, _size, _style } from 'src/modules/Style';

var styles = StyleSheet.create({
    title: {
        flex: 1,
        paddingLeft: 17,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 16,
        marginLeft: 24,
    }
});
const CTopWalletBar2 = (props) => {
    return (
        <>
            <View style={styles.title}>
                <Text 
                    style={_style([
                        {
                        },
                        _font(fonts.$rubikMedium, colors.$secondaryBlue, 19)
                    ])}>
                    {props.active}
                </Text>
            </View>
            <TouchableOpacity>
                <View style={styles.icon}>
                    <Image source={images.size4.topBar.wallet.qrBlue4x} style={_style([_size(24, 24)])} />
                </View>
            </TouchableOpacity>
        </>
    );
};

export default CTopWalletBar2;
