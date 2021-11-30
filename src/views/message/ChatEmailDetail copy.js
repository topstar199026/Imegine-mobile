import React, { useEffect, useState } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image, TouchableOpacity} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {Dirs, FileSystem} from 'react-native-file-access';

import {colors, fonts, images} from 'src/assets/themes';
import CBottomEmailDetailBar from 'src/components/bar/CBottomEmailDetailBar';
import CTopEmailDetailBar from 'src/components/bar/CTopEmailDetailBar';
import CCard from 'src/components/CCard';
import { _style } from 'src/modules/Style';

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



const ChatEmailDetail = () => {

    const cachePath = `${Dirs.CacheDir}/name.pdf`;
    const [ready, setReady] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
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
                    paddingBottom: 70,
                }}
                >
                <CTopEmailDetailBar active={'all'} handleTypeActive={(s) => {}} activeType={'activeType'} navigation={navigation} />
                <View
                    style={{
                        width: wp(100),
                        paddingLeft: wp(5),
                        paddingRight: wp(5),
                    }}
                    >
                    <ScrollView
                        style={_style([
                            {
                                width: '100%',
                                paddingRight: 5,
                            }
                        ])}>
                        <CCard
                            styles={{
                                padding: 10,
                            }}>
                            
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    padding: 10
                                }}>
                                <View
                                    style={{}}>
                                    <Image source={images.avatarN} style={{width: 36, height: 36, borderRadius: 18}} />
                                </View>
                                <View
                                    style={{paddingLeft: 10}}>
                                    <Text
                                        style={{
                                            fontFamily: fonts.$rubikBold,
                                            color: colors.$textSecondary,
                                            fontSize: 16,
                                        }}>
                                        {'Steve Williams'}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: fonts.$rubikRegular,
                                            color: colors.$textSecondary,
                                            fontSize: 13,
                                        }}>
                                        {'To: Pablo Zehle'}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    paddingLeft: 13,
                                    marginTop: 30
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikBold,
                                        color: colors.$iconDark,
                                        fontSize: 22,
                                    }}>
                                    {'App Patent Registration'}
                                </Text>
                            </View>

                            <View
                                style={{
                                    paddingLeft: 13,
                                    paddingRight: 13,
                                    marginTop: 15
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikMedium,
                                        color: '#6A6A6A',
                                        fontSize: 13,
                                    }}>
                                    {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr. Sed diam nonumy eirmod tempor invidunt ut labore.\n\n\n dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n\n\n Lorem ipsum dolor sit amet, consetetur sadipscing elitr. Sed diam nonumy eirmod tempor invidunt ut labore.'}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('ChatEmailPdfView');
                                }}>
                                <View
                                    style={{
                                        marginTop: 20,
                                        borderRadius: 20,
                                        backgroundColor: '#54E5FF',
                                        padding: 12,
                                    }}>
                                    <View
                                        style={{                                        
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <View
                                            style={{
                                                width: 32,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Image source={images.pdf} />
                                            <Text
                                                style={{
                                                    fontFamily: fonts.$rubikRegular,
                                                    color: colors.$white,
                                                    fontSize: 11,
                                                }}>
                                                {'PDF'}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                // alignItems: 'center',
                                                justifyContent: 'center',
                                                paddingLeft: 15,
                                            }}>
                                            <Text
                                                style={{
                                                    fontFamily: fonts.$rubikBold,
                                                    color: colors.$white,
                                                    fontSize: 15,
                                                }}>
                                                {'App Patent Registration.pdf'}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: fonts.$rubikRegular,
                                                    color: colors.$white,
                                                    fontSize: 11,
                                                }}>
                                                {'208.3 kb'}
                                            </Text>
                                        </View>
                                        <TouchableOpacity>
                                            <View
                                                style={{
                                                    width: 32,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <Image source={images.eyeWhite} />
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View
                                                style={{
                                                    width: 32,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <Image source={images.down} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* {
                                    ready &&
                                    <View style={{height: 2800}}>
                                        <Pdf horizontal  style={{}} source={cachePath} />
                                    </View>
                                } */}
                            </TouchableOpacity>
                        </CCard>
                    </ScrollView>
                </View>      
                <CBottomEmailDetailBar active={'Messages'}/>
            </View>
        </SafeAreaView>
    )
}

export default ChatEmailDetail