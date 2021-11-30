import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image, TouchableOpacity} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {Dirs, FileSystem} from 'react-native-file-access';
import {useSelector} from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {colors, fonts, images} from 'src/assets/themes';
import CBottomEmailDetailBar from 'src/components/bar/CBottomEmailDetailBar';
import CTopEmailDetailBar from 'src/components/bar/CTopEmailDetailBar';
import CCard from 'src/components/CCard';
import CBusinessProfileAction from 'src/components/messages/CBusinessProfileAction';
import CBusinessProfileReview from 'src/components/messages/CBusinessProfileReview';
import WalletFavorite from '../wallet/WalletFavorite';
import CFavoriteDocument from 'src/components/wallet/CFavoriteDocument';
import CFavoriteMessage from 'src/components/messages/CFavoriteMessage';
import CBottomBar from 'src/components/bar/CBottomBar';
import CBusinessProfileImage from 'src/components/messages/CBusinessProfileImage';
import CBusinessProfileMap from 'src/components/messages/CBusinessProfileMap';
import CTopBusinessProfileBar from 'src/components/bar/CTopBusinessProfileBar';
import { _centerH, _centerV, _flexCol, _flexRow, _font, _style } from 'src/modules/Style';
import MainLayout from 'src/layouts';
import { DeviceActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import { flex } from 'styled-system';
import CButton from 'src/components/CButton';

var styles = StyleSheet.create({
    linearGradient: {
      flex: 1
    },
    welcomeWhiteShape: {
        position : 'absolute',
        top: 0,
        left: 0,
        width: wp(100),
        height: hp(63),
    },
    message: {
        marginTop: 30,
        width: 114,
        height: 87
    },
    title: {
        fontFamily: fonts.$rubikBold,
        fontSize: 36,
        color: colors.$textSecondary,
        lineHeight: 39.6,
        textAlign: 'center',
    },
    button: {
        marginTop: hp(30),
        borderRadius: 28,
        height: 56,
        width: wp(80),
        backgroundColor: '#54E5FF',
    },
    buttonLabel: {
        fontFamily: fonts.$rubikBold,
        fontSize: 23,
        color: colors.$white
    }

});



const ScanDevice = () => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const user = useSelector((state) => state.auth.user);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    const scanner = useRef();

    const navigation = useNavigation();

    const [activeType, setActiveType] = useState('all');
    
    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    const onPress =() => {
        navigation.navigate('LinkDeviceGuide');
    }    

    const handleTypeActive = (s) => {
        
    }

    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    const onSuccess = e => {
        console.log('e.data', e.data)
        DeviceActions.deviceLink(rsa, {
            deviceId: e.data,
        }, res => {
            if(res && res.status === true) {
                setTimeout(() => {
                    navigation.goBack();
                }, 1000);
            }else if(res && res.status === false && res.error) {
                Utils.toast(1, res.error);
            }
        });

    };
    
    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'linkDevice'}
            switchHome={(action) => switchHome(action)}
            backFlag={true}
            handleTypeActive={(s) => {}} 
            activeType={activeType}
            data={null}
            >        
            <View
                style={_style([
                    {
                        height: '100%',
                        paddingTop: 70,
                        paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                        paddingLeft: 0,
                        paddingRight: 0,
                    },
                    _flexRow,
                ])}>
                <View
                    style={{
                        width: '100%',
                        paddingRight: 5,
                        flex: 1,
                    }}>
                    <QRCodeScanner
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
                    />
                </View>
            </View>
        </MainLayout>
    )
}

export default ScanDevice