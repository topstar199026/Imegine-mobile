import React, { useEffect, useState } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image, TouchableOpacity} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import {colors, fonts, images} from 'src/assets/themes';
import CTopWalletInvoiceDetailBar from 'src/components/bar/CTopWalletInvoiceDetailBar';
import CBottomBar from 'src/components/bar/CBottomBar';
import CGoBackButton from 'src/components/wallet/CGoBackButton';
import CSignWithModal from 'src/components/modal/CSignWithModal';
import CFingerPrintSignModal from 'src/components/modal/CFingerPrintSignModal';
import { _center, _flexRow, _font, _size, _style } from 'src/modules/Style';

var styles = StyleSheet.create({    
});



const WalletInvoiceDetail = (props) => {
    const navigation = useNavigation();

    const [signWithVisible, setSignWithVisible] = useState(false);
    const [fingerVisible, setFingerVisible] = useState(false);
    
    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    const switchHome =(action) => {
        navigation.navigate(action);
    }

    const closeFingerPrintSigModal = () => {
        toggleFingerSignModalModal();
    }
    const closeSignWithModal = (type) => {
        toggleSignWithModal();
        switch (type) {
            case '':
                break;
            case 'fingerprint':
                toggleFingerSignModalModal();
                break;
            case 'manually':
                navigation.navigate('WalletSignManually');
                break;
            default:
                break;
        }
    }

    const toggleSignWithModal = () => {
        setSignWithVisible(!signWithVisible);
    }

    const toggleFingerSignModalModal = () => {
        setFingerVisible(!fingerVisible);
    }

    const onPress =(item) => {
       
    }    

    return (
        <SafeAreaView>
            <StatusBar />
            <View
                style={_style([
                    {
                        alignItems: 'center'  ,
                        height: '100%',
                        paddingTop: 70,
                        paddingBottom: 70,
                    }
                ])}
                >
                <CTopWalletInvoiceDetailBar navigation={navigation} />
                <View
                    style={_style([
                        {
                            width: wp(100),
                            paddingTop: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // paddingBottom: 47,
                        }
                    ])}>
                    <ScrollView>
                        <View
                            style={_style([
                                {
                                    borderRadius: 10,
                                    width: wp(97),
                                    backgroundColor: colors.$white,
                                    shadowColor: colors.$bubbles,
                                    shadowOffset: {
                                        width: 4,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 10,
                                    
                                    elevation: 3,
                                    // height: 900,
                                    padding: wp(5),
                                    paddingTop: 30,
                                }
                            ])}>
                            <View>
                                <Text
                                    style={_style([{
                                        },
                                        _font(fonts.$rubikMedium, colors.$secondaryBlue, 17)
                                    ])}>
                                    {'Pablo Zehle'}
                                </Text>
                                <Text
                                    style={_style([{
                                        },
                                        _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                                    ])}>
                                    {'Lorem ipsum dolor sit'}
                                </Text>
                            </View>
                            <View
                                style={_style([
                                    {
                                        alignItems: 'flex-end',
                                    }
                                ])}>
                                <Text
                                    style={_style([
                                        {
                                            marginTop: 15,
                                        },
                                        _font(fonts.$rubikMedium, colors.$secondaryBlue, 15)
                                    ])}>
                                    {'Invoice 43435323432332'}
                                </Text>
                                <Text
                                    style={_style([
                                        {
                                            marginTop: 15,
                                        },
                                        _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                                    ])}>
                                    {'Date 06/04/2021'}
                                </Text>
                            </View>
                            <View 
                                style={_style([
                                    {
                                        marginTop: 12,
                                        borderWidth: 1,
                                        borderColor: '#000000',
                                        opacity: 0.16,
                                    }
                                ])}
                            />
                            <View>
                                <View
                                    style={_style([
                                        {
                                            marginTop: 15,
                                        },
                                        _flexRow,
                                    ])}>
                                    <View
                                        style={_style([
                                            {
                                                flex: 1,
                                            }
                                        ])}>
                                        <Text
                                            style={_style([
                                                {
                                                    marginTop: 15,
                                                },
                                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                                            ])}>
                                            {'App design'}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={_style([
                                                {
                                                },
                                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                                            ])}>
                                            {'$350.00'}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={_style([
                                        {
                                            marginTop: 15,
                                        },
                                        _flexRow,
                                    ])}>
                                    <View
                                        style={_style([
                                            {
                                                flex: 1,
                                            }
                                        ])}>
                                        <Text
                                            style={_style([
                                                {
                                                },
                                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                                            ])}>
                                            {'App Development'}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={_style([
                                                {
                                                },
                                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                                            ])}>
                                            {'$1750.00'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={_style([
                                    {
                                        paddingLeft: wp(40),
                                    }
                                ])}>
                                <View
                                    style={_style([
                                        {
                                            marginTop: 30,
                                        },
                                        _flexRow,
                                    ])}>
                                    <View
                                        style={_style([
                                            {
                                                flex: 1,                                            
                                                alignItems: 'flex-end'
                                            }
                                        ])}>
                                        <Text
                                            style={_style([
                                                {
                                                },
                                                _font(fonts.$rubikMedium, colors.$secondaryBlue, 14)
                                            ])}>
                                            {'SubTotal:'}
                                        </Text>
                                    </View>
                                    <View
                                        style={_style([
                                            {
                                                width: 100,                                 
                                                alignItems: 'flex-end'
                                            }
                                        ])}>
                                        <Text
                                            style={_style([
                                                {
                                                },
                                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                                            ])}>
                                            {'$1350.00'}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={_style([
                                        {
                                            marginTop: 15,
                                        },
                                        _flexRow,
                                    ])}>
                                    <View
                                        style={_style([
                                            {
                                                flex: 1,
                                                alignItems: 'flex-end'
                                            }
                                        ])}>
                                        <Text
                                            style={_style([
                                                {
                                                },
                                                _font(fonts.$rubikMedium, colors.$secondaryBlue, 15)
                                            ])}>
                                            {'Tax:'}
                                        </Text>
                                    </View>
                                    <View
                                        style={_style([
                                            {
                                                width: 100,                                 
                                                alignItems: 'flex-end'
                                            }
                                        ])}>
                                        <Text
                                            style={_style([
                                                {
                                                },
                                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                                            ])}>
                                            {'$1350.00'}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={_style([
                                        {
                                            marginTop: 30,
                                        },
                                        _flexRow,
                                    ])}>
                                    <View
                                        style={_style([
                                            {
                                                flex: 1,
                                                alignItems: 'flex-end'
                                            }
                                        ])}>
                                        <Text
                                            style={_style([
                                                {
                                                },
                                                _font(fonts.$rubikMedium, colors.$secondaryBlue, 17)
                                            ])}>
                                            {'Total:'}
                                        </Text>
                                    </View>
                                    <View
                                        style={_style([
                                            {
                                                width: 100,                                 
                                                alignItems: 'flex-end'
                                            }
                                        ])}>
                                        <Text
                                            style={_style([
                                                {
                                                },
                                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 17)
                                            ])}>
                                            {'$1350.00'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={_style([
                                    {
                                    },
                                    _center,
                                ])}>
                                <TouchableOpacity onPress={() => toggleSignWithModal()}>
                                    <View
                                        style={_style([
                                            {
                                                marginTop: 89,
                                                borderRadius: 28,
                                                backgroundColor: '#54E5FF',
                                            },
                                            _size(56, 56),
                                            _center,
                                        ])}>
                                        <Image style={{width: 24, height: 24,}} source={images.fingerWhite4Wallet} />
                                    </View>
                                </TouchableOpacity>
                                <View
                                    style={_style([
                                        {
                                            marginTop: 6,
                                        }
                                    ])}>
                                    <Text
                                        style={_style([
                                            {
                                            },
                                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                                        ])}>
                                        {'Tap here to sign'}
                                    </Text>
                                </View>
                                <View 
                                    style={_style([
                                        {
                                            marginTop: 10,
                                            width: wp(50),
                                            borderWidth: 0.5,
                                            borderColor: '#707070',
                                        }
                                    ])}
                                />
                                <View
                                    style={_style([                                        
                                        _center
                                    ])}>
                                    <Text
                                        style={_style([
                                            {
                                                marginTop: 9,
                                            },
                                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 17)
                                        ])}>
                                        {'Jose Luis Garcia'}
                                    </Text>
                                    <Text
                                        style={_style([
                                            {
                                            },
                                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                                        ])}>
                                        {'ID: '}{'ES2343423435434'}
                                    </Text>
                                </View>
                                <View
                                    style={_style([
                                        {
                                            marginTop: 48,
                                        }
                                    ])}>
                                    <CGoBackButton onPress={() => {
                                        navigation.goBack()
                                        }}>
                                        {'GO BACK'}
                                    </CGoBackButton>
                                </View>
                            </View>
                            
                        </View>
                    </ScrollView>
                </View>
                <CBottomBar active={'Wallet'} switchHome={(action) => switchHome(action)} />
                <CSignWithModal 
                    visible={signWithVisible} 
                    handleModalClose={(type) => closeSignWithModal(type)}    
                />
                <CFingerPrintSignModal 
                    visible={fingerVisible} 
                    handleModalClose={() => closeFingerPrintSigModal()}    
                />                
            </View>
        </SafeAreaView>
    )
}

export default WalletInvoiceDetail