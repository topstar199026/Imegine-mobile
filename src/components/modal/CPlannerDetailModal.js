import React, { useState } from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from "react-native" ;
import ReactNativeModal from 'react-native-modal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Calendar } from 'react-native-calendars';

import {colors, images, fonts} from 'src/assets/themes';
import moment from 'moment';
import { date } from 'yup/lib/locale';
import { _center, _flex, _flexRow, _font, _size, _style } from 'src/modules/Style';
import { ScrollView } from 'native-base';
import CPlannerModalScheduleItem from '../planner/CPlannerModalScheduleItem';

var styles = StyleSheet.create({    
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalView: {
        // height: 327,
        backgroundColor: colors.$secondaryBlue,
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
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 30,

    }
});

const CPlannerDetailModal = (props) => {

    return (
            <ReactNativeModal
                isVisible={props.visible}
                avoidKeyboard={false}
                // swipeDirection={'down'}
                useNativeDriverForBackdrop
                scrollHorizontal={true}
                backdropColor={'#F6F6F6'}
                backdropOpacity={0.9}
                onSwipeComplete={() => props.handleModalClose()}
                style={[styles.modal]}
                >
                <View
                    style={[styles.modalView]}
                    >
                    <View
                        style={_style([
                            {

                            },
                            _flexRow,
                        ])}>
                        <Text
                            style={_style([{
                                    flex: 1,
                                },
                                _font(fonts.$rubikMedium, colors.$white, 19)
                            ])}>
                            {'June 21'}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                props.handleModalClose()
                            }}>
                            <View
                                style={_style([
                                    {
                                        backgroundColor: '#54E5FF',
                                        borderRadius: 12,
                                    },
                                    _size(24, 24),
                                    _flex,
                                    _center,
                                ])}>
                                <Image source={images.plannerPage.closeWhite} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={_style([
                            {
                                borderWidth: 0.5,
                                borderColor: colors.$white,
                                marginTop: 15,
                            }
                        ])}>

                    </View>
                    <View
                        style={_style([
                            {
                                paddingTop: 15,
                                maxHeight: 300,
                            }
                        ])}>
                        <ScrollView>
                            <CPlannerModalScheduleItem index={1} />
                            <CPlannerModalScheduleItem />
                            <CPlannerModalScheduleItem />
                            <CPlannerModalScheduleItem />
                            <CPlannerModalScheduleItem />
                            <CPlannerModalScheduleItem />
                            <CPlannerModalScheduleItem />
                            <CPlannerModalScheduleItem />
                            <CPlannerModalScheduleItem />
                            <CPlannerModalScheduleItem />
                            <CPlannerModalScheduleItem />
                            <CPlannerModalScheduleItem />
                            <CPlannerModalScheduleItem />
                            <CPlannerModalScheduleItem />
                            <CPlannerModalScheduleItem />
                            <CPlannerModalScheduleItem />
                        </ScrollView>
                    </View>

                    <View
                        style={_style([
                            {
                                paddingTop: 10,
                            },
                            _flexRow,
                        ])}>
                        <View style={{flex: 1,}}/>
                        <TouchableOpacity>
                            <Text
                                style={_style([{
                                    },
                                    _font(fonts.$rubikMedium, colors.$white, 18)
                                ])}>
                                {'Add'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ReactNativeModal>
    );
};

export default CPlannerDetailModal;
