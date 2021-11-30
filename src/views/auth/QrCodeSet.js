import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, StatusBar, Image, Platform} from "react-native" ;
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import {useSelector, useDispatch} from 'react-redux';

import {colors, images, fonts} from 'src/assets/themes';
import CButton from 'src/components/CButton';
import { _shadow, _style } from 'src/modules/Style';
import {getCountry as _getCountry} from 'src/modules/Country';
import * as Utils from 'src/modules/Toast';
import { AuthActions } from 'src/actions';

var styles = StyleSheet.create({
    linearGradient: {
      flex: 1
    },
    background2: {
        position : 'absolute',
        bottom: 0,
        left: 0,
        width: wp(100),
        height: hp(33),
    },
    title: {
        fontFamily: fonts.$rubikBold,
        fontSize: 31,
        color: colors.$secondaryBlue,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 20 // Ios/Android set
    },
    content: {
        fontFamily: fonts.$robotMedium,
        fontSize: 24,
        width: wp(90),
        color: colors.$secondaryBlue,
        lineHeight: 39.6,
        textAlign: 'center',
        marginBottom: 13,
    },
    qrDown: {
        marginTop: 30
    },

});


const QrCodeSet = (props) => {
    const navigation = useNavigation();

    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    const dispatch = useDispatch();

    const _userId = props.route.params.userId;
    const _password = props.route.params.password;
    const _nickName = props.route.params.nickName;
    const _imagePath = props.route.params.imagePath;
    const [userId, setUserId] = useState(_userId);
    const [countryCode, setCountryCode] = useState(null);
    const [qrSvg, setQrSvg] = useState(null);
    
    console.log(props.route.params)

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(false);
        getCountry();
    }, []);

    useEffect(() => {
        qrSvg && getDataURL();
    }, [qrSvg])

    useEffect(() => {
        countryCode && setUserId(countryCode.toString() + userId);
    }, [countryCode])

    const getDataURL = () => {
        qrSvg.toDataURL(callback);
    }
    
    const callback = (dataURL) => {
    }

    const getCountry = async () => {
        let code = await _getCountry();
        setCountryCode(code.country_code);
    }

    const onPress = async (s) => {
        console.log(rsa.public);
        await handleRegister()
    }

    const handleRegister = async () => {
        console.log('_imagePath', _imagePath);
        if(_imagePath && _imagePath.length > 0) {
            let data = new FormData();

            data.append('photo', {
                type: 'image/jpeg',
                // @ts-ignore
                uri: Platform.OS === 'android' ? _imagePath : _imagePath.replace('file://', ''),
                name: '',
            });
            AuthActions.imageUpload(data, res => {
                if(res && res.status === true) {
                    let imagePath = res.data;
                    dispatch(
                        AuthActions.register(rsa, {
                            userId: countryCode + _userId,
                            password: _password,
                            nickName: _nickName,
                            imagePath: imagePath,
                            countryId: countryCode,
                            key: rsa.public
                        }, res => {
                            if(res && res.status === true) {
                                setTimeout(() => {
                                    navigation.navigate('LogIn', {
                                        userId: countryCode + _userId
                                    }); 
                                }, 1000);
                            }else if(res && res.status === false && res.error) {
                                Utils.toast(1, res.error);
                            }
                        }),
                    );
                }else if(res && res.status === false && res.error) {
                    Utils.toast(1, res.error);
                }
            });
        }else{
            dispatch(
                AuthActions.register(rsa, {
                    userId: countryCode + _userId,
                    password: _password,
                    nickName: _nickName,
                    
                    countryId: countryCode,
                    key: rsa.public
                }, res => {
                    if(res && res.status === true) {
                        setTimeout(() => {
                            navigation.navigate('LogIn', {
                                userId: countryCode + _userId
                            }); 
                        }, 1000);
                    }else if(res && res.status === false && res.error) {
                        Utils.toast(1, res.error);
                    }
                }),
            );
        }
        
        
    }
    
    let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
  

    return (
        <LinearGradient colors={colors.$gradient2} style={styles.linearGradient}>
            <Image resizeMode='stretch' source={images.start.background2} style={styles.background2}/>
            <SafeAreaView>
                <StatusBar />
                <View
                    style={{
                      alignItems: 'center'  
                    }}
                >
                    <Text style={[styles.title]}>
                        {'You’re all set'}
                    </Text>
                    <Text style={[styles.content]}>
                        {'Your new User ID is:'}
                    </Text>
                    <Text style={[styles.content]}>
                        {userId}
                    </Text>
                    <QRCode
                        value={userId}
                        logo={{uri: base64Logo}}
                        logoSize={30}
                        logoBackgroundColor='transparent'
                        size={wp(50)}
                        getRef={(c) => (setQrSvg(c))}
                    />
                    <Image resizeMode='stretch' source={images.qrDown} style={styles.qrDown}/>
                    {
                        countryCode && 
                        <CButton
                            onPress={() => onPress()}
                            styles={[{
                                    marginTop: 50,
                                    width: wp(60),
                                },
                                _shadow(colors.$secondaryBlue),
                                
                            ]}>
                            {'Done'}
                        </CButton>
                    }                    
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default QrCodeSet