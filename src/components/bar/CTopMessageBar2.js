import { View } from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from "react-native" ;
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {colors, images, fonts} from 'src/assets/themes';
import { _flexRow, _font, _size, _style } from 'src/modules/Style';

var styles = StyleSheet.create({
    topBar: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    const navigation = useNavigation();
    
    const contactInfo = props.data.contactInfo;
    const groupInfo = props.data.groupInfo;

    const [title, setTitle] = useState('');
    
    useEffect(() => {
        
        if(groupInfo) {
            let _isPrivate = groupInfo.private;
            if(_isPrivate === true) {
                setTitle(
                    contactInfo.firstName ? 
                    capitalize(contactInfo.firstName) + ' ' + capitalize(contactInfo.lastName)
                    :
                    contactInfo.nickName + ' (*)'
                );
            } else {
                setTitle(groupInfo.groupName);
            }
        } else {
            let _isGroup = contactInfo.isGroup;
            if(_isGroup) {
                setTitle(
                    contactInfo.contactName
                );
            }else{
                setTitle(
                    contactInfo.firstName ? 
                    capitalize(contactInfo.firstName) + ' ' + capitalize(contactInfo.lastName)
                    :
                    contactInfo.nickName + ' (*)'
                );
            }
            
        }
        
    }, [])

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    const onPress = (s) => {
        props.handleTypeActive(s);
    }
    
    return (
        <View style={[styles.topBar]}>
            <View style={[styles.subBar1]}>
                {
                    controlBarPosition === 'bottom' &&
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <View 
                            style={_style([
                                {
                                    width: 30,
                                    paddingLeft: 15
                                }
                            ])}>
                            <Image style={_style([_size(24, 24)])} source={images.size4.topBar.backBlue4x} />
                        </View>
                    </TouchableOpacity>
                }
                <View 
                    style={_style([
                        {
                            flex: 1,
                            alignItems: 'center',
                        }
                    ])}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('BusinessProfile');
                        }} >
                        <Text 
                            style={_style([
                                {
                                },
                                _font(fonts.$rubikMedium, colors.$secondaryBlue, 20)
                            ])}>
                            {
                                title
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
                <View 
                    style={_style([
                        {
                            width: 40,
                        }
                    ])}>
                    <TouchableOpacity>
                        <Image style={_style([_size(24.72, 16.48)])} source={images.size4.topBar.message.videoBlue4x} />
                    </TouchableOpacity>
                </View>
                <View 
                    style={_style([
                        {
                            width: 40,
                        }
                    ])}>
                    <TouchableOpacity>
                        <Image style={_style([_size(18.08, 18.84)])} source={images.size4.topBar.message.phoneBlue4x} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.subBar2]}>
                <View 
                    style={_style([
                        {
                            display: 'flex',
                            flexDirection: 'row',
                            backgroundColor: colors.$searchFilter,
                            borderRadius: 13,
                        },
                        _size(250, 23),
                        _flexRow,
                    ])}>
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
                            <Text style={[styles.subText, props.activeType === 'emails' ? styles.selectedSubText : []]}>{'R-mails'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    );
};

export default CTopMessageBar2;
