import { View } from 'native-base';
import React, {useState} from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from "react-native" ;
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import { useNavigation } from '@react-navigation/native';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 57,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(100),
        backgroundColor: colors.$white,
        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 11,
            height: 11,
        },
        shadowOpacity: 0.9,
        shadowRadius: 55,        
        elevation: 25,
    },
    subBar1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subBar2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 4,
    },
    subView: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    subText: {
        fontFamily: fonts.$rubikMedium,
        fontSize: 12,
        color: colors.$secondaryBlue,
        opacity: 0.6
    },
    selectedSubView: {
        backgroundColor: '#54E5FF',
        borderRadius: 13,

    },
    selectedSubText: {
        opacity: 1,
    }
});

const CTopWalletInvoiceDetailBar = (props) => {    

    const [favorite, setFavorite] = useState(false);
    const onPress = (s) => {
        props.handleTypeActive(s);
    }
    return (
        <View style={[styles.topBar]}>
            <View style={[styles.subBar1]}>
                <TouchableOpacity onPress={()=>{props.navigation.goBack()}}>
                    <View style={{
                        width: 30,
                        paddingLeft: 24
                        }}>
                            <Image source={images.back} />
                    </View>
                </TouchableOpacity>
                <View style={{
                    width: 80,
                    paddingLeft: 15
                    }}>
                    <TouchableOpacity>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikMedium,
                                fontSize: 16,
                                color: colors.$secondaryBlue,
                            }}>
                            {'Invoices'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    }}>
                    <Text style={{
                        fontFamily: fonts.$rubikMedium,
                        fontSize: 20,
                        color: colors.$secondaryBlue
                        }}>
                        {'Pablo (Jun. 22)'}
                    </Text>
                </View>
                <View style={{
                    width: 49,
                    }}>
                    <TouchableOpacity onPress={() => {setFavorite(!favorite)}}>
                        <Image source={images.starBlank} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    width: 49,
                    }}>
                    <TouchableOpacity onPress={() => {setFavorite(!favorite)}}>
                        <Image source={images.uploadBlueWallet} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CTopWalletInvoiceDetailBar;
