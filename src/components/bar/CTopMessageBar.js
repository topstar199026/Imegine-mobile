import { View } from 'native-base';
import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from "react-native" ;
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import {colors, images, fonts} from 'src/assets/themes';
import { _font, _size, _style } from 'src/modules/Style';

var styles = StyleSheet.create({
    title: {
        flex: 1,
        paddingLeft: wp(5),
        justifyContent: 'center',
    },
});

const CTopMessageBar = (props) => {

    const navigation = useNavigation();

    const addNewChat = () => {
        navigation.navigate('SendMessage', {screen: 'NewChat'});
    }

    return (
        <>
            <View style={styles.title}>
                <Text 
                    style={_style([
                        {
                        },
                        _font(fonts.$rubikMedium, colors.$secondaryBlue, 19)
                    ])}>
                    {props.active}
                </Text>
            </View>
            <TouchableOpacity onPress={()=>{}}>
                <View 
                    style={_style([
                        {
                            width: 40,
                            paddingRight: 10
                        }
                    ])}>
                    <Image source={images.size4.topBar.message.qrBlue4x} style={_style([_size(24, 24)])} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addNewChat()}>
                <View 
                    style={_style([
                        {
                            width: 40,
                            paddingRight: 10
                        }
                    ])}>
                    <Image source={images.size4.topBar.message.penBlue4x} style={_style([_size(24, 24)])} />
                </View>
            </TouchableOpacity>
        </>
    );
};

export default CTopMessageBar;
