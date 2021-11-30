import moment from 'moment';
import { StatusBar, View } from 'native-base';
import React, {memo, useEffect, useState} from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HTMLView from 'react-native-htmlview';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flex, _flexRow, _font, _size, _style } from 'src/modules/Style';
import CChatBotTitle from './CChatBotTitle';
import CTyping from './CTyping';


const CCheck = (props) => {

    const checked = props.checked;

    return (
        <View
            style={_style([
                {
                    marginTop: 3,
                },
                _size(22, 22),
            ])}>
            <View
                style={_style([
                    {
                        backgroundColor: checked ? '#54E5FF' : colors.$transparent,
                        borderColor: checked? colors.$transparent : colors.$secondaryBlue,
                        borderWidth: 1,
                        borderRadius: 11,
                    },
                    _size(22, 22),
                    _flex,
                    _center,
                ])}>
                <Image source={images.size4.message.checkWhite4x} style={_style([_size(13.6, 9.4)])} />
            </View>
        </View>
    );
};

export default CCheck;
