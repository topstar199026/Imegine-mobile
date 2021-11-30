import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image, TouchableOpacity} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {colors, fonts, images} from 'src/assets/themes';
import CCard from 'src/components/CCard';
import { _center, _centerH, _centerV, _flex, _flexCol, _flexRow, _font, _size, _style } from 'src/modules/Style';
import MainLayout from 'src/layouts';
import { DeviceActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import CButton from 'src/components/CButton';
import CDeviceInfo from 'src/components/me/CDeviceInfo';

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

const AccountInfo = (props) => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const user = useSelector((state) => state.auth.user);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    const scanner = useRef();

    const navigation = useNavigation();

    const [activeType, setActiveType] = useState('all');

    const [devices, setDevices] = useState([]);
    const [selectDevices, setSelectDevices] = useState([])
    
    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);

        handleDeviceStatus();
    }, [])

    const handleDeviceStatus = () => {
        DeviceActions.getDeviceStatus(rsa, res => {
            if(res && res.status === true) {
               console.log('res device status', res.data)
               setDevices(res.data)
            }else if(res && res.status === false && res.error) {
                Utils.toast(1, res.error);
                setDevices([]);
            }
        });
    }

    const onPress =() => {
        
    }    

    const handleTypeActive = (s) => {
        
    }

    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    const onSuccess = e => {
        
    };

    const handlePress = (i) => {
        
    }
    
    const handleUnlink =() => {
        
    }
    
    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'accountInfo'}
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
                    _flexCol,
                ])}>
                <View
                    style={_style([
                       _flexCol, 
                    ])}>
                    <View
                        style={_style([
                            {
                                marginTop: 15,
                            },
                            _center,
                        ])}>
                        <TouchableOpacity onPress={() => {
                                navigation.navigate('MePage', {screen: 'BasicInfo'});
                            }}>
                            <View style={[styles.container]}>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 40,
                                    }}>
                                    <Image source={images.me.basic} />
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
                                        {'Basic Information'}
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
                                navigation.navigate('MePage', {screen: 'SignInfo'});
                            }}>
                            <View style={[styles.container]}>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 40,
                                    }}>
                                    <Image source={images.me.sign} />
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
                                        {'Signature'}
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
                                navigation.navigate('MePage', {screen: 'PrivacyInfo'});
                            }}>
                            <View style={[styles.container]}>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 40,
                                    }}>
                                    <Image source={images.me.privacy} />
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
                                        {'Privacy'}
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
            </View>
        </MainLayout>
    )
}

export default AccountInfo