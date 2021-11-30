import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;

import {colors, fonts, images} from 'src/assets/themes';

var styles = StyleSheet.create({
});

const CBusinessProfileImage = (props) => {
    return (
        <View>
            <Image 
                style={{
                    width: '100%',
                    borderRadius: 15,
                }} 
                source={images.businessProfile} 
            />
            <View
                style={{
                    width: '100%',
                    height: 80,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F0F0F0',
                    opacity: 0.5,
                    padding: 17,
                }}>                                    
            </View>
            <View
                style={{
                    width: '100%',
                    height: 80,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 17,
                }}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                    <View>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikBold,
                                color: colors.$secondaryBlue,
                                fontSize: 24,
                            }}>
                            {'Albert Johnson'}
                        </Text>
                    </View>
                    <View>
                        <Image source={images.checked} />
                    </View>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                    <Text
                        style={{
                            fontFamily: fonts.$rubikRegular,
                            color: colors.$secondaryBlue,
                            fontSize: 13,
                        }}>
                        {'User ID: ES2343242523523'}
                    </Text>
                </View>
            </View>
        </View>

    );
};

export default CBusinessProfileImage;
