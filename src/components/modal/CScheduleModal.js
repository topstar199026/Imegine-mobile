import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from "react-native" ;
import ReactNativeModal from 'react-native-modal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({    
    modal: {
        justifyContent: 'flex-start',
        margin: 0,
    },
    modalView: {
        left: 0,
        height: '100%',
        backgroundColor: colors.$white,
    },
    contentView: {
        height: hp(82),
        padding: 16,
        backgroundColor: colors.$secondaryBlue,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,

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

const CScheduleModal = (props) => {  


    return (
            <ReactNativeModal
                isVisible={props.visible}
                avoidKeyboard={false}
                swipeDirection={'up'}
                useNativeDriverForBackdrop
                scrollHorizontal={true}
                backdropColor={'#F6F6F6'}
                backdropOpacity={0.2}
                onSwipeComplete={() => props.handleModalClose()}
                style={[styles.modal]}
                >
                <View
                    style={[styles.modalView]}
                    >
                    <View
                        style={[styles.contentView]}
                        >
                        <View style={{
                            width: wp(90)
                            }}>
                            <TouchableOpacity onPress={() => props.handleModalClose()}>
                                <Image source={images.closeWhite} />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                width: wp(85),
                                marginTop: 27,
                                backgroundColor: colors.$white,
                                borderRadius: 20,
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                            <View
                                style={{
                                    width: 67,
                                    height: 75,
                                    backgroundColor: colors.$bubbles,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikBold,
                                        color: colors.$secondaryBlue,
                                        fontSize: 13,
                                    }}>
                                    {'Jun'}
                                </Text>
                                <Text
                                    style={{
                                        marginTop: -3,
                                        fontFamily: fonts.$rubikBold,
                                        color: colors.$secondaryBlue,
                                        fontSize: 32,
                                    }}>
                                    {'24'}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingLeft: 10,
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikBold,
                                        color: colors.$secondaryBlue,
                                        fontSize: 13,
                                    }}>
                                    {'Doctor Appointment'}
                                </Text>
                                <Text
                                    style={{
                                        marginTop: 8,
                                        fontFamily: fonts.$rubikMedium,
                                        color: '#9B9B9B',
                                        fontSize: 13,
                                    }}>
                                    {'Thursday 4 June 2021'}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikMedium,
                                        color: '#9B9B9B',
                                        fontSize: 13,
                                    }}>
                                    {'From: 9:00 to 10:00'}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                width: wp(85),
                                marginTop: 18,
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                            <View>
                                <Image source={images.placeWhite} />
                            </View>
                            <View
                                style={{
                                    paddingLeft: 4
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikRegular,
                                        color: colors.$white,
                                        fontSize: 13,
                                    }}>
                                    {'7th Ave 7850B, New York'}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikRegular,
                                        color: colors.$white,
                                        fontSize: 13,
                                    }}>
                                    {'Zip code 07895'}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikRegular,
                                        color: colors.$white,
                                        fontSize: 13,
                                    }}>
                                    {'United States of America'}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                width: wp(85),
                                height: 120,
                                marginTop: 20,
                                display: 'flex',
                                flexDirection: 'row',
                                backgroundColor: colors.$white,
                                borderRadius: 20,
                            }}>
                            
                        </View>
                        <View
                            style={{
                                width: wp(85),
                                marginTop: 20,
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                            <Image source={images.contactWhite} />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    marginTop: -2,
                                    fontFamily: fonts.$rubikRegular,
                                    color: colors.$white,
                                    fontSize: 13,
                                }}>
                                {'1 guest'}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: wp(85),
                                marginTop: 20,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Image source={images.bot} style={{width: 39, height: 39, borderRadius: 19}} />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    marginTop: -2,
                                    fontFamily: fonts.$rubikRegular,
                                    color: colors.$white,
                                    fontSize: 13,
                                }}>
                                {'Pablo Zehle'}
                            </Text>
                        </View>
                    </View>      
                    <View
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',

                        }}>
                        <View style={{flex: 1}}>
                        </View>
                        <View
                            style={{
                                width: 150,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <TouchableOpacity onPress={() => props.handleModalClose()}>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikRegular,
                                        color: colors.$secondaryBlue,
                                        fontSize: 18,
                                    }}>
                                    {'Accepted'}
                                </Text>
                            </TouchableOpacity>
                        </View>                        
                    </View>              
                </View>
            </ReactNativeModal>
    );
};

export default CScheduleModal;
