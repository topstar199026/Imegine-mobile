import React, { useEffect } from 'react';
import {Text, View, StyleSheet, StatusBar, Image, LogBox} from "react-native" ;
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';

import {colors, images, fonts} from 'src/assets/themes';
import { useNavigation } from '@react-navigation/native';

import CButton from 'src/components/CButton';

LogBox.ignoreLogs(['Setting a timer']);


var styles = StyleSheet.create({
    linearGradient: {
      flex: 1
    },
    imageBackground: {
        position : 'absolute',
        bottom: 0,
        left: 0,
        width: wp(100),
        height: hp(63),
    },
    message: {
        marginTop: 40,
        width: 114,
        height: 87
    },
    title: {
        fontFamily: fonts.$rubikBold,
        fontSize: 34,
        color: colors.$secondaryBlue,
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
        fontFamily: fonts.$robotBold,
        fontSize: 23,
        color: colors.$white
    }

});

const GetStart = () => {
    const navigation = useNavigation();
    // @ts-ignore
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$transparent, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    useEffect(() => {
        if(user && user.userId) {
            (async () => {
                setTimeout(() => {
                    navigation.navigate('Main');
                }, 300);
            })();
        }
    }, [user])

    const onPress =() => {
        navigation.navigate('LogIn');        
    }
    
    return (
        <LinearGradient colors={colors.$gradient2} style={styles.linearGradient}>
            <Image resizeMode='stretch' source={images.start.background} style={styles.imageBackground}/>
            <SafeAreaView>
                <StatusBar />
                <View
                    style={{
                      alignItems: 'center'  
                    }}
                >
                    <Text style={[styles.title, {marginTop: hp(15)}]}>
                        {'Welcome to'}
                    </Text>
                    <Text style={[styles.title]}>
                        {'Imegine'}
                    </Text>
                    <Image 
                        resizeMode='stretch'
                        source={images.start.emailMain} 
                        style={styles.message}
                    />
                    <CButton 
                        onPress={() => onPress()}
                        styles={{
                            width: wp(60),
                            shadowColor: colors.$secondaryBlue,
                            shadowOffset: {
                                width: 3,
                                height: 5,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 1,        
                            elevation: 8,
                        }}>
                        {'Get Started'}
                    </CButton>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default GetStart