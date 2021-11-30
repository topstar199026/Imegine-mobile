import React, {useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from "react-native" ;
import ReactNativeModal from 'react-native-modal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Calendar } from 'react-native-calendars';

import {colors, images, fonts} from 'src/assets/themes';

var styles = StyleSheet.create({    
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    modalView: {
        // height: 327,
        width: wp(90),
        backgroundColor: colors.$white,
        borderRadius: 15,
        paddingTop: 71,
        paddingBottom: 71,

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

const CCreatedAppointmentModal = (props) => {

    useEffect(() => {
        props.visible && setTimeout(() => {
            props.handleModalClose();
        }, 3000);
    }, [props.visible])

    return (
            <ReactNativeModal
                isVisible={props.visible}
                avoidKeyboard={false}
                swipeDirection={'down'}
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
                    <View>
                        <Image source={images.checkedCircleMessage} />
                    </View>
                    <View
                        style={{
                            marginTop: 29,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikRegular,
                                color: colors.$secondaryBlue,
                                fontSize: 17,
                            }}>
                            {'The Appointment was added'}
                        </Text>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikRegular,
                                color: colors.$secondaryBlue,
                                fontSize: 17,
                            }}>
                            {'to your planner'}
                        </Text>
                    </View>
                    
                    
                </View>
            </ReactNativeModal>
    );
};

export default CCreatedAppointmentModal;
