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

const CMailAttachSelectItem = (props) => {
    const photo = props.photo.item;

    return (
        <View
            style={_style([
                {
                    padding: 5,
                },
            ])}>
            <TouchableOpacity onPress={() => props.onPress()}>
                <Image
                    style={{
                        width: 165,
                        height: 165,
                    }}
                    // @ts-ignore
                    source={{ uri: photo.node.image.uri }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default CMailAttachSelectItem;
