import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from "react-native" ;
import ReactNativeModal from 'react-native-modal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({    
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    modalView: {
        width: 276,
        height: 279,
        padding: 16,
        backgroundColor: colors.$white,
        borderRadius: 15,
        
        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 7,

        alignItems: 'center',
    }
});

const CFingerPrintSignModal = (props) => {


    return (
            <ReactNativeModal
                isVisible={props.visible}
                avoidKeyboard={false}
                swipeDirection={'down'}
                useNativeDriverForBackdrop
                scrollHorizontal={true}
                backdropColor={'#F6F6F6'}
                backdropOpacity={0.7}
                onSwipeComplete={() => props.handleModalClose('')}
                style={[styles.modal]}
                >
                <View
                    style={[styles.modalView]}
                    >
                    <TouchableOpacity onPress={() => props.handleModalClose()}>
                        <View
                            style={{
                                marginTop: 24,
                                alignItems: 'center',
                            }}>
                            <Image source={images.fingerGreenWallet} />
                        </View>
                    </TouchableOpacity>
                    
                    <View
                        style={{
                            marginTop: 25,
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                width: 202,
                                fontFamily: fonts.$robotMedium,
                                fontSize: 16,
                                color: '#000000',
                                opacity: 0.9,
                                textAlign: 'center',
                            }}>
                            {'Put your finger on TouchID to Sign'}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => props.handleModalClose()}>
                        <Text
                            style={{
                                marginTop: 30,
                                fontFamily: fonts.$robotBold,
                                fontSize: 16,
                                color: colors.$textSecondary,
                                textAlign: 'center',
                            }}>
                            {'Cancel'}
                        </Text>
                    </TouchableOpacity>

                </View>
            </ReactNativeModal>
    );
};

export default CFingerPrintSignModal;
