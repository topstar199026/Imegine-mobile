import moment from 'moment';
import { View } from 'native-base';
import React from 'react';
import {Text, Image, StyleSheet} from "react-native" ;

import {colors, images, fonts} from 'src/assets/themes';
import { _font, _size, _style } from 'src/modules/Style';

var styles = StyleSheet.create({
    title: {
        flex: 1,
        paddingLeft: 17,
    },
    search2: {
        width: 40,
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
        <>
            <View style={styles.title}>
                <Text 
                    style={_style([
                        {
                        },
                        _font(fonts.$rubikMedium, colors.$secondaryBlue, 20)
                    ])}>
                    {moment().format('MMMM DD')}
                </Text>
            </View>
            <View style={styles.search2}>
                <Image source={images.size4.topBar.planner.searchBlue4x} style={_style([_size(24, 24)])} />
            </View>
            {/* <View style={styles.listCheck}>
                <Image source={images.listCheck} />
            </View> */}
        </>
    );
};

export default CTopPlannerBar;
