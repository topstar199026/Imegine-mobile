import React, { useEffect } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import {colors, fonts, images} from 'src/assets/themes';
import CTopWalletDetailBar from 'src/components/bar/CTopWalletDetailBar';
import CBottomBar from 'src/components/bar/CBottomBar';
import CScreenButton from 'src/components/CScreenButton';
import CWalletInvoiceItem from 'src/components/wallet/CWalletInvoiceItem';

var styles = StyleSheet.create({
    
});



const WalletFavorite = () => {
    const navigation = useNavigation();

    useEffect(async () => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    const switchHome =(action) => {
        navigation.navigate(action);
    }

    const onPress =(item) => {
       
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
                <CTopWalletDetailBar />
                <View
                    style={{
                        width: wp(100),
                        paddingTop: 15,
                        // paddingBottom: 47,
                    }}>
                    <ScrollView>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <View>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikRegular,
                                        fontSize: 14,
                                        color: colors.$textSecondary,
                                    }}>
                                    {'THIS MONTH'}
                                </Text>
                            </View>
                            <View
                                style={{
                                    paddingLeft: 15,
                                }}>
                                <Image source={images.downWallet} />
                            </View>
                        </View>
                        <View
                            style={{
                                marginTop: 15,
                                borderTopLeftRadius: 25,
                                borderTopRightRadius: 25,
                                width: wp(100),
                                backgroundColor: colors.$white,
                                shadowColor: colors.$secondaryBlue,
                                shadowOffset: {
                                    width: 4,
                                    height: 4,
                                },
                                shadowOpacity: 0.9,
                                shadowRadius: 55,
                                
                                elevation: 3,
                                // height: 900,
                                padding: wp(5)
                            }}>
                            <View>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikBold,
                                        fontSize: 18,
                                        color: colors.$text,
                                    }}>
                                    {'Invoices'}
                                </Text>
                            </View>
                            <View
                                style={{
                                    // paddingTop: 15,
                                }}>
                                <CWalletInvoiceItem finger={true} />
                                <CWalletInvoiceItem finger={true} />
                                <CWalletInvoiceItem finger={true} />
                                <CWalletInvoiceItem finger={true} />
                                <CWalletInvoiceItem finger={true} />
                            </View>
                            <View
                                style={{
                                    marginTop: 15,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikBold,
                                        fontSize: 18,
                                        color: colors.$text,
                                    }}>
                                    {'Tickets'}
                                </Text>
                            </View>
                            <View
                                style={{
                                    // paddingTop: 15,
                                }}>
                                <CWalletInvoiceItem finger={false} />
                                <CWalletInvoiceItem finger={false} />
                                <CWalletInvoiceItem finger={false} />
                            </View>
                            <View
                                style={{
                                    marginTop: 15,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikBold,
                                        fontSize: 18,
                                        color: colors.$text,
                                    }}>
                                    {'Contracts'}
                                </Text>
                            </View>
                            <View
                                style={{
                                    // paddingTop: 15,
                                }}>
                                <CWalletInvoiceItem finger={false} />
                                <CWalletInvoiceItem finger={false} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <CScreenButton />
                <CBottomBar active={'Wallet'} switchHome={(action) => switchHome(action)} />
            </View>
        </SafeAreaView>
    )
}

export default WalletFavorite