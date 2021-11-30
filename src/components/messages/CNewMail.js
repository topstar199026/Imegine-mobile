import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _centerH, _font, _size, _style } from 'src/modules/Style';
import { textAlign } from 'styled-system';

var styles = StyleSheet.create({
});

const CNewMail = (props) => {

    const onPress = () => {
        props.onPress && props.onPress();
    }

    return (
        <View style={{
                position: 'absolute',
                bottom: 20,
                height: 60,
                width: '100%',
                alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => onPress()}>
                <View style={_style([
                        _center,
                        _size(185, 60),
                        {
                            borderRadius: 30,
                            backgroundColor: '#54E5FF',
                            shadowColor: colors.$secondaryBlue,
                            shadowOffset: {
                                width: 11,
                                height: 11,
                            },
                            shadowOpacity: 0.9,
                            shadowRadius: 55,        
                            elevation: 25,
                        }
                    ])}>
                    <Text style={_style([
                            _font(fonts.$rubikMedium, colors.$secondaryBlue, 16)
                        ])}>
                        {'New R-Mail'}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CNewMail;
