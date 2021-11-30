import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';

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
        title: 'Contacts',
        icon: 'contacts',
        action: 'Contact'
    },
    {
        title: 'Messages',
        icon: 'messages',
        action: 'Message'
    },
    {
        title: 'Planner',
        icon: 'planner',
        action: 'Planner'
    },
    {
        title: 'Wallet',
        icon: 'wallet',
        action: 'Wallet'
    },
    {
        title: 'Me',
        icon: 'me',
        action: 'Me'
    }
];

const CTab = (props) => {
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                alignItems: 'center'
            }}
            onPress={() => props.onPress()}
            >
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                }}
                >
                <View
                    style={{
                        width: 31,
                        height: 31,
                        marginTop: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    >
                    <Image 
                        width={30} height={30} 
                        source={images[
                            props.active === props.children ?
                            props.icon + '2'
                            :
                            props.icon + '1'
                        ]}
                        style={{
                            margin: 0
                        }}
                    />

                </View>
                <Text
                     style={{
                        flex: 1,
                        textAlign: 'center',
                        fontFamily: fonts.$rubikRegular,
                        fontSize: 13,
                        marginTop: -3,
                        color: props.active === props.children ? '#54E5FF' : colors.$secondaryBlue
                    }}    
                    >
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
const CBottomBar = (props) => {

    return (
        <View style={[styles.bottomBar]}>
            {
                tabs.map((tab, index) => 
                    <CTab 
                        onPress={() => props.switchHome(tab.action)}
                        active={props.active}
                        key={index}
                        icon={tab.icon}
                        >
                        {tab.title}
                    </CTab>
                )
            }
        </View>
    );
};

export default CBottomBar;
