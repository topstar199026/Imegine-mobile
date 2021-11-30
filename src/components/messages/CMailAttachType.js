import { View } from 'native-base';
import React, { useState } from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flexCol, _font, _style } from 'src/modules/Style';
import { textAlign } from 'styled-system';

var styles = StyleSheet.create({
    container: {
        width: 68,
        height: 68,
        borderRadius: 10,

        display: 'flex',
        flexDirection: 'column',

        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 2,

        // padding: 17,
        
    },
});

const CMailAttachType = (props) => {
    
    const {item} = props.data;
    console.log(item)

    return (
        <TouchableOpacity onPress={() => props.onPress(item.id)}>
            <View style={_style([
                    styles.container, props.style, 
                    {
                        marginLeft: 5,
                        marginRight: 5,
                        backgroundColor: props.currentType === item.id ? colors.$secondaryBlue : '#54E5FF',
                    },
                    _flexCol,
                    _center,
                ])}>
                <View
                    style={{
                    }}>
                    <Image source={props.currentType === item.id ? item.icon[1] : item.icon[0]} />
                </View>
                <View>
                    <Text
                        style={_style([{
                                marginTop: 5,
                            },
                            _font(fonts.$rubikMedium,  props.currentType === item.id ? colors.$white : colors.$secondaryBlue, 10)
                        ])}>
                        {item.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CMailAttachType;
