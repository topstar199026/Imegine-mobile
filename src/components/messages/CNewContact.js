import { useNavigation } from '@react-navigation/core';
import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;

import {colors, fonts} from 'src/assets/themes';
import { _center, _font, _size, _style } from 'src/modules/Style';

var styles = StyleSheet.create({
    container: {
        width: 152,
        height: 38,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        marginTop: 9,
        marginBottom: 9,
        marginLeft: 2,
        marginRight: 2,

        display: 'flex',
        flexDirection: 'row',

        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 6,
    },
});

const CNewContact = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity 
            onPress={() => {
                if(props.action.length === 1) navigation.navigate(props.action[0]);
                else navigation.navigate(props.action[0], props.action[1]);
            }}>
            <View style={_style([
                    styles.container, 
                    props.style,
                    {
                        marginLeft: props.id * 1 > 0 ? 10 : 4,
                        marginRight: 4,
                    },
                ])}>
                <View
                    style={_style([
                        _center,
                    ])}>
                    <Image style={_style([_size(24, 24)])} source={props.image} />
                </View>
                <View
                    style={_style([
                        {
                            paddingLeft: 10,
                        }
                    ])}>
                    <Text
                        style={_style([
                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 15)
                        ])}>
                        {props.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CNewContact;
