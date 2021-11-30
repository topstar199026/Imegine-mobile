import { View } from 'native-base';
import React, { useState } from 'react';
import {TextInput, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flex, _style } from 'src/modules/Style';
import { textAlign } from 'styled-system';

var styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 32,
        backgroundColor: colors.$searchFilter,
        borderRadius: 16,
        paddingTop: 3,
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        height: 32,
        backgroundColor: colors.$transparent,
        borderRadius: 16,
        fontFamily: fonts.$rubikMedium,
        fontSize: 12,
        paddingTop: 5,
        paddingLeft: 15,
        color: colors.$textSecondary
    },
    search: {
        marginRight: 10,
        width: 14.57,
        height: 14.57,
    }
});

const CSearch = (props) => {

    const [v, setV] = useState('');

    const handleChange = (t) => {
        props.handleChange && props.handleChange(t);
        props.handleChange || setV(t);
    }
    
    return (
        <View 
            style={_style([
                styles.container, props.style,
                _flex,
                _center,
            ])}>
           <TextInput
                placeholder={props.placeholder || ''}
                style={styles.input}                
                onChangeText={t => handleChange(t)}
                value={props.value || v}
                underlineColorAndroid={colors.$transparent}
            />
            <TouchableOpacity>
                <Image source={images.size4.common.searchGray4x} style={styles.search} />
            </TouchableOpacity>
        </View>
    );
};

export default CSearch;
