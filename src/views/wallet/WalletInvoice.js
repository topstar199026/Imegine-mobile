import React, { useEffect } from 'react';
import {Text, View, StyleSheet, StatusBar, ScrollView, FlatList, Image} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import {colors, fonts, images} from 'src/assets/themes';
import { useNavigation } from '@react-navigation/native';

import CBottomBar from 'src/components/bar/CBottomBar';
import CTopWalletBar from 'src/components/bar/CTopBar';
import CSearch from 'src/components/messages/CSearch';
import CWalletCard from 'src/components/wallet/CWalletCard';
import CFavoriteDocument from 'src/components/wallet/CFavoriteDocument';
import CWalletRecent from 'src/components/wallet/CWalletRecent';
import CWalletProgress from 'src/components/wallet/CWalletProgress';

import MainLayout from 'src/layouts';
import { _center, _centerV, _flexCol, _flexRow, _font, _size, _style } from 'src/modules/Style';
import CWalletUpcoming from 'src/components/wallet/CWalletUpcoming';
import CTopWalletDetailBar from 'src/components/bar/CTopWalletDetailBar';
import CWalletInvoiceItem from 'src/components/wallet/CWalletInvoiceItem';

const WalletInvoice = () => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    
    const navigation = useNavigation();

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    const onPress =(item) => {
    } 
    
    const switchHome =(action) => {
        navigation.navigate(action);
    }

    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'walletInvoice'}
            active={'Wallet'}
            switchHome={(action) => switchHome(action)}>        
            <View
                style={_style([
                    {
                        height: '100%',
                        paddingTop: 70,
                        paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                        paddingLeft: 10,
                        paddingRight: 10,
                    }
                ])}>
                <View
                    style={_style([
                        {
                            width: '100%',
                            flex: 1,
                            paddingTop: 15,
                        },
                    ])}>                    
                    <ScrollView>
                        <View
                            style={_style([
                                {
                                },
                                _flexRow,
                                _center,
                            ])}>
                            <View>
                                <Text
                                    style={_style([{
                                        },
                                        _font(fonts.$rubikRegular, colors.$secondaryBlue, 14)
                                    ])}>
                                    {'All Invoices'}
                                </Text>
                            </View>
                            <View
                                style={_style([
                                    {
                                        paddingLeft: 10,
                                    }
                                ])}>
                                <Image source={images.size4.wallet.downBlack4x} style={_style([_size(24, 24)])} />
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
                                    padding: '5%'
                                }
                            ])}>
                            <View>
                                <Text
                                    style={_style([{
                                        },
                                        _font(fonts.$rubikBold, colors.$secondaryBlue, 18)
                                    ])}>
                                    {'All invoices'}
                                </Text>
                            </View>
                            <View>
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
                                style={_style([
                                    {
                                        marginTop: 15,
                                    }
                                ])}>
                                <Text
                                    style={_style([{
                                        },
                                        _font(fonts.$rubikBold, colors.$text, 18)
                                    ])}>
                                    {'Tickets'}
                                </Text>
                            </View>
                            <View>
                                <CWalletInvoiceItem finger={false} />
                                <CWalletInvoiceItem finger={false} />
                                <CWalletInvoiceItem finger={false} />
                            </View>
                            <View
                                style={_style([
                                    {
                                        marginTop: 15,
                                    }
                                ])}>
                                <Text
                                    style={_style([{
                                        },
                                        _font(fonts.$rubikBold, colors.$text, 18)
                                    ])}>
                                    {'Contracts'}
                                </Text>
                            </View>
                            <View>
                                <CWalletInvoiceItem finger={false} />
                                <CWalletInvoiceItem finger={false} />
                            </View>
                        </View>
                        
                    </ScrollView>    
                </View>
            </View>      
        </MainLayout>
    )
}

export default WalletInvoice