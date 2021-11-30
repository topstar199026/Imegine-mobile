import { View } from 'native-base';
import React, {useState} from 'react';
import {Text, TextInput, StyleSheet, Image, TouchableOpacity} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    eye: {
        width: 35,
        borderBottomWidth: 1,
        borderBottomColor: '#0291CA',
        paddingTop: 20,
        zIndex: 9999,
    },
    inputPassword: {
        borderBottomWidth: 1,
        borderBottomColor: '#0291CA',
        backgroundColor: colors.$transparent,
        width: wp(80),
        padding: 11,

        fontFamily: fonts.$robotBold,
        fontSize: 22,
        color: colors.$secondaryBlue
    }
});

const CIdInput = (props) => {

    const [v, setV] = useState('');
    const [sec, setSec] = useState(!(props.visible && props.visible === true));

    const handleChange = (t) => {
        props.handleChange && props.handleChange(t);
        props.handleChange || setV(t);
    }

    return (
        <View style={[styles.container, props.styles]}>
            <TextInput
                textContentType="password"
                placeholder={props.placeholder || "Password"}
                secureTextEntry={sec}
                style={styles.inputPassword}
                onChangeText={t => handleChange(t)}
                value={props.value || v}
                underlineColorAndroid={colors.$transparent}
            />
            {
                !(props.visible && props.visible === true) &&
                <View style={styles.eye}>
                    <TouchableOpacity onPress={() => {setSec(!sec)}}>
                        <Image 
                            resizeMode="stretch" 
                            style={{
                                width: 25,
                                height: 25,
                            }}
                            source={images.eye} 
                        />
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default CIdInput;
