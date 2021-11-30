import { View } from 'native-base';
import React from 'react';
import {Image, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({
    
});

const CChatBotActionButton = (props) => {
    return (
        <TouchableOpacity onPress={() =>  props.onActionPress()}>
            <View 
                style={{
                    height: 34,
                    borderRadius: 10,
                    borderColor: '#B2B2B2',
                    borderWidth: 2,
                    width: wp(80),
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text
                    style={{
                        fontFamily: fonts.$rubikMedium,
                        color: colors.$secondaryBlue,
                        fontSize: 17,
                    }}>
                    {props.label}
                </Text>
            </View>
        </TouchableOpacity>
        
    );
};

export default CChatBotActionButton;
