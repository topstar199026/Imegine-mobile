import { useNavigation } from '@react-navigation/native';
import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flex, _size, _style } from 'src/modules/Style';

var styles = controlBarPosition => StyleSheet.create({
    bottomBar: controlBarPosition === 'left' ? 
        {
            position: 'absolute',
            top: 0,
            left: 0,
            width: 60,
            height: '100%',
            backgroundColor: colors.$white,
            display: 'flex',
            flexDirection: 'column',
            shadowColor: colors.$secondaryBlue,
            shadowOffset: {
                width: 2,
                height: 2,
            },
            shadowOpacity: 0.9,
            shadowRadius: 2,
            
            elevation: 12,
        }
        :
        {
            position: 'absolute',
            top: 0,
            right: 0,
            width: 60,
            height: '100%',
            backgroundColor: colors.$white,
            display: 'flex',
            flexDirection: 'column',
            shadowColor: colors.$secondaryBlue,
            shadowOffset: {
                width: 2,
                height: 2,
            },
            shadowOpacity: 0.9,
            shadowRadius: 2,
            
            elevation: 12,
        }
    ,
});

const tabs = [
    {
        title: 'Social',
        icon: [
            images.size4.bar.socialBlue4x,
            images.size4.bar.socialWhite4x,
        ],
        size: [18.17, 17.85],
        action: 'Social'
    },
    // {
    //     title: 'Contacts',
    //     icon: 'contacts',
    //     action: 'Contact'
    // },
    {
        title: 'ToDo',
        icon: [
            images.size4.bar.todoBlue4x,
            images.size4.bar.todoWhite4x,
        ],
        size: [20, 18],
        action: 'Todo'
    },
    
    {
        title: 'Wallet',
        icon: [
            images.size4.bar.walletBlue4x,
            images.size4.bar.walletWhite4x,
        ],
        size: [20.25, 20.05],
        action: 'Wallet'
    },
    {
        title: 'Planner',
        icon: [
            images.size4.bar.plannerBlue4x,
            images.size4.bar.plannerWhite4x,
        ],
        size: [19.93, 21.05],
        action: 'Planner'
    },
    {
        title: 'Messages',
        icon: [
            images.size4.bar.messageBlue4x,
            images.size4.bar.messageWhite4x,
        ],
        size: [20.93, 16.36],
        action: 'Message'
    },
    {
        title: 'Me',
        icon: [
            images.size4.bar.accountBlue4x,
            images.size4.bar.accountWhite4x,
        ],
        size: [19.14, 19.14],
        action: 'Me'
    }
];

const CTab = (props) => {
    return (
        <TouchableOpacity
            style={_style([
                {
                    height: 60,
                }
            ])}
            onPress={() => props.onPress()}>
            <View
                style={_style([{
                        flex: 1,
                        width: '100%',
                    },
                    _flex,
                    _center,
                    props.active === props.children ?{
                        backgroundColor: '#54E5FF',
                    }:{}
                ])}>
                <View
                    style={_style([{
                            display: 'flex',
                        },
                        _size(31, 31),
                        _center,
                    ])}>
                    <Image 
                        width={30} height={30}
                        resizeMode={'cover'}
                        source={
                            props.active === props.children ?
                            props.icon[1]
                            :
                            props.icon[0]
                        }
                        style={_style([
                            {
                                margin: 0
                            },
                            _size(props.size[0], props.size[1]),
                        ])}
                    />
                    {/* <Image 
                        width={30} height={30} 
                        source={images[
                            props.active === props.children ?
                            props.icon + 'White'
                            :
                            props.icon + 'Blue'
                        ]}
                        style={{
                            margin: 0
                        }}
                    /> */}

                </View>
            </View>
        </TouchableOpacity>
    );
}

const CMainLeftBar = (props) => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    const navigation = useNavigation();
    return (
        <View style={[styles(controlBarPosition).bottomBar]}>
            <View
                style={_style([
                    {
                        flex: 1,
                        paddingTop: 15,
                        paddingLeft: 20,
                    }
                ])}>
                {
                    props.back && props.back === true && 
                    <TouchableOpacity
                        onPress={() => 
                            navigation.goBack()
                        }>
                        <View>
                            <Image 
                                width={24} height={24} 
                                source={images.backBlue}
                                style={{
                                    margin: 0
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                }
            </View>
            {
                tabs.map((tab, index) => 
                    <CTab 
                        onPress={() => props.switchHome(tab.action)}
                        active={props.active}
                        key={index}
                        icon={tab.icon}
                        size={tab.size}>
                        {tab.title}
                    </CTab>
                )
            }
            <View style={{flex: 1}} />
        </View>
    );
};

export default CMainLeftBar;
