import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import {Text, StyleSheet} from "react-native" ;
import Slider from "@brlja/react-native-slider";
import {useSelector} from 'react-redux';

import {colors, fonts} from 'src/assets/themes';
import { _center, _flex, _flexRow, _font, _style } from 'src/modules/Style';

const CWeekSliderBar = (props) => {

    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    const scrollEvent = props.scrollEvent;
    
    const [value, setValue] = useState(1);

    const [opc, setOpc] = useState(0.2);

    useEffect(() => {
        props.changeWeekRange && props.changeWeekRange(value);
    }, [value])

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
        <View style={{
            position: 'absolute',
            bottom: controlBarPosition !== 'bottom' ? 0 : 45,
            width: '90%',
            opacity: opc,
            
            shadowColor: colors.$secondaryBlue,
            shadowOffset: {
                width: 11,
                height: 11,
            },
            shadowOpacity: 0.9,
            shadowRadius: 55,        
            elevation: 25,
        }}>
            <Slider
                minimumValue={0}
                maximumValue={2}
                step={1}
                value={value}
                thumbTintColor={colors.$secondaryBlue}
                minimumTrackTintColor={'#54E5FF'}
                onValueChange={value => setValue(value) }
                onSlidingStart={() => {
                    setOpc(1);
                }}
                onSlidingComplete={() => {
                    setTimeout(() => {
                        setOpc(0.2);
                    }, 1000);
                }}
            />
            <View
                style={_style([
                    {
                        width: '100%',
                    },
                    _flexRow,
                    _center,
                ])}>
                <View
                    style={{flex: 1}}>
                    <Text 
                        style={_style([
                            {
                            },
                            _font(fonts.$rubikBold, colors.$secondaryBlue, 12)
                        ])}>
                        {'2 Days'}
                    </Text>
                </View>
                <View
                    style={_style([
                        {
                            flex: 1,
                            alignItems: 'center',
                        },
                    ])}>
                    <Text 
                        style={_style([
                            {
                            },
                            _font(fonts.$rubikBold, colors.$secondaryBlue, 12)
                        ])}>
                        {'7 Days'}
                    </Text>
                </View>
                <View
                    style={_style([
                        {
                            flex: 1,
                        },
                        _flex,
                    ])}>
                    <Text 
                        style={_style([
                            {
                                textAlign: 'right'
                            },
                            _font(fonts.$rubikBold, colors.$secondaryBlue, 12),
                            
                        ])}>
                        {'14 Days'}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default CWeekSliderBar;
