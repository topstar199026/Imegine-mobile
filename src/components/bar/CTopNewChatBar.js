import { View } from 'native-base';
import React from 'react';
import {Text, Image, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({
    title: {
        flex: 1,
        paddingLeft: 17,
    },
});

const CTopNewChatBar = (props) => {
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
                    {'New Chat'}
                </Text>
            </View>
        </>
    );
};

export default CTopNewChatBar;
