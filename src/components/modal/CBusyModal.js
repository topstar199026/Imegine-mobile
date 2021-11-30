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
        height: 327,
        padding: 16,
        backgroundColor: '#733CCB',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 8,

        alignItems: 'center',
        justifyContent: 'center',
    }
});

const CBusyModal = (props) => {


    return (
            <ReactNativeModal
                isVisible={props.visible}
                avoidKeyboard={false}
                swipeDirection={'down'}
                useNativeDriverForBackdrop
                scrollHorizontal={true}
                backdropColor={'#F6F6F6'}
                backdropOpacity={0.5}
                onSwipeComplete={() => props.handleModalClose()}
                style={[styles.modal]}
                >
                <View
                    style={[styles.modalView]}
                    >
                    
                    <View
                        style={{
                            position: 'absolute',
                            width: wp(100),
                            top: -27,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                         <Image 
                            source={images.bot} 
                            style={{
                                width: 59, 
                                height: 59, 
                                borderRadius: 29.5, 
                                shadowColor: colors.$secondaryBlue,
                                shadowOffset: {
                                    width: 3,
                                    height: 3,
                                },
                                shadowOpacity: 0.5,
                                shadowRadius: 1,   
                            }} 
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            borderRadius: 30,
                            backgroundColor: colors.$white,
                            shadowColor: colors.$secondaryBlue,
                            shadowOffset: {
                                width: 3,
                                height: 3,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 1,        
                            elevation: 2,

                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            width: wp(68),
                        }}>
                        <Image source={images.upShape} style={{
                            position: 'absolute',
                            top: -11,
                        }} />
                        <Text
                            style={{
                                fontFamily: fonts.$rubikRegular,
                                color: '#141414',
                                fontSize: 13,
                                lineHeight: 15,
                                paddingLeft: 5,
                                paddingRight: 5,
                                textAlign: 'center',
                            }}>
                            {'Johanna is a little bit busy right now. In the mean time you could:'}
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <View
                            style={{
                                marginTop: 30,
                                borderRadius: 7,
                                backgroundColor: colors.$white,
                                borderColor: '#54E5FF',
                                borderWidth: 5,

                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 10,
                                width: wp(70),
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikMedium,
                                    color: colors.$secondaryBlue,
                                    fontSize: 14,
                                    textAlign: 'center',
                                }}>
                                {'Contact a Representative'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View
                            style={{
                                marginTop: 20,
                                borderRadius: 7,
                                backgroundColor: colors.$white,
                                borderColor: '#54E5FF',
                                borderWidth: 5,

                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 10,
                                width: wp(70),
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikMedium,
                                    color: colors.$secondaryBlue,
                                    fontSize: 14,
                                    textAlign: 'center',
                                }}>
                                {'Leave Message'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            props.handleGoBack();
                        }}>
                        <View
                            style={{
                                marginTop: 27,

                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikMedium,
                                    color: '#D6E0ED',
                                    fontSize: 14,
                                    textAlign: 'center',
                                }}>
                                {'Go back'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ReactNativeModal>
    );
};

export default CBusyModal;
