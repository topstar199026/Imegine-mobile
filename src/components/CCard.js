import React, { useState } from 'react';
import {Text, View, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({
    
    cardContainer: {
        borderRadius: 20,
        width: '100%',
        backgroundColor: colors.$white,
        shadowColor: colors.$white,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 55,
        
        elevation: 2,
    }
});

const CCard = (props) => {

    return (
        <View
            style={[styles.cardContainer, props.styles]}>
            {props.children}
        </View>
    );
};

export default CCard;
