import { View } from 'native-base';
import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from "react-native" ;

import {images} from 'src/assets/themes';

var styles = StyleSheet.create({
});

const CBlockUserAction = (props) => {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
            }}>
            <View
                style={{
                    width: 60,
                }}>
                <TouchableOpacity>
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: '#54E5FF',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Image source={images.me.chatWhite} />
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    width: 60,
                }}>
                <TouchableOpacity>
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: '#54E5FF',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Image source={images.me.emailWhite} />
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    width: 60,
                }}>
                <TouchableOpacity>
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: '#54E5FF',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Image source={images.me.calendarWhite} />
                    </View>
                </TouchableOpacity>
            </View>

        </View>

    );
};

export default CBlockUserAction;
