import { useNavigation } from '@react-navigation/core';
import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _font, _size, _style } from 'src/modules/Style';
import { position, textAlign } from 'styled-system';

var styles = StyleSheet.create({
    container: {
        width: 46,
        height: 68,
        // borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#F0F0F0',
        // marginTop: 9,
        // marginBottom: 9,
        // marginLeft: 2,
        // marginRight: 2,

        display: 'flex',
        // flexDirection: 'row',

        // shadowColor: colors.$secondaryBlue,
        // shadowOffset: {
        //     width: 3,
        //     height: 3,
        // },
        // shadowOpacity: 0.5,
        // shadowRadius: 1,        
        // elevation: 6,
    },
});

const CContactGroupItem = (props) => {
    const navigation = useNavigation();

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function imagePath (item) {
        return {
            uri: 
                item.contactImage ?
                'https://imegine-app.fra1.digitaloceanspaces.com/' + item.contactImage
                :
                'https://imegine-app.fra1.digitaloceanspaces.com/avatar/no-user-image'
        };
    };

    return (
        <TouchableOpacity onPress={() => {
                props.onPress && props.onPress(props.item.contactId);
            }}>
            <View style={_style([
                    styles.container, 
                    props.style,
                    {
                        // marginLeft: props.id * 1 > 0 ? 10 : 4,
                        // marginRight: 4,
                    },
                ])}>
                <View
                    style={_style([
                        _center,
                        _size(46, 46),
                        props.container1Style,
                    ])}>                    
                    <View
                        style={_style([
                            {
                                backgroundColor: colors.$white,
                                borderRadius: 23,
                                shadowColor: colors.$secondaryBlue,
                                shadowOffset: {
                                    width: 3,
                                    height: 3,
                                },
                                shadowOpacity: 0.5,
                                shadowRadius: 1,        
                                elevation: 6,
                            },
                            _center,
                            _size(46, 46)
                        ])}>
                        <View
                            style={_style([
                                {
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    backgroundColor: colors.$secondaryBlue,
                                    borderRadius: 8,
                                    zIndex: 1,
                                },
                                _center,
                                _size(16, 16),
                            ])}>
                            <Image style={_style([
                                _size(14, 14),
                            ])} source={images.closeWhite} />
                        </View>
                        <Image style={_style([
                                {
                                    borderRadius: 20,
                                },
                                _size(40, 40),
                            ])} 
                            // source={images.avatarN} 
                            source={imagePath(props.item)}
                        />
                    </View>
                   
                </View>
                <View
                    style={_style([
                        {
                            maxHeight: 15,
                        },
                        props.container2Style,
                    ])}>
                    <Text
                        style={_style([
                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 13)
                        ])}>
                        {
                            props.item.firstName ?
                            capitalize(props.item.firstName)
                            :
                            props.item.nickName ? 
                            capitalize(props.item.nickName)
                            :
                            props.item.contactId
                        }
                        {/* {capitalize(props.item.firstName)} */}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CContactGroupItem;
