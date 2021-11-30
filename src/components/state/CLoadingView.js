import React, { useEffect, useState } from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from "react-native" ;
import ReactNativeModal from 'react-native-modal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import {useSelector, useDispatch} from 'react-redux';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({    
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    modalView: {
        // width: wp(90),
        padding: 5,
        backgroundColor: colors.$white,
        borderRadius: 15,

        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 8,

        alignItems: 'center',
    }
});

const CLoadingView = (props) => {

    // @ts-ignore
    const loadingState = useSelector((state) => state.system.loadingState);

    return (
            <ReactNativeModal
                isVisible={
                    loadingState ?
                    loadingState.state
                    :
                    false
                }
                avoidKeyboard={false}
                useNativeDriverForBackdrop
                
                backdropColor={'#F6F6F6'}
                backdropOpacity={0.6}
                style={[styles.modal]}>
                <View
                    style={[styles.modalView]}
                    >
                    <Image source={images.gif.loading} />                    
                </View>
            </ReactNativeModal>
    );
};

export default CLoadingView;
