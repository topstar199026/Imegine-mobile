import { useNavigation } from '@react-navigation/native';
import { View } from 'native-base';
import React from 'react';
import {Text, Image, StyleSheet} from "react-native" ;
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import {colors, images, fonts} from 'src/assets/themes';

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

const CTopNewContactBar = (props) => {
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
                    {'New Contact'}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => onPress('save')}>
                <View style={styles.save}>
                    <Text
                        style={{
                            fontFamily: fonts.$rubikMedium,
                            fontSize: 15,
                            color: colors.$secondaryBlue
                        }}
                        >
                        {'Save'}
                    </Text>
                </View>
            </TouchableOpacity>
        </>
    );
};

export default CTopNewContactBar;
