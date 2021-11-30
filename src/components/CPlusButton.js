import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import {Text, TouchableOpacity, StyleSheet, Image} from "react-native" ;
import {useSelector} from 'react-redux';

import {colors, fonts, images} from 'src/assets/themes';
import { _center, _flex, _size, _style } from 'src/modules/Style';

var styles = StyleSheet.create({
    button: {        
        height: 56,
        width: 56,
        padding: 9,
        textAlign: 'center',
        color: colors.$white,
        fontFamily: fonts.$robotBold,
        fontSize: 28,
    }
});

const CPlusButton = (props) => {

    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);

    const [value, setValue] = useState(1);

    const [opc, setOpc] = useState(0.4);

    const scrollEvent = props.scrollEvent;

    useEffect(() => {
        let timer;
        if(scrollEvent) {
            setOpc(1);
            timer = setTimeout(() => {
                setOpc(0.4);
            }, 3000);
        }
        return () => {
            timer && clearTimeout(timer);
        }
    }, [scrollEvent])
    
    return (
        <View 
            style={_style([
                {
                    position: 'absolute',
                    bottom: controlBarPosition !== 'bottom' ? 55 : 100,
                    borderRadius: 28,
                    shadowColor: colors.$secondaryBlue,
                    shadowOffset: {
                        width: 11,
                        height: 11,
                    },
                    shadowOpacity: 0.9,
                    shadowRadius: 55,        
                    elevation: 25,

                    opacity: opc,
                },
                _size(57, 57),
            ])}>
            <TouchableOpacity 
                onPress={() => {
                    props.onPress && props.onPress();
                    setOpc(1);
                    setTimeout(() => {
                        setOpc(0.4);
                    }, 1000);
                }}>
                <View 
                    style={_style([
                        {
                            borderRadius: 28,
                            backgroundColor: '#54E5FF',
                        },
                        _flex,
                        _center,
                        _size(57, 57),
                    ])}>
                    <Image source={images.size4.planner.plusWhite4x} style={_style([_size(24, 24)])} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CPlusButton;
