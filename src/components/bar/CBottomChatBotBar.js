import { View } from 'native-base';
import React from 'react';
import {Image, TouchableOpacity, StyleSheet, TextInput} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 79,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: wp(100),
        backgroundColor: colors.$white,
        display: 'flex',
        flexDirection: 'row',
        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 11,
            height: 11,
        },
        shadowOpacity: 0.9,
        shadowRadius: 55,        
        elevation: 25,
                alignItems: 'center',
                justifyContent: 'center',
    },
    input: {
        height: 28,
        backgroundColor: colors.$transparent,
        fontFamily: fonts.$rubikMedium,
        fontSize: 14,
        paddingTop: 0,
        paddingLeft: 15,
        color: colors.$secondaryBlue
    }
});

const CBottomChatBotBar = (props) => {
    return (
        <View style={[styles.bottomBar]}>
            <View style={{
                width: 57,
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                <TouchableOpacity>
                    <Image source={images.plus} />
                </TouchableOpacity>
            </View>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                <View
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        height: 38,
                        borderWidth: 3,
                        borderColor: colors.$secondaryBlue,
                    }}
                    >
                    <View style={{flex: 1, paddingTop: 11}}>
                        <TextInput 
                            placeholderTextColor={colors.$secondaryBlue}
                            placeholder={props.placeholder || "Type your message"}
                            style={styles.input}                
                            underlineColorAndroid={colors.$transparent}
                        />
                    </View>
                    <TouchableOpacity>
                        <View style={{width: 33}}>
                            <Image style={{}} source={images.audioRecordMessage} />

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{width: 33}}>
                            <Image style={{}} source={images.screen} />

                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                width: 74,
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                <TouchableOpacity>
                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#54E5FF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}>
                        <Image source={images.send} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CBottomChatBotBar;
