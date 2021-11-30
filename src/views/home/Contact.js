import React, { useEffect } from 'react';
import {Text, View, StyleSheet, StatusBar} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, fonts} from 'src/assets/themes';
import { useNavigation } from '@react-navigation/native';

import CBottomBar from 'src/components/bar/CBottomBar';
import CTopBar from 'src/components/bar/CTopBar';
import CSearch from 'src/components/messages/CSearch';

var styles = StyleSheet.create({
    linearGradient: {
      flex: 1
    },
    welcomeWhiteShape: {
        position : 'absolute',
        top: 0,
        left: 0,
        width: wp(100),
        height: hp(63),
    },
    message: {
        marginTop: 30,
        width: 114,
        height: 87
    },
    title: {
        fontFamily: fonts.$rubikBold,
        fontSize: 36,
        color: colors.$textSecondary,
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
        fontFamily: fonts.$rubikBold,
        fontSize: 23,
        color: colors.$white
    }

});

const Contact = () => {

    const navigation = useNavigation();

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    const onPress =(item) => {
        navigation.navigate('SendMessage');
    } 
    
    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    return (
        <SafeAreaView>
            <StatusBar />
            <View
                style={{
                    alignItems: 'center'  ,
                    height: '100%',
                    paddingTop: 57,
                    paddingBottom: 57
                }}
            >
                <CTopBar active={'Contacts'} />
                <CSearch style={{marginTop: 13}} />
                <Text style={[styles.title, {marginTop: hp(20)}]}>
                    {'Welcome to2'}
                </Text>
                <CBottomBar active={'Contacts'} switchHome={(action) => switchHome(action)} />
            </View>
        </SafeAreaView>
    )
}

export default Contact