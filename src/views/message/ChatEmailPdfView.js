import React, { useEffect, useState } from 'react';
import {View, StyleSheet, StatusBar} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Pdf } from 'react-native-pdf-light'
import {Dirs, FileSystem} from 'react-native-file-access';

import {colors, fonts} from 'src/assets/themes';
import CTopEmailDetailBar from 'src/components/bar/CTopEmailDetailBar';

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



const ChatEmailPdfView = () => {

    const cachePath = `${Dirs.CacheDir}/name.pdf`;
    const [ready, setReady] = useState(false);
    const navigation = useNavigation();

    // @ts-ignore
    useEffect(async () => {
        FileSystem
        .fetch('https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf', {path: cachePath})
        .then(res => {
            console.log(cachePath)
            setReady(true);    
        });
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    const onPress =(item) => {
       
    }    

    return (
        <SafeAreaView>
            <StatusBar />
            <View
                style={{
                    alignItems: 'center'  ,
                    height: '100%',
                    paddingTop: 70,
                    paddingBottom: 20,
                }}
                >
                <CTopEmailDetailBar active={'all'} handleTypeActive={(s) => {}} activeType={'activeType'} navigation={navigation} />
                <View
                    style={{
                        width: wp(100),
                        paddingLeft: wp(5),
                        paddingRight: wp(5),
                        flex: 1,
                    }}
                    >
                    {
                        ready &&
                        // @ts-ignore
                        <Pdf horizontal  style={{}} source={cachePath} />
                    }
                </View>      
            </View>
        </SafeAreaView>
    )
}

export default ChatEmailPdfView