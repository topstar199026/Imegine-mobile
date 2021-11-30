import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, Keyboard} from "react-native" ;
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';

import {colors, images, fonts} from 'src/assets/themes';
import CPassword from 'src/components/CPassword';
import CButton from 'src/components/CButton';
import { _center, _centerT, _centerV, _flex, _flexRow, _font, _shadow, _size, _style } from 'src/modules/Style';
import { style } from 'styled-system';
import { generateSecurityKey } from 'src/modules/Security';
import CIdInput from 'src/components/CIdInput';

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
    nickName: 
        yup.string().required('Please Enter your name'),
});

const CreateName = (props) => {

    const password = props.route.params.password;
    const navigation = useNavigation();

    const [nickName, setNickName] = useState('');
    const [imagePath, setImagePath] = useState('');
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

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [])

    const onPress =() => {
        validationSchema.validate({
            nickName: nickName,
        }).then(res => {
            setValidate(false);
            setTimeout(() => {               
                navigation.navigate('CreateId', {
                    password: password.toString(),
                    nickName: nickName,
                    imagePath: imagePath,
                });               
            }, 200);
        }).catch(err => {
            setValidate(true);
        });
    }

    const handleChange1 = (t) => {
        setNickName(t);
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
                        {'Enter your name'}
                    </Text>
                    <View
                        style={_style([
                            {
                                marginTop: 30,
                                width: wp(80),
                            },
                            _flexRow,
                        ])}>
                        <View
                            style={_style([
                                {
                                    width: 70,
                                },
                            ])}>
                            <View
                                style={_style([
                                    {
                                        backgroundColor: colors.$secondaryBlue,
                                        borderRadius: 35,
                                    },
                                    _size(70, 70),
                                    _flex,
                                    _center,
                                ])}>
                                <TouchableOpacity onPress={() => {
                                        ImagePicker.openPicker({
                                            width: 300,
                                            height: 300,
                                            cropping: true
                                        }).then(image => {
                                            console.log(image);
                                            setImagePath(image.path);
                                        });
                                    }}>
                                    <Image 
                                        resizeMode="stretch" 
                                        style={{
                                            width: 25,
                                            height: 25,
                                        }}
                                        source={images.start.screenPlusWhite} 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={_style([
                                {
                                    flex: 1,
                                },
                                _flexRow,
                                _center,
                            ])}>
                            <Text
                                style={_style([{
                                        opacity: 0.6
                                    },
                                    _centerT,
                                    _font(fonts.$rubikMedium, colors.$secondaryBlue, 22, 28), 
                                ])}>
                                {'+ Add profile picture'}
                            </Text>
                        </View>        
                        
                    </View>
                    <CIdInput 
                        placeholder="Your name" 
                        styles={{
                            marginTop: 30
                        }}
                        visible={true}
                        handleChange={(t) => handleChange1(t)}
                        value={nickName}
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
                        {'Your name will never be stored, it will be only used for notification purposes'}
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
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default CreateName