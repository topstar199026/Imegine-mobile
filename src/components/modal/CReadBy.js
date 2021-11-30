import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from "react-native" ;
import ReactNativeModal from 'react-native-modal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flexRow, _size, _style } from 'src/modules/Style';

var styles = StyleSheet.create({    
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalView: {
        height: hp(60),
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
    }
});

const CReadByModal = (props) => {

    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);

    return (
            <ReactNativeModal
                isVisible={props.visible}
                avoidKeyboard={false}
                swipeDirection={'down'}
                useNativeDriverForBackdrop
                scrollHorizontal={true}
                backdropColor={'#F6F6F6'}
                backdropOpacity={0}
                onSwipeComplete={() => props.handleModalClose()}
                style={_style([
                    styles.modal,
                    {
                        paddingLeft: 
                            controlBarPosition === 'left' ? 62 : 
                            controlBarPosition === 'right' ? 2 : 0,
                        paddingRight: 
                            controlBarPosition === 'left' ? 2 : 
                            controlBarPosition === 'right' ? 62 : 0,
                    },
                ])}>
                <View
                    style={_style([
                        styles.modalView,
                    ])}>                    
                    <View>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikBold,
                                fontSize: 16,
                                color: 'rgba(0,0,0,0.87)',
                            }}>
                            {'Read by'}
                        </Text>
                    </View>
                    <View
                        style={_style([
                            {
                                marginTop: 15,
                                padding: 10,
                                borderRadius: 20,
                                backgroundColor: colors.$white,
                                shadowColor: colors.$secondaryBlue,
                                shadowOffset: {
                                    width: 3,
                                    height: 3,
                                },
                                shadowOpacity: 0.5,
                                shadowRadius: 1,        
                                elevation: 2,
                            },
                            _flexRow,
                            _center,
                        ])}>
                        <View style={_style([
                                {
                                },
                                _size(52, 52),
                                _center,
                            ])}>
                            <Image source={images.bot} style={{width: 52, height: 52, borderRadius: 26, borderColor:'#54E5FF', borderWidth: 4}} />
                        </View>
                        <View style={{
                            flex: 1,
                            paddingLeft: 15,
                            }}>
                            <Text style={{
                                fontFamily: fonts.$rubikBold,
                                color: colors.$secondaryBlue,
                                fontSize: 15,
                            }}>{'Dr. John Smith'}</Text>
                        </View>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingRight: 5,
                            }}>
                            <Text style={{
                                fontFamily: fonts.$rubikRegular,
                                color: colors.$secondaryBlue,
                                fontSize: 13,
                                }}>
                                {'Today 18:25'}
                            </Text>
                        </View>
                    </View>
                </View>
            </ReactNativeModal>
    );
};

export default CReadByModal;
