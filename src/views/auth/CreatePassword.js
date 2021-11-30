import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, Keyboard} from "react-native" ;
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';

import {colors, images, fonts} from 'src/assets/themes';
import CPassword from 'src/components/CPassword';
import CButton from 'src/components/CButton';
import { _centerT, _centerV, _font, _shadow, _style } from 'src/modules/Style';
import { style } from 'styled-system';
import { generateSecurityKey } from 'src/modules/Security';

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
        lineHeight: 39.6,
        textAlign: 'center',
        marginTop: 50,
    }

});

let validationSchema = yup.object().shape({
    password: 
        yup.string().required('Please Enter your password')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/,
            "Must Contain 12 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    confirmPassword: yup.string().required('Please Enter your password')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/,
            "Must Contain 12 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const CreatePassword = () => {

    const navigation = useNavigation();

    // const [password, setPassword] = useState('abcdABCD1234!@#$');
    // const [confirmPassword, setConfirmPassword] = useState('abcdABCD1234!@#$');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validate, setValidate] = useState(false);

    const [showKeyBoard, setShowKeyBoard] = useState(false);
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
        generateSecurityKey();

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [])

    const onPress =() => {
        validationSchema.validate({
            password: password,
            confirmPassword: confirmPassword,
        }).then(res => {
            setValidate(false);
            setTimeout(() => {               
                navigation.navigate('CreateName', {
                    password: password.toString()
                });               
            }, 200);
        }).catch(err => {
            setValidate(true);
        });
    }

    const handleChange1 = (t) => {
        setPassword(t);
    }

    const handleChange2 = (t) => {
        setConfirmPassword(t);
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
                    style={_style([_centerV])}
                >
                    <Text style={_style([{
                                marginTop: 50,
                            },
                            _centerT,
                            _font(fonts.$rubikBold, colors.$secondaryBlue, 31, 39.6 ), 
                        ])}>
                        {'Create a password'}
                    </Text>
                    <CPassword 
                        placeholder="Password" 
                        styles={{
                            marginTop: 50
                        }}
                        handleChange={(t) => handleChange1(t)}
                        value={password}
                    />
                    <CPassword 
                        placeholder="Confirm password" 
                        styles={{
                            marginTop: 20
                        }}
                        handleChange={(t) => handleChange2(t)}
                        value={confirmPassword}
                    />
                    <Text
                        style={_style([{
                                marginTop: 25.7,
                                width: wp(75),
                                opacity: 0.6
                            },
                            _centerT,
                            _font(fonts.$rubikRegular, validate ? 'red' : colors.$secondaryBlue, 13, 18), 
                        ])}>
                        {'Your password must be min. 12 characters, uppercase and lowercase, numbers and special characters'}
                    </Text>
                    <CButton 
                        styles={[{
                                marginTop: 31,
                                width: wp(60)
                            },
                            _shadow(colors.$secondaryBlue),
                        ]}
                        onPress={() => onPress()}>
                        {'Continue'}
                    </CButton>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('LogIn')
                        }}>
                        <Text
                            style={_style([{
                                    marginTop: 14,
                                    width: wp(75),
                                },
                                _centerT,
                                _font(fonts.$rubikRegular, colors.$secondaryBlue, 13, 18),
                            ])}>
                            {'Do you have an account? '}
                            <Text style={[
                                _font(fonts.$rubikBold, colors.$secondaryBlue, 13),                                
                            ]}>{'Log In'}</Text>
                            
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={_style([{
                                marginTop: 5,
                                width: wp(75),
                            },
                            _centerT,
                            _font(fonts.$rubikBold, colors.$secondaryBlue, 13, 18),    
                        ])}>
                        {'Restore from a Backup'}                        
                    </Text>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default CreatePassword