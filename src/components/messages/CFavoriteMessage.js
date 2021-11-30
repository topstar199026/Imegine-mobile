import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { textAlign } from 'styled-system';

var styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 49,
        borderRadius: 20,
        alignItems: 'center',
        // justifyContent: 'center',
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
        elevation: 12,
    },
});

const CFavoriteMessage = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            <View style={[styles.container, props.style]}>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                    }}>
                    <Image style={{width: 17, height: 17,}} source={images.starYellow2Message} />
                </View>
                <View
                    style={{
                        flex: 1,
                    }}>
                    <Text
                        style={{
                            fontFamily: fonts.$rubikRegular,
                            color: colors.$secondaryBlue,
                            fontSize: 15,
                        }}>
                        {'Favorite messages'}
                    </Text>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                    }}>
                    <Image source={images.next} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CFavoriteMessage;
