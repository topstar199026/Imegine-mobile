import { View } from 'native-base';
import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from "react-native" ;
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _font, _size, _style } from 'src/modules/Style';

var styles = StyleSheet.create({
    title: {
        flex: 1,
        paddingLeft: 17,
    },
    search2: {
        width: 24,
        height: 29,
        paddingTop: 5,
    },
    listCheck: {
        width: 24,
        height: 24,
        marginRight: 16,
        marginLeft: 24,
    }
});
const CTopWalletInvoiceBar = (props) => {
    return (
        <>
            <View style={styles.title}>
                <Text 
                    style={_style([
                        {
                        },
                        _font(fonts.$rubikMedium, colors.$secondaryBlue, 19)
                    ])}>
                    {'Invoices'}
                </Text>
            </View>
            <TouchableOpacity onPress={()=>{}}>
                <View 
                    style={_style([
                        {
                            width: 40,
                            paddingRight: 10
                        }
                    ])}>
                    <Image source={images.size4.topBar.wallet.qrBlue4x} style={_style([_size(24, 24)])} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
                <View 
                    style={_style([
                        {
                            width: 40,
                            paddingRight: 10
                        }
                    ])}>
                    <Image source={images.size4.common.searchBlue4x} style={_style([_size(24, 24)])} />
                </View>
            </TouchableOpacity>
        </>
    );
};

export default CTopWalletInvoiceBar;
