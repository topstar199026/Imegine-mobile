import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import {Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, Keyboard} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import { ContactActions } from 'src/actions';
import {colors, images, fonts} from 'src/assets/themes';
import { _flexRow, _font, _style } from 'src/modules/Style';
import { textAlign } from 'styled-system';
import CContactGroupItem from './CContactGroupItem';
import CContactSelectItem from './CContactSelectItem';
import * as Utils from 'src/modules/Toast';

var styles = StyleSheet.create({    
});

const CMailContactItem = (props) => {

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
  

    return (
        <View
            style={_style([
                {
                },
            ])}>
            <View
                style={_style([
                    {
                        width: '100%',
                        paddingTop: 15,
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingBottom: 10,
                        // borderWidth: 1,
                        // borderColor: 'red',
                        borderBottomWidth: 1,
                        borderColor: 'rgba(185, 185, 185, 0.5)',
                    },
                    _flexRow,
                ])}>
                <View
                    style={_style([
                        {
                            width: 70,
                            paddingTop: 2,
                        },
                    ])}>
                    <Text
                        style={_style([
                            _font(fonts.$rubikRegular, '#B2B2B2', 15),
                        ])}>
                        {'Subject'}
                    </Text>
                </View>
                <View
                    style={_style([
                        {
                            flex: 1,
                            flexWrap: 'wrap',
                        },
                        _flexRow,

                    ])}>
                    <TextInput 
                        style={_style([
                            {
                                padding: 0,
                                height: 25,
                                // borderColor: 'blue',
                                // borderWidth: 1,
                                flex: 1,
                                minWidth: '30%',
                                paddingLeft: 5,
                                paddingRight: 5,
                            },
                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 15),
                        ])}
                        placeholder={"..."}  
                        value={props.subject}
                        onChangeText={(t) => props.handleSubject(t)}
                    />
                </View>
                
                
            </View>
        </View>
    );
};

export default CMailContactItem;
