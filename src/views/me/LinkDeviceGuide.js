import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {colors, fonts, images} from 'src/assets/themes';
import CCard from 'src/components/CCard';
import { _centerH, _centerV, _flexCol, _flexRow, _font, _style } from 'src/modules/Style';
import MainLayout from 'src/layouts';
import { DeviceActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import CButton from 'src/components/CButton';

const LinkDeviceGuide = () => {
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
        navigation.navigate('ScanDevice');
    }    

    const handleTypeActive = (s) => {
        
    }

    const switchHome =(action) => {
        navigation.navigate(action);
    } 
    
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
                <ScrollView
                    style={{
                        width: '100%',
                        paddingRight: 5,
                        flex: 1,
                    }}>
                    <CCard
                        styles={_style([
                            {
                                padding: 10,
                                paddingTop: 80,
                                flex: 1,
                                width: '100%',                                
                            },
                            _flexCol,
                        ])}>
                        <View
                            style={_style([
                                {},
                                _flexCol,
                                _centerV,
                            ])}>
                            <Image source={images.me.qrCode} />
                        </View>
                        <View
                            style={_style([
                                {
                                    marginTop: 25,
                                },
                                _flexCol,
                                _centerV,
                            ])}>
                            <Text 
                                style={_style([
                                    {},
                                    _font(fonts.$rubikBold, colors.$secondaryBlue, 24)
                                ])}>
                                {'Instructions'}
                            </Text>
                        </View>

                        <View
                            style={_style([
                                {
                                    marginTop: 25,
                                    
                                },
                                _flexCol,
                                _centerV,
                            ])}>
                            <Text 
                                style={_style([
                                    {
                                        width: '80%',
                                    },
                                    _font(fonts.$robotRegular, colors.$secondaryBlue, 15, 19.5)
                                ])}>
                                {'1. Download Imegine on your desktop from desktop.imegine.com'}
                            </Text>
                        </View>
                        <View
                            style={_style([
                                {
                                    marginTop: 18,
                                    
                                },
                                _flexCol,
                                _centerV,
                            ])}>
                            <Text 
                                style={_style([
                                    {
                                        width: '80%',
                                    },
                                    _font(fonts.$robotRegular, colors.$secondaryBlue, 15, 19.5)
                                ])}>
                                {'2. Open Imegine Desktop to get your QR code'}
                            </Text>
                        </View>
                        <View
                            style={_style([
                                {
                                    marginTop: 18,
                                    
                                },
                                _flexCol,
                                _centerV,
                            ])}>
                            <Text 
                                style={_style([
                                    {
                                        width: '80%',
                                    },
                                    _font(fonts.$robotRegular, colors.$secondaryBlue, 15, 19.5)
                                ])}>
                                {'3. Scan the code with your smartphone to link your account'}
                            </Text>
                        </View>

                        <View
                            style={_style([
                                {
                                    marginTop: 20,
                                },
                                _flexCol,
                                _centerV,
                            ])}>
                            <CButton 
                                onPress={() => onPress()}
                                styles={_style([
                                    {
                                        marginTop: 35,
                                        width: wp(60),
                                        shadowColor: colors.$secondaryBlue,
                                        shadowOffset: {
                                            width: 3,
                                            height: 5,
                                        },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 1,        
                                        elevation: 8,
                                    }
                                ])}>
                                {'Scan'}
                            </CButton>
                        </View>                        
                    </CCard>
                </ScrollView>
            </View>
        </MainLayout>
    )
}

export default LinkDeviceGuide