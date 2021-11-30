import { View } from 'native-base';
import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from "react-native" ;

import {images} from 'src/assets/themes';

var styles = StyleSheet.create({
});

const CBusinessProfileAction = (props) => {
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
                        <Image source={images.boxWhiteMessage} />
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
                        <Image source={images.emailWhiteMessage} />
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
                        <Image source={images.phoneWhiteMessage} />
                    </View>
                </TouchableOpacity>
            </View>

        </View>

    );
};

export default CBusinessProfileAction;
