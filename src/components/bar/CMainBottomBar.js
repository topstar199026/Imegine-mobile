import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flex, _size, _style } from 'src/modules/Style';

var styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 57,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: wp(100),
        backgroundColor: colors.$white,
        display: 'flex',
        flexDirection: 'row',
        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 11,
            height: 11,
        },
        shadowOpacity: 0.9,
        shadowRadius: 55,
        
        elevation: 25,
    },
});

const tabs = [
    {
        title: 'Social',
        icon: [
            images.size4.bar.socialBlue4x,
            images.size4.bar.socialGreen4x,
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
            images.size4.bar.todoGreen4x,
        ],
        size: [20, 18],
        action: 'Todo'
    },
    
    {
        title: 'Wallet',
        icon: [
            images.size4.bar.walletBlue4x,
            images.size4.bar.walletGreen4x,
        ],
        size: [20.25, 20.05],
        action: 'Wallet'
    },
    {
        title: 'Planner',
        icon: [
            images.size4.bar.plannerBlue4x,
            images.size4.bar.plannerGreen4x,
        ],
        size: [19.93, 21.05],
        action: 'Planner'
    },
    {
        title: 'Messages',
        icon: [
            images.size4.bar.messageBlue4x,
            images.size4.bar.messageGreen4x,
        ],
        size: [20.93, 16.36],
        action: 'Message'
    },
    {
        title: 'Me',
        icon: [
            images.size4.bar.accountBlue4x,
            images.size4.bar.accountGreen4x,
        ],
        size: [19.14, 19.14],
        action: 'Me'
    }
];

const CTab = (props) => {

    // console.log(props)
    return (
        <TouchableOpacity
            style={_style([
                {
                    flex: 1,
                    alignItems: 'center'
                }
            ])}
            onPress={() => props.onPress()}>
            <View
                style={_style([
                    {
                        flex: 1,
                        alignItems: 'center'
                    }
                ])}>
                <View
                    style={_style([
                        {
                            marginTop: 3,
                        },
                        _size(31, 31),
                        _flex,
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

                </View>
                <Text
                    style={_style([
                        {
                            flex: 1,
                            textAlign: 'center',
                            fontFamily: fonts.$rubikRegular,
                            fontSize: 13,
                            marginTop: -3,
                            color: props.active === props.children ? '#54E5FF' : colors.$secondaryBlue
                        },
                    ])}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
const CMainBottomBar = (props) => {

    return (
        <View style={[styles.bottomBar]}>
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
        </View>
    );
};

export default CMainBottomBar;
