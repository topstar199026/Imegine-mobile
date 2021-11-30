import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image, TouchableOpacity} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import GestureRecognizer from 'react-native-swipe-gestures';

import {colors, fonts, images} from 'src/assets/themes';
import CCard from 'src/components/CCard';
import { _center, _centerH, _centerV, _flex, _flexCol, _flexRow, _font, _shadow, _size, _style } from 'src/modules/Style';
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

const SignDescription = (props) => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const user = useSelector((state) => state.auth.user);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    const scrollRef = useRef();
    const navigation = useNavigation();

    const [activeType, setActiveType] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    
    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);       
    }, [])
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
            topBarId={''}
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
                        {
                            flex: 1,
                        },
                       _flexCol, 
                    ])}>
                    <Swiper
                        loop={false}
                        // onIndexChanged={(index) =>
                        //     setTimeout(() => {
                        //         setCurrentPage(index);
                        //     }, 1)
                        // }
                        ref={scrollRef}
                        // scrollEventThrottle={16}
                        showsButtons={false}
                        showsPagination={true}
                        dot={
                            <View style={{backgroundColor:'rgba(178,178,178,.3)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />
                        }
                        activeDot={
                            <View style={{backgroundColor: '#B2B2B2', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />
                        }>
                        <View
                            style={_style([
                                {
                                    height: '100%',
                                },
                                _centerV,
                            ])}>
                            <Text 
                                style={_style([
                                    {

                                    },
                                    _font(fonts.$rubikMedium, colors.$secondaryBlue, 31, 40)
                                ])}>
                                {'What´s a signature?'}
                            </Text>

                            <Image 
                                style={_style([
                                    {
                                        marginTop: 60,
                                    }
                                ])}
                                source={images.me.sign1} 
                            />

                            <Text 
                                style={_style([
                                    {
                                        textAlign: 'center',
                                        marginTop: 20,
                                        width: '80%',
                                    },
                                    _font(fonts.$rubikMedium, colors.$secondaryBlue, 22, 29)
                                ])}>
                                {'Your signature will let you to sign different kind of document and make them official between users.'}
                            </Text>
                        </View>
                        <View
                            style={_style([
                                {
                                    height: '100%',
                                },
                                _flexCol,
                                _centerV,
                            ])}>
                            <Text 
                                style={_style([
                                    {

                                    },
                                    _font(fonts.$rubikMedium, colors.$secondaryBlue, 31, 40)
                                ])}>
                                {'Digital Signature'}
                            </Text>

                            <Image 
                                style={_style([
                                    {
                                        marginTop: 60,
                                    }
                                ])}
                                source={images.me.sign2} 
                            />

                            <Text 
                                style={_style([
                                    {
                                        textAlign: 'center',
                                        marginTop: 20,
                                        width: '80%',
                                    },
                                    _font(fonts.$rubikMedium, colors.$secondaryBlue, 22, 29)
                                ])}>
                                {'Once you add your signature, Imegine will save it for your future activity.'}
                            </Text>
                        </View>
                        <View
                            style={_style([
                                {
                                    height: '100%',
                                },
                                _flexCol,
                                _centerV,
                            ])}>
                            <Text 
                                style={_style([
                                    {

                                    },
                                    _font(fonts.$rubikMedium, colors.$secondaryBlue, 31, 40)
                                ])}>
                                {'Don´t worry!'}
                            </Text>

                            <Image 
                                style={_style([
                                    {
                                        marginTop: 60,
                                    }
                                ])}
                                source={images.me.sign3} 
                            />

                            <Text 
                                style={_style([
                                    {
                                        textAlign: 'center',
                                        marginTop: 20,
                                        width: '80%',
                                    },
                                    _font(fonts.$rubikMedium, colors.$secondaryBlue, 22, 29)
                                ])}>
                                {'You signature are safe, when you add a new one, all your data is encrypted and saved in your device'}
                            </Text>

                            <CButton 
                                styles={[{
                                        marginTop: 31,
                                        width: wp(60)
                                    },
                                    _shadow(colors.$secondaryBlue),
                                ]}
                                onPress={() => {
                                    navigation.navigate('SignNew1');
                                }}>
                                {'Continue'}
                            </CButton>
                            <TouchableOpacity>
                                <Text 
                                    style={_style([
                                        {
                                            textAlign: 'center',
                                            marginTop: 20,
                                        },
                                        _font(fonts.$rubikMedium, colors.$secondaryBlue, 13, 29)
                                    ])}>
                                    {'Add Signature Later'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Swiper>

                </View>
            </View>
        </MainLayout>
    )
}

export default SignDescription