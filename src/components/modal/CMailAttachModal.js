import { FlatList } from 'native-base';
import React, { useEffect, useState } from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image, ScrollView} from "react-native" ;
import ReactNativeModal from 'react-native-modal';
import CameraRoll from '@react-native-community/cameraroll';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _flexCol, _style } from 'src/modules/Style';
import CMailAttachType from '../messages/CMailAttachType';
import CMailAttachSelectItem from '../messages/CMailAttachSelectItem';

var styles = StyleSheet.create({    
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalView: {
        height: 266,
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

const TypeList = [
    {
        id: 0,
        title: 'Camera',
        icon: [
            images.messagePage.newRMail.cameraBlue,
            images.messagePage.newRMail.cameraWhite,
        ],
    },
    {
        id: 1,
        title: 'Document',
        icon: [
            images.messagePage.newRMail.documentBlue,
            images.messagePage.newRMail.documentWhite,
        ],
    },
    {
        id: 2,
        title: 'Wallet Doc.',
        icon: [
            images.messagePage.newRMail.walletBlue,
            images.messagePage.newRMail.walletWhite,
        ],
    },
    {
        id: 3,
        title: 'Event',
        icon: [
            images.messagePage.newRMail.eventBlue,
            images.messagePage.newRMail.eventWhite,
        ],
    },
    {
        id: 4,
        title: 'Contact',
        icon: [
            images.messagePage.newRMail.contactBlue,
            images.messagePage.newRMail.contactWhite,
        ],
    },
    {
        id: 5,
        title: 'Location',
        icon: [
            images.messagePage.newRMail.locationBlue,
            images.messagePage.newRMail.locationWhite,
        ],
    },
];
const CMailAttachModal = (props) => {

    const [currentType, setCurrentType] = useState(0)
    const [photos, setPhotos] = useState([])
    useEffect(() => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
        .then(res => {
            setPhotos(res.edges);
        })
        .catch((err) => {
            setPhotos([]);
        });
    }, [])

    const handleSelectAttachFile = (file) => {
        props.handleSelectAttachFile(file);
        props.handleModalClose();
    }

    const onPress = (type) => {
        setCurrentType(type);
    }

    return (
            <ReactNativeModal
                propagateSwipe={true}
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
                    style={_style([
                        {
                            
                        },
                        styles.modalView,
                        _flexCol,
                    ])}
                    >
                    <ScrollView
                        style={_style([
                            {
                                height: 186,
                                padding: 5,
                                paddingTop: 15,
                            }
                        ])}>
                        <View style={{flex: 1,}} onStartShouldSetResponder={() => true}>
                        <FlatList 
                            legacyImplementation={false}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={photos}
                            renderItem={photo => 
                                <CMailAttachSelectItem photo={photo} 
                                    onPress={() => handleSelectAttachFile(photo)}
                                    // currentType={currentType}
                                    styles={{
                                        // height: hp(100) - 176 - StatusBar.currentHeight
                                    }}
                                />
                            }
                            keyExtractor={(item, index) => index.toString()}    
                        />
                        </View>
                    </ScrollView>
                    <View
                        style={_style([
                            {
                                height: 80,
                                paddingTop: 6,
                                paddingBottom: 6,
                            }
                        ])}>
                        <FlatList 
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={TypeList}
                            renderItem={item => 
                                <CMailAttachType data={item} onPress={(type) => onPress(type)}
                                    currentType={currentType}
                                    styles={{
                                        // height: hp(100) - 176 - StatusBar.currentHeight
                                    }}
                                />
                            }
                            keyExtractor={item => item.id.toString()}    
                        />
                    </View>
                    

                </View>
            </ReactNativeModal>
    );
};

export default CMailAttachModal;
