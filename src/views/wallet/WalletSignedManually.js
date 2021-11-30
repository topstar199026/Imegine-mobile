import React, { useEffect, useState } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image, TouchableOpacity} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {Dirs, FileSystem} from 'react-native-file-access';

import {colors, fonts, images} from 'src/assets/themes';
import CTopWalletInvoiceDetailBar from 'src/components/bar/CTopWalletInvoiceDetailBar';
import CBottomBar from 'src/components/bar/CBottomBar';
import CScreenButton from 'src/components/CScreenButton';
import CGoBackButton from 'src/components/wallet/CGoBackButton';
import CSignWithModal from 'src/components/modal/CSignWithModal';

var styles = StyleSheet.create({
    
});



const WalletSignedManually = (props) => {
    
    const signData = props.route.params.signData;
    console.log('signData', signData);

    const cachePath = `${Dirs.CacheDir}/sign.png`;

    const navigation = useNavigation();

    const [signWithVisible, setSignWithVisible] = useState(false);

    useEffect(async () => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);

        console.log('sign file check', FileSystem.exists(cachePath));
    }, [])

    const switchHome =(action) => {
        navigation.navigate(action);
    }

    const closeSignWithModal = (type) => {
        toggleSignWithModal();
        switch (type) {
            case '':
                break;
            case 'fingerprint':

                break;
            case 'manually':
                navigation.navigate('WalletSignManually');
                break;
            default:
                break;
        }
    }

    const toggleSignWithModal = () => {
        setSignWithVisible(!signWithVisible);
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
                <CTopWalletInvoiceDetailBar navigation={navigation} />
                <View
                    style={{
                        width: wp(100),
                        paddingTop: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // paddingBottom: 47,
                    }}>
                    <ScrollView>
                        <View
                            style={{
                                borderRadius: 10,
                                width: wp(97),
                                backgroundColor: colors.$white,
                                shadowColor: colors.$bubbles,
                                shadowOffset: {
                                    width: 4,
                                    height: 4,
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 10,
                                
                                elevation: 3,
                                // height: 900,
                                padding: wp(5),
                                paddingTop: 30,
                            }}>
                            <View>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikMedium,
                                        fontSize: 17,
                                        color: colors.$secondaryBlue,
                                    }}>
                                    {'Pablo Zehle'}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikRegular,
                                        fontSize: 13,
                                        color: colors.$secondaryBlue,
                                    }}>
                                    {'Lorem ipsum dolor sit'}
                                </Text>
                            </View>
                            <View
                                style={{
                                    alignItems: 'flex-end',
                                    // justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        marginTop: 15,
                                        fontFamily: fonts.$rubikMedium,
                                        fontSize: 15,
                                        color: colors.$secondaryBlue,
                                    }}>
                                    {'Invoice 43435323432332'}
                                </Text>
                                <Text
                                    style={{
                                        marginTop: 5,
                                        fontFamily: fonts.$rubikRegular,
                                        fontSize: 13,
                                        color: colors.$secondaryBlue,
                                    }}>
                                    {'Date 06/04/2021'}
                                </Text>
                            </View>
                            <View 
                                style={{
                                    marginTop: 12,
                                    borderWidth: 1,
                                    borderColor: '#000000',
                                    opacity: 0.16,
                                }}
                            />
                            <View
                                style={{

                                }}>
                                <View
                                    style={{
                                        marginTop: 15,
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: fonts.$rubikRegular,
                                                fontSize: 13,
                                                color: colors.$secondaryBlue,
                                            }}>
                                            {'App design'}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                fontFamily: fonts.$rubikRegular,
                                                fontSize: 13,
                                                color: colors.$secondaryBlue,
                                            }}>
                                            {'$350.00'}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginTop: 15,
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: fonts.$rubikRegular,
                                                fontSize: 13,
                                                color: colors.$secondaryBlue,
                                            }}>
                                            {'App Development'}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                fontFamily: fonts.$rubikRegular,
                                                fontSize: 13,
                                                color: colors.$secondaryBlue,
                                            }}>
                                            {'$1750.00'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    paddingLeft: wp(40),
                                }}>
                                <View
                                    style={{
                                        marginTop: 30,
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,                                            
                                            alignItems: 'flex-end'
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: fonts.$rubikMedium,
                                                fontSize: 15,
                                                color: colors.$secondaryBlue,
                                            }}>
                                            {'SubTotal:'}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            width: 100,                                 
                                            alignItems: 'flex-end'
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: fonts.$rubikRegular,
                                                fontSize: 13,
                                                color: colors.$secondaryBlue,
                                            }}>
                                            {'$1350.00'}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginTop: 15,
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'flex-end'
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: fonts.$rubikMedium,
                                                fontSize: 15,
                                                color: colors.$secondaryBlue,
                                            }}>
                                            {'Tax:'}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            width: 100,                                 
                                            alignItems: 'flex-end'
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: fonts.$rubikRegular,
                                                fontSize: 13,
                                                color: colors.$secondaryBlue,
                                            }}>
                                            {'$1350.00'}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginTop: 30,
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'flex-end'
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: fonts.$rubikMedium,
                                                fontSize: 17,
                                                color: colors.$secondaryBlue,
                                            }}>
                                            {'Total:'}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            width: 100,                                 
                                            alignItems: 'flex-end'
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: fonts.$rubikRegular,
                                                fontSize: 17,
                                                color: colors.$secondaryBlue,
                                            }}>
                                            {'$1350.00'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <TouchableOpacity onPress={() => toggleSignWithModal()}>
                                    <View
                                        style={{
                                            marginTop: 89,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Image 
                                            style={{
                                                width: wp(50),
                                                height: 90,
                                                resizeMode: 'contain',
                                            }} 
                                            source={{uri: signData}} 
                                        />
                                    </View>
                                </TouchableOpacity>
                                <View 
                                    style={{
                                        marginTop: 10,
                                        width: wp(50),
                                        borderWidth: 0.5,
                                        borderColor: '#707070',
                                    }}
                                />
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            marginTop: 9,
                                            fontFamily: fonts.$rubikRegular,
                                            fontSize: 17,
                                            color: colors.$secondaryBlue,
                                        }}>
                                        {'Jose Luis Garcia'}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: fonts.$rubikRegular,
                                            fontSize: 13,
                                            color: colors.$secondaryBlue,
                                        }}>
                                        {'ID: '}{'ES2343423435434'}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        marginTop: 48,
                                    }}>
                                    <CGoBackButton onPress={() => {
                                        navigation.goBack()
                                        }}>
                                        {'GO BACK'}
                                    </CGoBackButton>
                                </View>
                            </View>
                            
                        </View>
                    </ScrollView>
                </View>
                <CBottomBar active={'Wallet'} switchHome={(action) => switchHome(action)} />
                <CSignWithModal 
                    visible={signWithVisible} 
                    handleModalClose={(type) => closeSignWithModal(type)}    
                />
            </View>
        </SafeAreaView>
    )
}

export default WalletSignedManually