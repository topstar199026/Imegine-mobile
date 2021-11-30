import { View } from 'native-base';
import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from "react-native" ;
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 57,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(100),
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
    title: {
        flex: 1,
        paddingLeft: wp(5),
        justifyContent: 'center',
    },
});
const CTopMessageBar = (props) => {
    return (
        <View style={[styles.topBar]}>
            <View style={styles.title}>
                <Text
                    style={{
                        fontFamily: fonts.$rubikMedium,
                        fontSize: 19,
                        color: colors.$secondaryBlue
                    }}
                    >
                    {props.active}
                </Text>
            </View>
            <TouchableOpacity onPress={()=>{}}>
                <View style={{
                    width: 40,
                    paddingRight: 10
                    }}>
                        <Image source={images.qr} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}}>
                <View style={{
                    width: 40,
                    paddingRight: 10
                    }}>
                        <Image source={images.edit} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CTopMessageBar;
