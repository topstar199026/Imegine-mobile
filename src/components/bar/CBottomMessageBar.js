import { View } from 'native-base';
import React, { Component, useState } from 'react';
import {Image, TouchableOpacity, StyleSheet, TextInput} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import debounce from "lodash/debounce";

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flexRow, _size, _style } from 'src/modules/Style';

var styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 79,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
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
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    input: {
        height: 28,
        backgroundColor: colors.$transparent,
        fontFamily: fonts.$rubikMedium,
        fontSize: 14,
        paddingTop: 0,
        paddingLeft: 15,
        color: colors.$secondaryBlue, //colors.$textSecondary
    }
});

export default class CBottomMessageBar extends Component {

    constructor() {
        super();
        this.state = { 
            isTyping: false, 
            message: "" 
        };
        // @ts-ignore
        this.handleMessageChange = this.handleMessageChange.bind(this);
    }    

    handleTyping = debounce(function () {
        this.setState({ isTyping: false });
        this.props.handleTyping(false);
    }, 500);

    handleMessageChange (t) {
        this.props.handleTyping(true);
        this.setState({
            isTyping: true,
            message: t,
        }, () => {
            this.handleTyping();
        })
    }

    handleSend () {
        this.props.handleSend && this.props.handleSend(this.state.message);
        this.setState({
            message: '',
        })
    }

    render() {
        return (
            <View 
                style={_style([
                    styles.bottomBar,
                    {
                        left: this.props.controlBarPosition === 'left' || this.props.controlBarPosition === 'right' ? 2 : 0,
                        width: this.props.controlBarPosition === 'left' || this.props.controlBarPosition === 'right' ? wp(100) - 64 : '100%',
                    }
                ])}>
                <View 
                    style={_style([
                        {
                            width: 42,
                        },
                        _center,
                    ])}>
                    <TouchableOpacity>
                        <Image source={images.size4.message.plusBlue4x} style={_style([_size(32, 32)])} />
                    </TouchableOpacity>
                </View>
                <View 
                    style={_style([
                        {
                            flex: 1,
                        },
                        _center,
                    ])}>
                    <View
                        style={_style([
                            {
                                borderRadius: 20,
                                borderWidth: 3,
                                borderColor: colors.$secondaryBlue,// 'rgba(77, 77, 77, 0.45)',
                            },
                            _size('100%', 38),
                            _flexRow,
                            _center
                        ])}>
                        <View style={{flex: 1, paddingTop: 11}}>
                            <TextInput 
                                placeholder={this.props.placeholder || "Type your message"}
                                style={styles.input}                
                                underlineColorAndroid={colors.$transparent}
                                onChangeText={(t) => this.handleMessageChange(t)}
                                value={this.state.message}
                            />
                        </View>
                        <TouchableOpacity>
                            <View style={{width: 33}}>
                                <Image style={{}} source={images.screen} />
    
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View 
                    style={_style([
                        {
                            width: 60,
                        },
                        _center,
                    ])}>
                    <TouchableOpacity onPress={() => this.handleSend()}>
                        <View 
                            style={_style([
                                {
                                    borderRadius: 20,
                                    backgroundColor: '#54E5FF',
                                },
                                _size(40, 40),
                                _center,
                            ])}>
                            <Image source={images.size4.message.senderWhite4x} style={_style([_size(15.5, 18.1), {resizeMode: 'contain'}])} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}