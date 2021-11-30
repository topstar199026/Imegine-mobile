import React, { useEffect } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {colors, fonts, images} from 'src/assets/themes';
import CTopWalletDetailBar from 'src/components/bar/CTopWalletDetailBar';
import CBottomBar from 'src/components/bar/CBottomBar';
import CScreenButton from 'src/components/CScreenButton';
import CWalletInvoiceItem from 'src/components/wallet/CWalletInvoiceItem';
import MainLayout from 'src/layouts';
import { _center, _centerV, _flexCol, _flexRow, _font, _style } from 'src/modules/Style';
import CPlusButton from 'src/components/CPlusButton';

var styles = StyleSheet.create({
    
});



const Contract = () => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    
    const navigation = useNavigation();

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    const switchHome =(action) => {
        navigation.navigate(action);
    }

    const onPress =(item) => {
       
    }    

    const onNewInvoice = () => {
        navigation.navigate('WalletPage', {
            screen: 'WalletNewInvoice'
        });
    }

    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'contract'}
            active={'Wallet'}
            backFlag={true}
            switchHome={(action) => switchHome(action)}>   
            <View
                style={_style([
                    {
                        height: '100%',
                        paddingTop: 70,
                        paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                        paddingLeft: 3,
                        paddingRight: 3,
                    },
                    _flexCol,
                    _centerV,
                ])}>      
                <View
                    style={_style([
                        {
                            width: '100%',
                            flex: 1,
                            paddingTop: 15,
                        }
                    ])}>
                    <ScrollView
                        style={_style([
                            {
                            }
                        ])}>
                        <View
                            style={_style([
                                {

                                },
                                _flexRow,
                                _center,
                            ])}>
                            <View>
                                <Text
                                    style={_style([
                                        {
                                        },
                                        _font(fonts.$rubikRegular, colors.$secondaryBlue, 14)
                                    ])}>
                                    {'ALL INVOICES'}
                                </Text>
                            </View>
                            <View
                                style={_style([
                                    {
                                        paddingLeft: 15,
                                    }
                                ])}>
                                <Image source={images.downWallet} />
                            </View>
                        </View>
                        <View
                            style={_style([
                                {
                                    marginTop: 15,
                                    borderTopLeftRadius: 25,
                                    borderTopRightRadius: 25,
                                    width: '100%',
                                    backgroundColor: colors.$white,
                                    shadowColor: colors.$secondaryBlue,
                                    shadowOffset: {
                                        width: 4,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.9,
                                    shadowRadius: 55,
                                    
                                    elevation: 3,
                                    padding: 15,
                                },
                            ])}>
                            <View>
                                <Text
                                    style={_style([
                                        {
                                        },
                                        _font(fonts.$rubikBold, colors.$secondaryBlue, 18)
                                    ])}>
                                    {'All invoices'}
                                </Text>
                            </View>
                            <View
                                style={{
                                    // paddingTop: 15,
                                }}>
                                <CWalletInvoiceItem finger={true} onPress={() => {
                                    navigation.navigate('WalletCardInfo');
                                }} />
                                <CWalletInvoiceItem finger={true} onPress={() => {
                                    navigation.navigate('WalletInvoiceDetail');
                                }} />
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
                <CPlusButton onPress={() => {onNewInvoice()}}/>
            </View>      
        </MainLayout>
    )
}

export default Contract