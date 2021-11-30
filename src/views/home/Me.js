import React, { useEffect, useRef } from 'react';
import {Text, View, StyleSheet, StatusBar, TouchableOpacity, Image} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


import {colors, fonts, images} from 'src/assets/themes';
import { useNavigation } from '@react-navigation/native';

import CBottomBar from 'src/components/bar/CBottomBar';
import CTopBar from 'src/components/bar/CTopBar';
import CSearch from 'src/components/messages/CSearch';
import { useSelector } from 'react-redux';
import MainLayout from 'src/layouts';
import { DeviceActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import { _center, _flexCol, _flexRow, _font, _size, _style } from 'src/modules/Style';
import CFavoriteMessage from 'src/components/messages/CFavoriteMessage';

var styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 49,
        borderRadius: 20,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#F0F0F0',
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

const Me = () => {

    // @ts-ignore
    const controlBarPosition = useSelector(state => state.system.controlBarPosition);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    const navigation = useNavigation();
    const scanner = useRef();
    
    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    const onPress =(item) => {
        navigation.navigate('SendMessage');
    } 
    
    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    const onSuccess = e => {
        console.log('e.data', e.data)
        DeviceActions.deviceLink(rsa, {
            deviceId: e.data,
            key: rsa.public
        }, res => {
            if(res && res.status === true) {
                setTimeout(() => {
                    navigation.navigate('Main', {
                        screen: 'Message'
                    });
                }, 1000);
            }else if(res && res.status === false && res.error) {
                Utils.toast(1, res.error);
            }
        });

    };
    
    return (
        <MainLayout controlBarPosition={controlBarPosition} 
            active={'Me'}
            switchHome={(action) => switchHome(action)}>        
            <View
                style={[{
                    height: '100%',
                    paddingTop: 70,
                    paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                    paddingLeft: 10,
                    paddingRight: 10,
                }]}>
                <View
                    style={_style([
                       _flexCol, 
                    ])}>
                    <View
                        style={_style([
                            _center,
                        ])}>
                        <View
                            style={_style([
                                {
                                    borderRadius: 25,    
                                    backgroundColor: colors.$white,
                                    shadowColor: colors.$secondaryBlue,
                                    shadowOffset: {
                                        width: 4,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.9,
                                    shadowRadius: 55,                                    
                                    elevation: 3,
                                },
                                _size(150, 150),
                                _center,
                            ])}>
                            <TouchableOpacity onPress={() => {}}>
                                <Image 
                                    style={_style([
                                        {},
                                        _size(148, 148),
                                    ])}
                                    source={images.bot} />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={_style([
                                {
                                    marginTop: 16,
                                }
                            ])}>
                            <Text
                                style={_style([
                                    _font(fonts.$rubikBold, colors.$secondaryBlue, 24, 31)
                                ])}>
                                {'Galina'}
                            </Text>
                        </View>
                        <View
                            style={_style([
                                {
                                    marginTop: 3,
                                },
                                _flexRow,
                            ])}>
                            <Text
                                style={_style([
                                    {
                                        paddingRight: 15,
                                    },
                                    _font(fonts.$rubikRegular, colors.$secondaryBlue, 13, 17)
                                ])}>
                                {'ID : DE4549304520'}
                            </Text>
                            <TouchableOpacity onPress={() => {}}>
                                <Image 
                                    style={_style([
                                        {},
                                        _size(16, 19),
                                    ])}
                                    source={images.me.copyBlue} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={_style([
                            {
                                marginTop: 35,
                            },
                            _center,
                        ])}>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={[styles.container]}>
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
                    </View>
                    <View
                        style={_style([
                            {
                                marginTop: 8,
                            },
                            _center,
                        ])}>
                        <TouchableOpacity onPress={() => {
                                navigation.navigate('MePage', {screen: 'AccountInfo'});
                            }}>
                            <View style={[styles.container]}>
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
                                        {'Account'}
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
                    </View>
                    <View
                        style={_style([
                            {
                                marginTop: 8,
                            },
                            _center,
                        ])}>
                        <TouchableOpacity onPress={() => {
                                navigation.navigate('MePage', {screen: 'LinkDevice'});
                            }}>
                            <View style={[styles.container]}>
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
                                        {'Devices'}
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
                    </View>
                    <View
                        style={_style([
                            {
                                marginTop: 8,
                            },
                            _center,
                        ])}>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={[styles.container]}>
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
                                        {'Messenger'}
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
                    </View>
                    <View
                        style={_style([
                            {
                                marginTop: 8,
                            },
                            _center,
                        ])}>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={[styles.container]}>
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
                                        {'Back Up'}
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
                    </View>
                </View>
                {/* <QRCodeScanner
                    ref={scanner}
                    onRead={onSuccess}
                    // reactivate={true}
                    // flashMode={RNCamera.Constants.FlashMode.torch}
                    // topContent={
                    // <Text style={styles.centerText}>
                    //     Go to{' '}
                    //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                    //     your computer and scan the QR code.
                    // </Text>
                    // }
                    // bottomContent={
                    // <TouchableOpacity style={styles.buttonTouchable}>
                    //     <Text style={styles.buttonText}>OK. Got it!</Text>
                    // </TouchableOpacity>
                    // }
                /> */}
            </View>      
        </MainLayout>
    )
}

export default Me