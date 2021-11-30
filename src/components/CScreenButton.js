import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { textAlign } from 'styled-system';

var styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        bottom: 57,
        
        height: 57,
        width: 57,
        borderRadius: 28,
        backgroundColor: '#54E5FF',
        
        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 11,
            height: 11,
        },
        shadowOpacity: 0.9,
        shadowRadius: 55,        
        elevation: 25,
    },
    button: {        
        height: 56,
        width: 56,
        padding: 9,
        textAlign: 'center',
        color: colors.$white,
        fontFamily: fonts.$robotBold,
        fontSize: 28,
    }
});

const CScreenButton = (props) => {

    return (
        <View style={{
            position: 'absolute',
            bottom: 65,
            
            height: 57,
            width: 57,
            borderRadius: 28,
            backgroundColor: '#54E5FF',
            
            shadowColor: colors.$secondaryBlue,
            shadowOffset: {
                width: 11,
                height: 11,
            },
            shadowOpacity: 0.9,
            shadowRadius: 55,        
            elevation: 25,
        }}>
            <TouchableOpacity onPress={() => {}}>
                <View style={{
                    height: 57,
                    width: 57,
                    borderRadius: 28,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#54E5FF',
                    }}>
                    <Image source={images.screenShoot} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CScreenButton;
