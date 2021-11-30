import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {colors, fonts, images} from 'src/assets/themes';
import CCard from 'src/components/CCard';
import { _center, _centerH, _centerV, _flex, _flexCol, _flexRow, _font, _style } from 'src/modules/Style';
import MainLayout from 'src/layouts';
import { DeviceActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import CButton from 'src/components/CButton';
import CDeviceInfo from 'src/components/me/CDeviceInfo';

const SignNew2 = (props) => {
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
        navigation.navigate('LinkDeviceGuide');
    }    

    const handleTypeActive = (s) => {
        
    }

    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    const onSuccess = e => {
        
    };

    const handlePress = (i) => {
        const _temp = [...selectDevices];
        console.log(_temp.indexOf(i.toString()))
        if(_temp.indexOf(i.toString()) > -1) {
            let _i = _temp.indexOf(i.toString());
            _temp.splice(_i, 1);
        }else{
            _temp.push(i.toString());
        }
        setSelectDevices(_temp);
    }
    
    const handleUnlink =() => {
        var _temp = [];
        for(var i=0; i<selectDevices.length; i++) {
            _temp.push(devices[selectDevices[i]*1].id);
        }
        console.log(_temp);
        DeviceActions.deviceUnlink(rsa, {
            deviceList: _temp,
        }, res => {
            if(res && res.status === true) {
                setSelectDevices([]);
                handleDeviceStatus();
            }else if(res && res.status === false && res.error) {
                Utils.toast(1, res.error);
            }
        });
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
                                paddingTop: 50,
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
                            <Image source={images.me.linkDeviceBlue} />
                        </View>
                        <View
                            style={_style([
                                {
                                    marginTop: 20,
                                },
                                _flexCol,
                                _centerV,
                            ])}>
                            <Text 
                                style={_style([
                                    {},
                                    _font(fonts.$robotRegular, colors.$secondaryBlue, 15)
                                ])}>
                                {'Use Imegine on other devices'}
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
                                {
                                    devices.length === 0 ?
                                    'Link a Device'
                                    :
                                    'Add a new device'
                                }
                            </CButton>
                        </View>

                        <View
                            style={_style([
                                {
                                    marginTop: 40,
                                },
                                _flexCol,
                                _centerV,
                            ])}>
                            <Text 
                                style={_style([
                                    {
                                        opacity: 0.4,
                                    },
                                    _font(fonts.$robotRegular, colors.$secondaryBlue, 15)
                                ])}>
                                {'You have (' + devices.length + ') linked devices'}
                            </Text>
                        </View>
                        
                        <View
                            style={_style([
                                {
                                    marginTop: 20,
                                }
                            ])}>

                        </View>
                        {
                            devices.map((device, index) =>
                                <CDeviceInfo onPress={() => handlePress(index)} device={device} index={index} key={index.toString()} />
                            )
                        }
                        {
                            selectDevices.length > 0 &&
                            <View
                                style={_style([
                                    {
                                        marginTop: 20,
                                    },
                                    _flexCol,
                                    _centerV,
                                ])}>
                                <CButton 
                                    onPress={() => handleUnlink()}
                                    styles={_style([
                                        {
                                            marginTop: 15,
                                            width: wp(50),
                                            shadowColor: colors.$secondaryBlue,
                                            shadowOffset: {
                                                width: 3,
                                                height: 5,
                                            },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 1,        
                                            elevation: 8,
                                            paddingTop: 20,
                                        },
                                        _font(fonts.$rubikMedium, colors.$white, 16),
                                    ])}>
                                    {
                                        'Unlink devices'
                                    }
                                </CButton>
                            </View>
                        }
                    </CCard>
                </ScrollView>
            </View>
        </MainLayout>
    )
}

export default SignNew2