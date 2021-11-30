import { View } from 'native-base';
import React from 'react';
import {Text, Image, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 57,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(100),
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
    },
    title: {
        flex: 1,
        paddingLeft: 17,
    },
    search2: {
        width: 24,
        height: 29,
        paddingTop: 5,
    },
    listCheck: {
        width: 24,
        height: 24,
        marginRight: 16,
        marginLeft: 24,
    }
});
const CTopPlannerBar = (props) => {
    return (
        <View style={[styles.topBar]}>
            <View style={styles.title}>
                <Text
                    style={{
                        fontFamily: fonts.$rubikMedium,
                        fontSize: 20,
                        color: colors.$secondaryBlue
                    }}
                    >
                    {/* {props.active} */}
                    {'June 21'}
                </Text>
            </View>
            <View style={styles.search2}>
                <Image source={images.search2} />
            </View>
            <View style={styles.listCheck}>
                <Image source={images.listCheck} />
            </View>
        </View>
    );
};

export default CTopPlannerBar;
