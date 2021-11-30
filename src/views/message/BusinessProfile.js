import React, { useEffect, useState } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image, TouchableOpacity} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {Dirs, FileSystem} from 'react-native-file-access';
import {useSelector} from 'react-redux';

import {colors, fonts, images} from 'src/assets/themes';
import CBottomEmailDetailBar from 'src/components/bar/CBottomEmailDetailBar';
import CTopEmailDetailBar from 'src/components/bar/CTopEmailDetailBar';
import CCard from 'src/components/CCard';
import CBusinessProfileAction from 'src/components/messages/CBusinessProfileAction';
import CBusinessProfileReview from 'src/components/messages/CBusinessProfileReview';
import WalletFavorite from '../wallet/WalletFavorite';
import CFavoriteDocument from 'src/components/wallet/CFavoriteDocument';
import CFavoriteMessage from 'src/components/messages/CFavoriteMessage';
import CBottomBar from 'src/components/bar/CBottomBar';
import CBusinessProfileImage from 'src/components/messages/CBusinessProfileImage';
import CBusinessProfileMap from 'src/components/messages/CBusinessProfileMap';
import CTopBusinessProfileBar from 'src/components/bar/CTopBusinessProfileBar';
import { _style } from 'src/modules/Style';
import MainLayout from 'src/layouts';

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



const BusinessProfile = () => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const user = useSelector((state) => state.auth.user);
    

    const navigation = useNavigation();

    const [activeType, setActiveType] = useState('all');
    
    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    const onPress =(item) => {
       
    }    

    const handleTypeActive = (s) => {
        
    }

    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'businessProfile'}
            switchHome={(action) => switchHome(action)}
            backFlag={true}
            handleTypeActive={(s) => {}} 
            activeType={activeType}
            data={null}
            >        
            <View
                style={[{
                    height: '100%',
                    paddingTop: 70,
                    paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                    paddingLeft: 0,
                    paddingRight: 0,
                }]}>
                <ScrollView
                    style={{
                        width: '100%',
                        paddingRight: 5,
                    }}>
                    <CCard
                        styles={{
                            padding: 10,
                            width: '100%',
                        }}>
                        
                        <CBusinessProfileImage />
                        <CBusinessProfileAction />
                        <CBusinessProfileReview />
                        <View
                            style={{
                                alignItems: 'center',
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}>
                            <CFavoriteMessage onPress={() => {}} />
                        </View>

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                paddingLeft: 10,
                                paddingRight: 10,
                            }}>
                            <View
                                style={{
                                    alignItems: 'center',
                                    paddingTop: 15,
                                    paddingRight: 15,
                                }}>
                                <Image source={images.userMessage} />
                            </View>
                            <View>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikRegular,
                                        color: colors.$secondaryBlue,
                                        fontSize: 13,
                                        padding : 5,
                                        lineHeight: 17,
                                        paddingRight: 25,
                                    }}>
                                    {'Description: Lorem ipsum dolor sit amet, consetetur sadipscing elitr. Sed diam nonumy eirmod tempor invidunt ut labore.'}
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                paddingLeft: 10,
                                paddingRight: 10,
                            }}>
                            <CBusinessProfileMap />
                        </View>
                        
                        
                        
                    </CCard>
                </ScrollView>
            </View>
        </MainLayout>
    )
}

export default BusinessProfile