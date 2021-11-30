import { View } from 'native-base';
import React from 'react';
import {Text, Image, StyleSheet} from "react-native" ;
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

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

const CTopNewChatGroupSaveBar = (props) => {

    const onPress = (s) => {
        props.handleTypeActive(s);
    }

    return (
        <>
            <View style={styles.title}>
                <Text
                    style={{
                        fontFamily: fonts.$rubikMedium,
                        fontSize: 20,
                        color: colors.$secondaryBlue
                    }}
                    >
                    {'New Group'}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => onPress('next')}>
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

export default CTopNewChatGroupSaveBar;
