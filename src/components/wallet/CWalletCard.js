import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _font, _size, _style } from 'src/modules/Style';
import { textAlign } from 'styled-system';

var styles = StyleSheet.create({
    container: {
        width: 166,
        height: 90,
        borderRadius: 20,
        backgroundColor: colors.$secondaryBlue,

        display: 'flex',
        flexDirection: 'column',

        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 2,

        padding: 17,
        
    },
});

const CWalletCard = (props) => {
    
    const {item} = props.data;

    const IconImage = (type) => {
        switch (type) {
            case '0':
                return <Image source={images.size4.wallet.card.card0} style={_style([_size(24, 24)])} />
            case '1':
                return <Image source={images.size4.wallet.card.card1} style={_style([_size(24, 24)])} />
            case '2':
                return <Image source={images.size4.wallet.card.card2} style={_style([_size(24, 24)])} />
            case '3':
                return <Image source={images.size4.wallet.card.card3} style={_style([_size(24, 24)])} />
        }
    }

    const TitleText = (type) => {
        switch (type) {
            case '0':
                return 'Warranties';
            case '1':
                return 'Contracts';
            case '2':
                return 'Invoices';
            case '3':
                return 'Boarding Pa';
        }
    }

    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            <View 
                style={_style([
                    styles.container, props.style, 
                    {
                        marginLeft: item.type === '0' ? 15 : 4,
                        marginRight: item.type === '3' ? 15 : 4,
                    },
                ])}>
                <View
                    style={_style([
                        {
                            paddingLeft: 2,
                        }
                    ])}>
                    {IconImage(item.type)}
                </View>
                <View>
                    <Text
                        style={_style([{
                                marginTop: 0,
                            },
                            _font(fonts.$rubikBold, colors.$white, 19)
                        ])}>
                        {TitleText(item.type)}
                    </Text>
                </View>
                <View
                    style={_style([
                        {
                            marginTop: 3,
                        }
                    ])}>
                    <Text
                        style={_style([{
                            },
                            _font(fonts.$rubikRegular, colors.$white, 13)
                        ])}>
                        {'('}{item.count}{')'} {'This month'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CWalletCard;
