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
        height: 79,
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
        fontSize: 13,
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

const CTopMessageBar2 = (props) => {    

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
                    width: 30,
                    paddingLeft: 15
                    }}>
                    <TouchableOpacity>
                        <Image source={images.contact} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('BusinessProfile');
                        }} >
                        <Text style={{
                            fontFamily: fonts.$rubikMedium,
                            fontSize: 19,
                            color: colors.$secondaryBlue
                            }}>
                            {'Dr. John Smith'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    width: 49,
                    }}>
                    <TouchableOpacity>
                        <Image source={images.video} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    width: 53,
                    }}>
                    <TouchableOpacity>
                        <Image source={images.phone} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.subBar2]}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: colors.$searchFilter,
                    height:23,
                    width: wp(60),
                    borderRadius: 13,
                    }}>
                    <TouchableOpacity style={[styles.subView, props.activeType === 'all' ? styles.selectedSubView : []]} onPress={() => onPress('all')}>
                        <View 
                            style={[styles.subView]}
                            >
                            <Text style={[styles.subText, props.activeType === 'all' ? styles.selectedSubText : []]}>{'All'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.subView, props.activeType === 'messages' ? styles.selectedSubView : []]} onPress={() => onPress('messages')}>
                        <View 
                            style={[styles.subView]}
                            >
                            <Text style={[styles.subText, props.activeType === 'messages' ? styles.selectedSubView : []]}>{'Messages'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.subView, props.activeType === 'emails' ? styles.selectedSubView : []]} onPress={() => onPress('emails')}>
                        <View 
                            style={[styles.subView]}
                            >
                            <Text style={[styles.subText, props.activeType === 'emails' ? styles.selectedSubText : []]}>{'Emails'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    );
};

export default CTopMessageBar2;
