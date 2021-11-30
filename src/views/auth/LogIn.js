import React, { useContext, useEffect, useState } from 'react';
import {Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, Keyboard} from "react-native" ;
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {colors, images, fonts} from 'src/assets/themes';
import CPassword from 'src/components/CPassword';
import CButton from 'src/components/CButton';
import CIdInput from 'src/components/CIdInput';
import { _centerT, _font, _style } from 'src/modules/Style';
import {AuthActions} from 'src/actions';
import * as Utils from 'src/modules/Toast';
import {SocketContext} from 'src/contexts/SocketContext';

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
        fontFamily: fonts.$robotBold,
        fontSize: 36,
        color: colors.$secondaryBlue,
        lineHeight: 39.6,
        textAlign: 'center',
        marginTop: 50,
    }

});

const LogIn = (props) => {
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    const dispatch = useDispatch();

    const socket = useContext(SocketContext);

    const _userId =  (props.route.params && props.route.params.userId) ? props.route.params.userId : null;

    console.log('props.route.params', props.route.params, _userId)
    const navigation = useNavigation();
    const [showKeyBoard, setShowKeyBoard] = useState(false);
    // const [userId, setUserId] = useState('RUTIS801FSJ');
    // const [password, setPassword] = useState('abcdABCD1234!@#$');

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(false);
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setShowKeyBoard(true)
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setShowKeyBoard(false)
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [])

    useEffect(() => {
        _userId && setUserId(_userId);
    }, [_userId])

    const handleChange1 = (t) => {
        setUserId(t);
    }

    const handleChange2 = (t) => {
        setPassword(t);
    }

    const onPress = async () => {
        await handleLogin();
    }

    const handleLogin = async () => {
        dispatch(
            AuthActions.login(rsa, {
                userId: userId,
                password: password,
                key: rsa.public
            }, res => {
                if(res && res.status === true) {
                    // @ts-ignore
                    // socket.socketConnect(res.data.userId)

                    // console.log('-----------',  socket, res.data.userId);
                    setTimeout(() => {
                        navigation.navigate('Main');
                    }, 1000);
                }else if(res && res.status === false && res.error) {
                    Utils.toast(1, res.error);
                }
            }),
        );
        // var res = await UserApi.loginUser(rsa, {
        //     userId: userId,
        //     password: password,
        //     key: rsa.public,
        // });
        // if(res && res.data && res.data.success === true) {
        //     const _key = res.data.key;
        //     const _data = res.data.data;
        //     console.log('res.data.token', res.data);
        //     setTimeout(() => {
        //         // navigation.navigate('Main');
        //     }, 1000);
        // }else if(res && res.data && res.data.success === false && res.data.error) {
        //     Utils.toast(1, res.data.error);
        // }
    }

    return (
        <LinearGradient colors={colors.$gradient2} style={styles.linearGradient}>
            <Image 
                resizeMode='stretch' source={images.start.background2} 
                style={_style([
                    {
                        opacity: showKeyBoard === true ? 0.2 : 1,
                    },
                    styles.background2
                ])}
                
            />            
            <SafeAreaView>
                <StatusBar />
                <View
                    style={{
                        alignItems: 'center'  
                    }}>
                    <Text style={[styles.title]}>
                        {'Log in'}
                    </Text>
                    <CIdInput 
                        placeholder="Id" 
                        styles={{
                            marginTop: 50
                        }}
                        handleChange={(t) => handleChange1(t)}
                        value={userId}
                        initialValue={_userId}
                    />
                    <CPassword 
                        placeholder="Password" 
                        styles={{
                            marginTop: 20
                        }}
                        handleChange={(t) => handleChange2(t)}
                        value={password}
                    />
                    <Text
                        style={_style([{
                                marginTop: 25.7,
                                width: wp(75),
                                opacity: 0.6
                            },
                            _centerT,
                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 13, 18), 
                        ])}>
                        &nbsp;
                    </Text>
                    <CButton
                        styles={{
                            width: wp(60),
                            marginTop: 26,
                            shadowColor: colors.$secondaryBlue,
                            shadowOffset: {
                                width: 3,
                                height: 5,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 1,        
                            elevation: 8,
                        }}
                        onPress={() => onPress()}>
                        {'Continue'}
                    </CButton>
                    <TouchableOpacity onPress={()=>{navigation.navigate('CreatePassword')}}>
                        <Text
                            style={_style([{
                                    marginTop: 25.7,
                                    width: wp(75),
                                },
                                _centerT,
                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 13, 18), 
                            ])}>
                            {'Are you new in Imegine? '}
                            <Text style={[
                                _font(fonts.$robotBold, colors.$secondaryBlue, 13)
                                ]}>
                                {'Sign Up'}
                            </Text>                            
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default LogIn