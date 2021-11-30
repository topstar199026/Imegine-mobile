import { View } from 'native-base';
import React, {useState} from 'react';
import {Text, TextInput, StyleSheet, Image, TouchableOpacity} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _font, _style } from 'src/modules/Style';

var styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
    },
    inputPassword: {
        borderBottomWidth: 1,
        borderBottomColor: '#0291CA',
        backgroundColor: colors.$transparent,
        padding: 0,
        paddingLeft: 5,
        paddingRight: 5,
        width: '100%',
        fontFamily: fonts.$rubikMedium,
        fontSize: 17,
        color: colors.$secondaryBlue
    }
});

const CLableInput = (props) => {

    const [v, setV] = useState('');

    const handleChange = (t) => {
        props.handleChange && props.handleChange(t);
        props.handleChange || setV(t);
    }

    return (
        <View style={[styles.container, props.styles]}>
            {
                props.noLabel && props.noLabel === true ?
                <></>
                :
                <View
                    style={_style([
                        {
                            width: 100,
                            paddingTop: 4,
                        },
                    ])}>
                    <Text
                        style={_style([
                            _font(fonts.$rubikMedium, colors.$secondaryBlue, 17)
                        ])}>
                        {props.label || ''}
                    </Text>
                </View>
            }            
            <View
                style={_style([
                    {
                        flex: 1,
                    },
                ])}>
                <TextInput
                    placeholder={props.placeholder || "Password"}
                    style={styles.inputPassword}
                    onChangeText={t => handleChange(t)}
                    value={props.value || v}
                    underlineColorAndroid={colors.$transparent}
                />
            </View>
            
        </View>
    );
};

export default CLableInput;
