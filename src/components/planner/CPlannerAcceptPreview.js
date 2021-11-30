import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;

import {colors, fonts, images} from 'src/assets/themes';

var styles = StyleSheet.create({
});

const CPlannerAcceptPreview = (props) => {
    return (
        <View>
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
                        width: 30,
                    }}>
                    <TouchableOpacity>
                        <View
                            style={{
                                width: 25,
                                height: 25,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Image source={images.starGreenMessage} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: 30,
                    }}>
                    <TouchableOpacity>
                        <View
                            style={{
                                width: 25,
                                height: 25,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Image source={images.starGreenMessage} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: 30,
                    }}>
                    <TouchableOpacity>
                        <View
                            style={{
                                width: 25,
                                height: 25,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Image source={images.starGreenMessage} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: 30,
                    }}>
                    <TouchableOpacity>
                        <View
                            style={{
                                width: 25,
                                height: 25,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Image source={images.starGreenMessage} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: 30,
                    }}>
                    <TouchableOpacity>
                        <View
                            style={{
                                width: 25,
                                height: 25,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Image source={images.starBlank} />
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View>
            <View
                style={{
                    marginTop: 12,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <View>
                    <Text
                        style={{
                            fontFamily: fonts.$robotMedium,
                            color: colors.$secondaryBlue,
                            fontSize: 13,
                            marginRight: 5,
                        }}>
                        {'4.6'}
                    </Text>
                </View>
                <View>
                    <Image source={images.starBlueFillMessage} />
                </View>
            </View>
        </View>
    );
};

export default CPlannerAcceptPreview;
