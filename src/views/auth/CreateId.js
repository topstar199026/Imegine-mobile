import React, { useEffect, useState, useRef, memo } from 'react';
import {Text, View, StyleSheet, StatusBar, Image, Dimensions, Animated} from "react-native" ;
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

import {colors, images, fonts} from 'src/assets/themes';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { _center, _centerT, _centerV, _flex, _flexCol, _flexRow, _font, _size, _style } from 'src/modules/Style';

var styles = StyleSheet.create({
    linearGradient: {
      flex: 1
    },
    background2: {
        position : 'absolute',
        bottom: 0,
        left: 0,
        width: wp(100),
        height: hp(33),
    },    
});

function makeIdString() {
    
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;

    var data = [...new Array(15)].map((i, j) => {
        return [...new Array(20)].map((k, l) => {
            return characters.charAt(Math.floor(Math.random() * charactersLength));
        });
    })

    return data;
}

  
const ClickButton = (props) => {

    return (
        
        <View 
            style={_style([
                {
                    flex: 1,
                    height: 24,
                },
                _flex,
                _center,
            ])}
            // onLayout={(e)=>props.onLayout(e.nativeEvent.layout)}
            >
            <Text
                style={{
                    textAlign: 'center',
                    fontFamily: fonts.$rubikRegular,
                    fontSize: 17,
                    color: colors.$secondaryBlue,
                }}
            >{props.label}</Text>
        </View>
    );
};

const WIDTH = Dimensions.get("window").width;

const _w = (WIDTH * 0.8 - 19) / 20;
const _h = 24;

const W = WIDTH * 0.8;
const H = 24 * 15 + 19;

const CreateId = (props) => {

    const password = props.route.params.password;
    const nickName = props.route.params.nickName;
    const imagePath = props.route.params.imagePath;
    
    const [userId, setUserID]  = useState('');

    const [pg, setPg] = useState(0);
    const [idString, setstate] = useState(makeIdString());
    
    const [pattern, setPattern] =  useState([]);
    let patterns = [];

    const pinView = useRef();
    const navigation = useNavigation();



    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(false);
        console.log(password, nickName)
    }, [])

    useEffect(() => {
        let _pg = userId.length / 9;
        setPg(_pg > 1 ?  1 : _pg);
    }, [userId])

    useEffect(() => {
        let _pg = pattern.length / 9;
        setPg(_pg > 1 ?  1 : _pg);
        let s = '';
        for(let i=0; i<pattern.length; i++){
            s += '' + pattern[i].s + '';
        }
        setUserID(s);
    }, [pattern])

   
    useEffect(() => {
        if(pg === 1) {
            setTimeout(() => {
                navigation.navigate('QrCodeSet', {
                    userId: userId.toString().slice(0, 9),
                    password: password,
                    nickName: nickName,
                    imagePath: imagePath,
                });                
            }, 200);
        }
    }, [pg])

     const getPinString = (p1) => {
        const x = p1.x;
        const y = p1.y;

        if((x <= 8.5 && y < 8.5) || (x > W -8.5 && y > H -8.5)) return null;

        const x2 = x - 8.5;
        const y2 = y - 8.5;

        const px = Math.round((x2-x2%_w)/_w);
        const py = Math.round((y2-y2%_h)/_h);

        return {
            i: px < 0 ? 0 : px > 19 ? 19 : px,
            j: py < 0 ? 0 : py > 14 ? 14 : py
        }
    }    

    const handlePanGestureEvent = async (e) => {
        const touchedId = getPinString(e.nativeEvent);
        if(touchedId){
            if(!(patterns.length > 0 && patterns[patterns.length - 1].i === touchedId.i && patterns[patterns.length - 1].j === touchedId.j)){
                patterns.push(touchedId);
            }
        }
    }

    const handleTapEvent = async (e) => {
        if(e && e.nativeEvent.state === 5) {
            const touchedId = getPinString(e.nativeEvent);
            console.log(touchedId)
            setUserID(userId + idString[touchedId.j][touchedId.i]);
            console.log(userId + idString[touchedId.j][touchedId.i]);
        }
    }

    const HandlerStateChange = (e) => {
        if(e.nativeEvent.state === 5) {
            var strArr = patterns.map((data, index) => {
                return idString[data.j][data.i];
            });
            var strTemp = (strArr.toString()).replace(/,/g, '');
            var str = strTemp.length < 2 ? strTemp : strTemp.charAt(Math.floor(Math.random() * strTemp.length)) + strTemp.charAt(Math.floor(Math.random() * strTemp.length));
            patterns=[];
            setUserID(userId + str);
        }
    }
    

    return (
        <LinearGradient colors={colors.$gradient2} style={styles.linearGradient}>
            <Image resizeMode='stretch' source={images.start.background2} style={styles.background2}/>
            <SafeAreaView>
                <StatusBar />
                <View
                    style={_style([_centerV])}>
                    <View
                        style={_style([
                           {
                                height: 100,
                           },
                           _flex,
                           _center,
                        ])}>
                        <View style={{flex: 1}} />
                        <Text 
                            style={_style([{
                                },
                                _centerT,
                                _font(fonts.$rubikBold, colors.$secondaryBlue, 31), 
                            ])}>
                            {'Create your ID'}
                        </Text>
                    </View>
                    <View
                        style={_style([
                           {
                                height: 50,
                           },
                           _flex,
                           _center,
                        ])}>
                        <View style={{flex: 1}} />
                        <Progress.Bar progress={pg} width={wp(75)} 
                            unfilledColor={colors.$white} borderColor={'transparent'} 
                            color={'#56DDF5'}
                            style={{
                                height: 9,
                            }}
                        />
                    </View>
                    
                    
                    <LinearGradient 
                        colors={colors.$gradient2} 
                        style={_style([
                            {
                                width: '80%',
                                marginTop: 20,
                                borderRadius: 15,
                                opacity: 0.9
                            }
                        ])}>
                        <TapGestureHandler
                            onHandlerStateChange={handleTapEvent}>
                            <Animated.View>
                                <PanGestureHandler                             
                                    onGestureEvent={handlePanGestureEvent}
                                    onHandlerStateChange={HandlerStateChange}
                                    >
                                    <View 
                                        style={_style([{
                                                padding: 8.5,
                                                borderRadius: 15,
                                            },
                                        ])}
                                        ref={pinView}>
                                        {
                                            idString.map((i, j) => 
                                                <View
                                                    key={j.toString()}
                                                    style={_style([
                                                        {
                                                        },
                                                        _flexRow,
                                                    ])}>
                                                    {
                                                        i.map((k, l) => 
                                                            <ClickButton label={k} key={l} onPress={()=>{}} onLayout={(v) => {}}/>
                                                        )
                                                    }
                                                </View>
                                            )
                                        }
                                    </View>
                                </PanGestureHandler>
                            </Animated.View>
                        </TapGestureHandler>
                    </LinearGradient>
                    <Text
                        style={_style([{
                                marginTop: 25,
                                width: wp(75),
                            },
                            _centerT,
                            _font(fonts.$rubikRegular, colors.$white, 13, 18), 
                        ])}>
                        {'Swipe your finger on the characters'}                     
                    </Text>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default CreateId
