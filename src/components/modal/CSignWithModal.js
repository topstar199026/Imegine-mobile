import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from "react-native" ;
import ReactNativeModal from 'react-native-modal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({    
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalView: {
        height: 184,
        padding: 16,
        backgroundColor: colors.$white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

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

const CSignWithModal = (props) => {


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
                    
                    <View
                        style={{
                            marginTop: 13,
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikMedium,
                                fontSize: 16,
                                color: '#000000',
                                opacity: 0.9,
                            }}>
                            {'Sign with'}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => props.handleModalClose('fingerprint')}>
                        <View
                            style={{
                                marginTop: 24,
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikRegular,
                                    fontSize: 16,
                                    color: '#000000',
                                    opacity: 0.9,
                                }}>
                                {'Fingerprint'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View 
                        style={{
                            marginTop: 13,
                            width: wp(80),
                            borderWidth: 0.5,
                            opacity: 0.4,
                            borderColor: '#707070',
                        }}
                    />
                    <TouchableOpacity onPress={() => props.handleModalClose('manually')}>
                        <View
                            style={{
                                marginTop: 13,
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikRegular,
                                    fontSize: 16,
                                    color: '#000000',
                                    opacity: 0.9,
                                }}>
                                {'Manually'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ReactNativeModal>
    );
};

export default CSignWithModal;
