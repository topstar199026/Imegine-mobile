import React, { useEffect } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import {colors, fonts, images} from 'src/assets/themes';
import CTopWalletDetailBar from 'src/components/bar/CTopWalletDetailBar';
import CBottomBar from 'src/components/bar/CBottomBar';

var styles = StyleSheet.create({
    
});



const WalletCardInfo = () => {
    const navigation = useNavigation();

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    const switchHome =(action) => {
        navigation.navigate(action);
    }

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
                <CTopWalletDetailBar navigation={navigation} />
                <View
                    style={{
                        width: wp(100),
                        paddingTop: 15,
                        // paddingBottom: 47,
                    }}>
                    <ScrollView>
                        <View
                            style={{
                                marginTop: 15,
                                borderTopLeftRadius: 25,
                                borderTopRightRadius: 25,
                                width: wp(100),
                                backgroundColor: colors.$white,
                                shadowColor: colors.$secondaryBlue,
                                shadowOffset: {
                                    width: 4,
                                    height: 4,
                                },
                                shadowOpacity: 0.9,
                                shadowRadius: 55,
                                
                                elevation: 3,
                                // height: 900,
                                padding: wp(5)
                            }}>
                            <View>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikMedium,
                                        fontSize: 17,
                                        color: colors.$secondaryBlue,
                                    }}>
                                    {'Citizen ID'}
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginTop: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Image 
                                    style={{
                                        width: wp(90),
                                    }}
                                    source={images.emptyIdCardWallet} />
                            </View>

                            <View
                                style={{                                    
                                    marginTop: 15,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikMedium,
                                        fontSize: 17,
                                        color: colors.$secondaryBlue,
                                    }}>
                                    {'Driver ID'}
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginTop: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Image 
                                    style={{
                                        width: wp(90),
                                    }}
                                    source={images.emptyIdCardWallet} />
                            </View>

                            <View
                                style={{                                    
                                    marginTop: 15,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikMedium,
                                        fontSize: 17,
                                        color: colors.$secondaryBlue,
                                    }}>
                                    {'Super Market Card'}
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginTop: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Image 
                                    style={{
                                        width: wp(90),
                                    }}
                                    source={images.emptyIdCardWallet} />
                            </View>
                                    
                            
                        </View>
                    </ScrollView>
                </View>
                <CBottomBar active={'Wallet'} switchHome={(action) => switchHome(action)} />
            </View>
        </SafeAreaView>
    )
}

export default WalletCardInfo