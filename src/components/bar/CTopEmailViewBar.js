import { useNavigation } from '@react-navigation/native';
import { View } from 'native-base';
import React from 'react';
import {Text, Image, StyleSheet} from "react-native" ;
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import {colors, images, fonts} from 'src/assets/themes';
import { _size, _style } from 'src/modules/Style';

var styles = StyleSheet.create({
    title: {
        flex: 1,
        paddingLeft: 17,
    },
    save: {
        width: 80,
        paddingLeft: 17,
    },
});

const CTopEmailViewBar = (props) => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    const navigation = useNavigation();
    const onPress = (s) => {
        props.handleTypeActive(s);
    }

    return (
        <>
            {
                controlBarPosition === 'bottom' &&
                <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                    <View style={{
                            width: 30,
                            paddingLeft: 24
                        }}>
                            <Image source={images.back} />
                    </View>
                </TouchableOpacity>
            }
            <View style={styles.title}>
                <Text
                    style={{
                        fontFamily: fonts.$rubikMedium,
                        fontSize: 20,
                        color: colors.$secondaryBlue
                    }}
                    >
                    {'R-Mail detail'}
                </Text>
            </View>
            <TouchableOpacity onPress={()=>{}}>
                <View 
                    style={_style([
                        {
                            width: 40,
                            paddingRight: 10
                        }
                    ])}>
                    <Image source={images.size4.topBar.message.starBlue4x} style={_style([_size(24, 24)])} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
                <View 
                    style={_style([
                        {
                            width: 40,
                            paddingRight: 10
                        }
                    ])}>
                    <Image source={images.size4.topBar.message.moreBlue4x} style={_style([_size(24, 24)])} />
                </View>
            </TouchableOpacity>
        </>
    );
};

export default CTopEmailViewBar;
