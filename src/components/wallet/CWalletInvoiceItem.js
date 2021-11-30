import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _font, _size, _style } from 'src/modules/Style';
import { textAlign } from 'styled-system';

var styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 13,
        backgroundColor: colors.$white,

        display: 'flex',
        flexDirection: 'row',

        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 2,

        alignItems: 'center',
        justifyContent: 'center',

        padding: 17,
        marginTop: 7,
        
    },
});

const CWalletInvoiceItem = (props) => {
    
    

    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            <View style={[styles.container, props.style, {
                    
                }]}>
                <View
                    style={{
                        flex: 1,
                    }}>
                    <Text
                        style={_style([{
                            },
                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 17)
                        ])}>
                        {'Pablo'}
                    </Text>
                </View>
                <View
                    style={_style([{
                            width: 80, 
                        },
                        _center
                    ])}>
                    <Text
                        style={_style([{
                                opacity: 0.4,
                            },
                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                        ])}>
                        {'JUN. 22'}
                    </Text>
                </View>
                <View
                    style={_style([{
                            width: 80, 
                        },
                        _center
                    ])}>
                    <Text
                        style={_style([{
                            },
                            _font(fonts.$rubikBold, colors.$secondaryBlue, 13)
                        ])}>
                        {'+$340.00'}
                    </Text>
                </View>
                {
                    props.finger &&
                    <View
                        style={{
                            width: 30,
                        }}>
                        <View
                            style={_style([{
                                    borderRadius: 11,
                                    backgroundColor: '#54E5FF',
                                },
                                _size(22, 22),
                                _center,
                            ])}>
                            <Image source={images.fingerWhiteWallet} />
                        </View>
                    </View>
                }                
                <View
                    style={_style([{
                            width: 30,
                        },
                        _center,
                    ])}>
                    <Image source={images.uploadWallet} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CWalletInvoiceItem;
