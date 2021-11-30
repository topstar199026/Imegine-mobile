import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({
    
    button: {
        marginTop: hp(30),
        borderRadius: 28,
        height: 56,
        width: wp(80),
        backgroundColor: '#54E5FF',
        padding: 11,
        textAlign: 'center',
        fontFamily: fonts.$robotBold,
        fontSize: 23,
        color: colors.$white,
        
    }
});

const CButton = (props) => {


    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            <Text style={[styles.button, props.styles]}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
};

export default CButton;
