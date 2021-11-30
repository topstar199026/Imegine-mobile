import { View } from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from "react-native" ;

import {colors} from 'src/assets/themes';

var styles = StyleSheet.create({
    container: {
        width: 35,
        height: 7,
        backgroundColor: colors.$transparent,
        display: 'flex',
        flexDirection: 'row'
    },
    flex: {
        flex: 1,
    },
    point: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#707070',
        flex: 1
    },
    _point: {
        backgroundColor: colors.$white,
    }
});

const CTyping = (props) => {

    const [i, setI] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setI(prev => (prev+1) % 3);
        }, props.s ? props.s : 300);
        return () => clearInterval(interval);
      }, []);

    return (
        <View style={[styles.container, props.style]}>
            <View style={[styles.flex]}>
                <View style={[styles.point, i === 0 ? styles._point : {}]} />
            </View>
            <View style={[styles.flex]}>
                <View style={[styles.point, i === 1 ? styles._point : {}]} />
            </View>
            <View style={[styles.flex]}>
                <View style={[styles.point, i === 2 ? styles._point : {}]} />
            </View>
        </View>
    );
};

export default CTyping;
