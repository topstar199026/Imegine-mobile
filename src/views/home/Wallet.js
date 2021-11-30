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
import { _centerV, _flexCol, _style } from 'src/modules/Style';
import CWalletUpcoming from 'src/components/wallet/CWalletUpcoming';

var styles = StyleSheet.create({
    
});

export const WalletCardList = [
    {
        id: 0,
        type: '0',
        count: 2,
        action: [''],
    },
    {
        id: 1,
        type: '1',
        count: 1,
        action: ['WalletPage', {screen: 'Contract'}],
    },
    {
        id: 2,
        type: '2',
        count: 10,
        action: ['WalletPage'],
    },
    {
        id: 3,
        type: '3',
        count: 2,
        action: [''],
    }
];

export const WalletProgressList = [
    {
        id: 0,
        title: 'Food',
        percent: 67.45,
    },
    {
        id: 1,
        title: 'Transport',
        percent: 22.55,
    },
    {
        id: 2,
        title: 'Other',
        percent: 10,
    },
];

const Wallet = () => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    
    const navigation = useNavigation();

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    const onPress =(item) => {
        console.log('item', item)
        if(item.item.action.length === 1) 
            navigation.navigate(item.item.action[0]);
        else
            navigation.navigate(item.item.action[0], item.item.action[1]);
    } 
    
    const switchHome =(action) => {
        navigation.navigate(action);
    }

    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'wallet'}
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
                <CSearch style={_style([{marginTop: 13}])} placeholder={'Search Documents'} />
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
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                }
                            ])}>
                            <FlatList 
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={WalletCardList}
                                renderItem={item => 
                                    <CWalletCard data={item} onPress={() => {onPress(item)}}
                                        styles={{
                                            height: hp(100) - 176 - StatusBar.currentHeight
                                        }}
                                    />
                                }
                                keyExtractor={item => item.id.toString()}    
                            />
                        </View>
                        <View
                            style={_style([
                                {
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                },
                                _centerV
                            ])}>
                            <CFavoriteDocument />
                        </View>
                        <View
                            style={_style([_centerV])}>
                            <CWalletUpcoming />
                        </View>
                        <View
                            style={_style([_centerV])}>
                            <CWalletRecent />
                        </View>
                        <View
                            style={_style([_centerV])}>
                            <CWalletProgress 
                                width={wp(90)}
                                percents={WalletProgressList}
                            />
                        </View>
                    </ScrollView>    
                </View>
            </View>      
        </MainLayout>
    )
}

export default Wallet