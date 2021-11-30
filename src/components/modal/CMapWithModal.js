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
        height: 226,
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

const CMapWithModal = (props) => {


    return (
            <ReactNativeModal
                isVisible={props.visible}
                avoidKeyboard={false}
                swipeDirection={'down'}
                useNativeDriverForBackdrop
                scrollHorizontal={true}
                backdropColor={'#F6F6F6'}
                backdropOpacity={0.9}
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
                                fontSize: 17,
                                color: colors.$secondaryBlue,
                            }}>
                            {'Open with'}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => props.handleModalClose('0')}>
                        <View
                            style={{
                                marginTop: 24,
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikRegular,
                                    fontSize: 17,
                                    color: colors.$secondaryBlue,
                                }}>
                                {'Google Maps'}
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
                    <TouchableOpacity onPress={() => props.handleModalClose('1')}>
                        <View
                            style={{
                                marginTop: 13,
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikRegular,
                                    fontSize: 17,
                                    color: colors.$secondaryBlue,
                                }}>
                                {'Waze'}
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
                    <TouchableOpacity onPress={() => props.handleModalClose('2')}>
                        <View
                            style={{
                                marginTop: 13,
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikRegular,
                                    fontSize: 17,
                                    color: colors.$secondaryBlue,
                                }}>
                                {'Maps'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ReactNativeModal>
    );
};

export default CMapWithModal;
