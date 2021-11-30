import { View } from 'native-base';
import React from 'react';
import {Image, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({
    
});

const CChatBotTitle = (props) => {
    return (
        <View
            style={{
                alignItems: 'center'  ,
            }}>
            <View>
                <Image source={images.botBlankMessage} />
            </View>
            <View style={{
                marginTop: 10,
                borderWidth: 0.5,
                borderColor: '#B2B2B2',
                width: wp(90),
            }} />
            <View
                style={{
                    marginTop: 10,
                    width: wp(80),
                    marginBottom: 10,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.$rubikRegular,
                        color: '#B2B2B2',
                        fontSize: 15,
                        textAlign: 'center'
                    }}>
                    {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr. Sed diam nonumy eirmod tempor invidunt ut labore.'}
                </Text>
            </View>
        </View>
        
    );
};

export default CChatBotTitle;
