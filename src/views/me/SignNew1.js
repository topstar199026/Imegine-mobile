import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {colors, fonts, images} from 'src/assets/themes';
import CCard from 'src/components/CCard';
import { _center, _centerH, _centerV, _flex, _flexCol, _flexRow, _font, _shadow, _style } from 'src/modules/Style';
import MainLayout from 'src/layouts';
import { DeviceActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import CButton from 'src/components/CButton';
import CDeviceInfo from 'src/components/me/CDeviceInfo';

const SignNew1 = (props) => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const user = useSelector((state) => state.auth.user);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);

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
                <ScrollView
                    style={_style([
                        {
                            width: '100%',
                            paddingRight: 5,
                            flex: 1,
                        },
                        _flex,
                    ])}>
                    <CCard
                        styles={_style([
                            {
                                padding: 10,
                                paddingTop: 50,
                                flex: 1,
                                width: '100%',                                
                            },
                            _flexCol,
                            _centerV,
                        ])}>
                        <Text 
                            style={_style([
                                {                                    
                                    width: wp(60),
                                    textAlign: 'center',
                                },
                                _font(fonts.$robotRegular, colors.$secondaryBlue, 15)
                            ])}>
                            {'This is your signature to use in Wallet section'}
                        </Text>

                        <Image 
                            style={_style([
                                {
                                    marginTop: 60,
                                    opacity: 0.3,
                                }
                            ])}
                            source={images.me.sign4} 
                        />

                        <View
                            style={_style([
                                {
                                    marginTop: 50,
                                    width: '80%',
                                    borderWidth: 1,
                                    borderColor: '#707070',
                                }
                            ])}
                        ></View>

                        <Text 
                            style={_style([
                                {
                                    marginTop: 10,
                                    textAlign: 'center',
                                },
                                _font(fonts.$robotRegular, colors.$secondaryBlue, 13)
                            ])}>
                            {'To create a new signature tap on \n "Add Signature" button.'}
                        </Text>
                        <CButton 
                            styles={[{
                                    marginTop: 51,
                                    width: wp(60)
                                },
                                _shadow(colors.$secondaryBlue),
                            ]}
                            onPress={() => {
                                navigation.navigate('SignNew1');
                            }}>
                            {'Add Signature'}
                        </CButton>

                        <CButton 
                            styles={[{
                                    marginTop: 31,
                                    backgroundColor: '#CECECE',
                                    width: wp(50)
                                },
                                _shadow(colors.$secondaryBlue),
                            ]}
                            onPress={() => {
                                navigation.navigate('SignNew1');
                            }}>
                            {'Go Back'}
                        </CButton>

                    </CCard>
                </ScrollView>
            </View>
        </MainLayout>
    )
}

export default SignNew1