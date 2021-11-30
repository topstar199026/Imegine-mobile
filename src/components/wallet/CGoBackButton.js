import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({
    
    button: {
        borderRadius: 28,
        height: 34,
        width: 96,
        backgroundColor: '#E0E0E0',
        padding: 8,
        textAlign: 'center',
        fontFamily: fonts.$rubikMedium,
        fontSize: 15,
        color: colors.$secondaryBlue
    }
});

const CGoBackButton = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            <Text style={[styles.button, props.styles]}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
};

export default CGoBackButton;