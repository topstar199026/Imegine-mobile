import React, { useEffect, useState, useRef } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image, TouchableOpacity} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Signature from 'react-native-signature-canvas';
import {Dirs, FileSystem} from 'react-native-file-access';

import {colors, fonts, images} from 'src/assets/themes';
import CTopWalletInvoiceDetailBar from 'src/components/bar/CTopWalletInvoiceDetailBar';
import CButton from 'src/components/CButton';

var styles = StyleSheet.create({
    
});

const style =
            `
                .m-signature-pad {
                    box-shadow: none; 
                    border: none; 
                    border-radius: 7px;
                    background-color: #F6F6F6;
                } 
                .m-signature-pad--body {border: none;}
                .m-signature-pad--footer {display: none; margin: 0px;}
                html, body {height: 300px; }
            `;

const WalletSignManually = () => {
    const navigation = useNavigation();

    const cachePath = `${Dirs.CacheDir}/sign.png`;

    const [signWithVisible, setSignWithVisible] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [signature, setSign] = useState(null);

    const signRef = useRef();

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    const switchHome =(action) => {
        navigation.navigate(action);
    }

    const closeSignWithModal = (type) => {
        toggleSignWithModal();
        switch (type) {
            case '':
                break;
            case 'fingerprint':

                break;
            case 'manually':

                break;
            default:
                break;
        }
    }

    const toggleSignWithModal = () => {
        setSignWithVisible(!signWithVisible);
    }

    const clearSignHandle = () => {
        // @ts-ignore
        signRef.current.clearSignature();
    }

    const handleOK = (signature) => {
        // console.log('signature', signature);
        navigation.navigate('WalletSignedManually', {
            signData: signature
        });
        // FileSystem.writeFile(
        //     cachePath, 
        //     signature.replace('data:image/png;base64,', ''),
        //     'base64'
        // ).then(() => console.log(FileSystem.exists(cachePath)))
        // .then((res) =>{
        //     console.log('res----', res);
        //     navigation.navigate('WalletSignedManually');
        // });
        // setSign(signature);
    };

    const onPress =() => {
        // @ts-ignore
        signRef.current.readSignature();
    }    

    return (
        <SafeAreaView>
            <StatusBar />
            <View
                style={{
                    alignItems: 'center'  ,
                    height: '100%',
                    paddingTop: 70,
                    paddingBottom: 70,
                }}
                >
                <CTopWalletInvoiceDetailBar navigation={navigation} />
                <View
                    style={{
                        width: wp(100),
                        paddingTop: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // paddingBottom: 47,
                    }}>
                    <ScrollView
                        scrollEnabled={scrollEnabled}>
                        <View
                            style={{
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
                            }}>
                            <TouchableOpacity>
                                <View>
                                    <Image style={{width: 14, height: 14,}} source={images.closeWallet} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Image source={images.fingerHandWallet} />
                                </View>
                            </TouchableOpacity>
                            <View
                                style={{
                                    marginTop: 8,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikMedium,
                                        fontSize: 14,
                                        color: colors.$textSecondary,
                                    }}>
                                    {'Use your finger to sign'}
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginTop: 25,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 300,
                                }}>                                
                                <View
                                    style={{
                                        position: 'absolute',
                                        right: 15,
                                        top: 15,
                                        zIndex: 5,
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => clearSignHandle()}>
                                        <Image source={images.refresh} />
                                    </TouchableOpacity>
                                </View>
                                <Signature 
                                    ref={signRef}
                                    webStyle={style}
                                    onBegin={() => setScrollEnabled(false)}
                                    onEnd={() => setScrollEnabled(true)}
                                    onOK={handleOK}
                                    dotSize={5}
                                    penColor={colors.$textSecondary}
                                    // bgWidth={300}
                                    bgHeight={300}
                                />
                            </View>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <CButton
                                    styles={{
                                        marginTop: 20,
                                        width: 80,
                                        height: 35,
                                        fontFamily: fonts.$robotMedium,
                                        fontSize: 15,
                                        padding: 7,
                                    }}
                                    onPress={() => onPress()}>
                                    {'Done'}
                                </CButton>
                            </View>

                            
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WalletSignManually