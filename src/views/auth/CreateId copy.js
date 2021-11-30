import React, { useEffect, useState, useRef, memo } from 'react';
import {Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, Dimensions} from "react-native" ;
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

import {colors, images, fonts} from 'src/assets/themes';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { _centerT, _centerV, _flexRow, _font, _style } from 'src/modules/Style';

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

function makeString() {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 104; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * 
        charactersLength)));
    }
    return result;
}

  
const ClickButton = (props) => {

    return (
        
        <View 
            style={_style([{
                color: 'white',
                width: '7.68%',
                height: 30,
                marginTop: 7.5,
                marginBottom: 7.5,
                alignItem: 'center',
            }])}
            onLayout={(e)=>props.onLayout(e.nativeEvent.layout)}
        >
            <TouchableOpacity onPress={() => props.onPress(props.label)}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontFamily: fonts.$robotMedium,
                        fontSize: 22,
                        color: colors.$secondaryBlue,
                    }}
                >{props.label}</Text>
            </TouchableOpacity>
        </View>
    );
};

const WIDTH = Dimensions.get("window").width;

const CreateId = (props) => {

    const password = props.route.params.password;
    const nickName = props.route.params.nickName;
    const imagePath = props.route.params.imagePath;
    
    const [userId, setUserID]  = useState('');
    const [testId, setTestId]  = useState('aaa');

    const [pg, setPg] = useState(0);
    const [idString] = useState(makeString());
    
    const [positionList, setPositionList] = useState([]);
    const [pattern, setPattern] =  useState([]);
    let patterns = [];
    const [patternState, setPatternState] =  useState('s');
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
        setTestId(s);
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

    useEffect(() => {
        patternState === 'e' && setTestId('')
    }, [patternState])


    const detectPosition = (index, s, v) => {
        let _v = positionList;
        let _p = {
            i: index,
            s: s,
            v: v
        };
        _v.push(_p);
        setPositionList(_v);
    }

    const getPinString = (p1, s) => {
        setPatternState(s);
        const absX = WIDTH * 0.075;
        const absY = 50+48+64+9+20+StatusBar.currentHeight;
        let locationX = p1.absoluteX;
        let locationY = p1.absoluteY;
        let _position = null;
        for(let i=0; i<positionList.length; i++){
            let position = positionList[i];
            if(
                position.v.x + absX <= locationX &&
                position.v.x + position.v.width + absX >= locationX &&
                position.v.y + absY <= locationY &&
                position.v.y + position.v.height + absY >= locationY
            ){
                _position = position;
                break;
            }
        }

        return _position;
    }    

    const handlePanGestureEvent = async (e) => {
        const touchedId = getPinString(e.nativeEvent);
        if(touchedId){
            if(patterns.length > 0 && patterns[patterns.length - 1].i === touchedId.i){

            }else{
                patterns.push(touchedId);
            }
        }
    }

    const HandlerStateChange = (e) => {
        if(e.nativeEvent.state === 5) {
            setPattern(patterns);
            patterns=[];
        }
    }
    

    return (
        <LinearGradient colors={colors.$gradient2} style={styles.linearGradient}>
            <Image resizeMode='stretch' source={images.start.background2} style={styles.background2}/>
            <SafeAreaView>
                <StatusBar />
                <View
                    style={_style([_centerV])}>
                    <Text 
                        style={_style([{
                                marginTop: 58,
                                height: 48,
                            },
                            _centerT,
                            _font(fonts.$rubikBold, colors.$secondaryBlue, 31), 
                        ])}>
                        {'Create your ID'}
                    </Text>
                    <Progress.Bar progress={pg} width={wp(75)} 
                        unfilledColor={colors.$white} borderColor={'transparent'} 
                        color={'#56DDF5'}
                        style={{
                            marginTop: 55,
                            height: 9,
                        }}
                    />
                    <LinearGradient colors={colors.$gradient2} 
                        style={{
                            marginTop: 20,
                            borderRadius: 15,
                            opacity: 0.9
                        }}>
                        <PanGestureHandler 
                            onGestureEvent={handlePanGestureEvent}
                            onHandlerStateChange={HandlerStateChange}
                            >
                            <View 
                                style={_style([{
                                        padding: 8.5,
                                        flexWrap: 'wrap',
                                        width: wp(85),
                                        borderRadius: 15,
                                    },
                                    _flexRow
                                ])}
                                ref={pinView}>
                                {idString.map((s, index) => 
                                    <ClickButton label={s} key={index} onPress={()=>{}} onLayout={(v) => detectPosition(index, s, v)}/>
                                )}
                            </View>
                        </PanGestureHandler>
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
