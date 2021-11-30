import React, { useEffect, useState } from 'react';
import {View, StyleSheet, StatusBar, Text, Keyboard, TouchableOpacity, Image, Platform} from "react-native" ;
import CameraRoll from '@react-native-community/cameraroll';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';

import {colors, images} from 'src/assets/themes';
import { useNavigation } from '@react-navigation/native';

import MainLayout from 'src/layouts';

import { _center, _flexCol, _flexRow, _size, _style } from 'src/modules/Style';
import { EmailActions, MessageActions, SystemActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import CMailContactItem from 'src/components/messages/CMailContactItem';
import CMailSubject from 'src/components/messages/CMailSubject';
import CMailContent from 'src/components/messages/CMailContent';
import CMailAttachModal from 'src/components/modal/CMailAttachModal';
import { fileEncrypt } from 'src/modules/Security';
import { ScrollView } from 'native-base';

let validationSchema = yup.object().shape({
    subject: 
        yup.string().required('Please enter correct value'),
});

const NewRMail = (props) => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    // @ts-ignore
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    
    const contactInfo = props.route.params ? JSON.parse(props.route.params.contactInfo) : null;
    const groupInfo = props.route.params ? JSON.parse(props.route.params.groupInfo) : null;

    console.log('contactInfo groupInfo', groupInfo, contactInfo)

    const navigation = useNavigation();
    const [showKeyBoard, setShowKeyBoard] = useState(false);
    const [viewContacts, setViewContacts] = useState(false);
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [attachFiles, setAttachFiles] = useState([]);
    const [groupContactList, setGroupContactList] = useState([]);
    const [mailAttachModalVisible, setMailAttachModalVisible] = useState(false);

    const [validate, setValidate] = useState(false);

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);

        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setShowKeyBoard(true)
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setShowKeyBoard(false)
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    useEffect(() => {
    }, [content])

    const toggleMailAttachModal = () => {
        if(!mailAttachModalVisible) {
            CameraRoll.getPhotos({
                first: 20,
                assetType: 'Photos',
            })
            .then(res => {
            })
            .catch((err) => {
            });
        }

        setMailAttachModalVisible(!mailAttachModalVisible);
    }
    
    const handleSend = async () => {
        groupContactList.length > 0 && validationSchema.validate({
            subject: subject,
        }).then(async function (res){
            const tempFiles = [];

            dispatch(SystemActions.onSetLoadingState({
                state: true,
                title: 'Saving...',
            }));
            
            try {
                console.log('--------------------------')
                for(var fI = 0; fI < attachFiles.length; fI++) {
                    let uri = attachFiles[fI];
                    let encFilePath = await fileEncrypt(uri);//.then(res=>console.log('aaaaa', res));
    
                    console.log('encFilePath-----', encFilePath)
                    tempFiles.push(encFilePath);
                }
            } catch (error) {
                dispatch(SystemActions.onSetLoadingState({
                    state: false,
                    title: 'Saving...',
                }));
                console.log('------', error)
            }
            console.log('tempFiles', tempFiles)
            
            if(tempFiles.length > 0) {
                let data = new FormData();

                for(var i=0; i<tempFiles.length; i++) {
                    let _tempPath = tempFiles[i];
                    data.append('photo' + i.toString(), {
                        type: 'no/data', //'image/jpeg',
                        // @ts-ignore
                        uri: Platform.OS === 'android' ? _tempPath.filePath : _tempPath.filePath.replace('file://', ''),
                        name: '',
                    });
                }

                data.append('fileCount', tempFiles.length.toString());

                EmailActions.fileUpload(data, res => {
                    if(res && res.status === true) {
                        const attachPaths = res.data;
                        console.log('uploaded path', attachPaths);

                        for(var j=0; j<tempFiles.length; j++) {
                            tempFiles[j]['path'] = attachPaths[j];
                        }

                        setValidate(false);
                        var _temp = groupContactList.map((data, index) => {
                            return {
                                id: data.item.contactUserId || data.item.id,
                                contactId: data.item.contactId || data.item.userId,
                            };
                        });

                        setTimeout(async () => {                     
                            const res = await EmailActions.emailSave(rsa, {
                                sender: {
                                    id: user.id,
                                    userId: user.userId,
                                    deviceId: user.deviceId,
                                    nickName: user.nickName,
                                    avatar: user.avatar,
                                },
                                group: {
                                    id: groupInfo.id,
                                },
                                senderType: 'mobile',
                                messageType: 5,
                                message:  content,
                                subject: subject,                                
                                receiver: _temp,
                                attachFiles: tempFiles,
                            }, function(res) {
                                console.log('res-------', res)
                                if(res && res.status === true) {
                                    dispatch(SystemActions.onSetLoadingState({
                                        state: false,
                                        title: 'Saving...',
                                    }));
                                    setTimeout(() => {
                                        navigation.goBack();
                                    }, 1000);
                                }else if(res && res.status === false && res.error) {
                                    dispatch(SystemActions.onSetLoadingState({
                                        state: false,
                                        title: 'Saving...',
                                    }));
                                    Utils.toast(1, res.error);
                                }
                            });
                        }, 200);
                        
                        
                    }else if(res && res.status === false && res.error) {
                        dispatch(SystemActions.onSetLoadingState({
                            state: false,
                            title: 'Saving...',
                        }));
                        Utils.toast(1, res.error);
                        return null;
                    }
                });
            } else {
                setValidate(false);
                var _temp = groupContactList.map((data, index) => {
                    return {
                        id: data.item.contactUserId || data.item.id,
                        contactId: data.item.contactId || data.item.userId,
                    };
                });
                const groupIdList = await MessageActions.getGroupIdList(rsa, user, _temp);
                
                console.log('groupIdList----------------------', groupIdList, res)

                if(groupIdList && groupIdList.status === true) {
                    const gIdList = groupIdList.data;
                    
                    await Promise.all(gIdList.map(async (gInfo, index) => {
                        await EmailActions.emailSave2(rsa, {
                            sender: {
                                id: user.id,
                                userId: user.userId,
                                deviceId: user.deviceId,
                                nickName: user.nickName,
                                avatar: user.avatar,
                            },
                            group: {
                                id: gInfo.id,
                            },
                            senderType: 'mobile',
                            messageType: 5,
                            message:  content,
                            subject: subject,                                
                            receiver: _temp,
                        });
                    }));

                    dispatch(SystemActions.onSetLoadingState({
                        state: false,
                        title: 'Saving...',
                    }));
                    setTimeout(() => {
                        navigation.goBack();
                    }, 1000);
                }else{
                    dispatch(SystemActions.onSetLoadingState({
                        state: false,
                        title: 'Saving...',
                    }));
                }

               
                // setTimeout(() => {                     
                //     EmailActions.emailSave(rsa, {
                //         sender: {
                //             id: user.id,
                //             userId: user.userId,
                //             deviceId: user.deviceId,
                //             nickName: user.nickName,
                //             avatar: user.avatar,
                //         },
                //         group: {
                //             id: groupInfo.id,
                //         },
                //         senderType: 'mobile',
                //         messageType: 5,
                //         message:  content,
                //         subject: subject,                                
                //         receiver: _temp,
                //     }, res => {
                //         if(res && res.status === true) {
                //             dispatch(SystemActions.onSetLoadingState({
                //                 state: false,
                //                 title: 'Saving...',
                //             }));
                //             setTimeout(() => {
                //                 navigation.goBack();
                //             }, 1000);
                //         }else if(res && res.status === false && res.error) {
                //             dispatch(SystemActions.onSetLoadingState({
                //                 state: false,
                //                 title: 'Saving...',
                //             }));
                //             Utils.toast(1, res.error);
                //         }
                //     });
                // }, 200);
            }
        }).catch(err => {
            console.log('err', err)
            setValidate(true);
        });
    }

    const handleSelectAttachFile = (file) => {
        const uri = file.item.node.image.uri;
        const _temp = [...attachFiles];
        console.log(uri)
        
        var _p = _temp.indexOf(uri);
        console.log(_p);
        if(_p*1 === -1) {
            _temp.push(uri);
            setAttachFiles(_temp);
        }
        
        // fileEncrypt(file.item.node.image.uri);
    }

    const handleTypeActive = (s) => {
        Keyboard.dismiss();
        setMailAttachModalVisible(true);
    }

    const onPress =(item) => {
        
    }    

    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    const handleChange = (t, field) => {
        
    }

    const handleViewContact = (flag) => {
        setViewContacts(flag);
    }

    const handleSubject = (subject) => {
        setSubject(subject);
    }

    const handleContent = (content) => {
        setContent(content);
    }

    const handleGroupContactList = (groupContactList) => {
        console.log(groupContactList);
        setGroupContactList(groupContactList);
    }

    return (
        <MainLayout 
            controlBarPosition={controlBarPosition}
            topBarId={'newRMail'}
            switchHome={(action) => switchHome(action)}
            backFlag={true}
            handleTypeActive={(s) => handleTypeActive(s)} >        
            <View
                style={_style([
                    {
                        height: '100%',
                        paddingTop: 70,
                        paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                        paddingLeft: 3,
                        paddingRight: 3,
                    },
                    _flexCol,
                ])}>
                <View
                    style={_style([
                        {
                            paddingLeft: 10,
                            paddingRight: 10,
                        },
                        _flexRow,
                    ])}>
                    <View>
                        <Text>
                            {'Top Secret R-Mail'}
                        </Text>
                    </View>
                    <View
                        style={_style([

                        ])}>

                    </View>
                </View>   
                <View
                    style={_style([
                        {
                            flex: 1,
                            marginTop: 15,
                            borderTopLeftRadius: 25,
                            borderTopRightRadius: 25,
                            width: '100%',
                            backgroundColor: colors.$white,
                            shadowColor: colors.$secondaryBlue,
                            shadowOffset: {
                                width: 4,
                                height: 4,
                            },
                            shadowOpacity: 0.9,
                            shadowRadius: 55,                        
                            elevation: 3,
                            // borderWidth: 5,
                            // borderColor: 'blue',
                        },
                        _flexCol,
                    ])}>
                    <View
                        style={_style([
                            {
                                // borderWidth: 5,
                                // borderColor: 'red',
                                width: '100%',
                            },
                        ])}>
                        <CMailContactItem 
                            handleGroupContactList={(v) => handleGroupContactList(v)} 
                            handleViewContact={(flag) => handleViewContact(flag)}
                        />
                    </View>
                    {
                        !viewContacts &&
                        <View
                            style={_style([
                                {
                                    width: '100%',
                                },
                            ])}>
                            <CMailSubject handleSubject={(t) => handleSubject(t)} subject={subject} />
                        </View>
                    }
                    {
                        !viewContacts &&
                        <View
                            style={_style([
                                {
                                    width: '100%',
                                    // borderWidth: 1,
                                    // borderColor: 'red'
                                },
                                attachFiles.length === 0 || showKeyBoard ? {
                                    flex: 1,
                                } : {
                                    height: 200,
                                }
                            ])}>
                            <CMailContent handleContent={(t) => handleContent(t)} content={content} />
                        </View>
                    }
                    {
                        !showKeyBoard && !viewContacts &&
                        <ScrollView>
                        {
                            
                            attachFiles.length > 0 && attachFiles.map((fileUri, index) =>
                                <View
                                    key={index.toString()}
                                    style={_style([
                                        {
                                            padding: 5,
                                            width: '100%',
                                        },
                                    ])}>
                                    <TouchableOpacity onPress={() => {}}>
                                        <Image
                                            style={_style([
                                                {
                                                },
                                                _size(300, 165),
                                            ])}
                                            // @ts-ignore
                                            source={{ uri: fileUri }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        </ScrollView>
                    }
                    
                    <View style={_style([
                        {
                            position: 'absolute',
                            bottom: 15,
                            right: 0,
                            zIndex: 1,
                            width: 74,
                        },
                        _center,
                    ])}>
                        <TouchableOpacity onPress={() => handleSend()}>
                            <View 
                                style={_style([
                                    {
                                        paddingLeft: 5,
                                        borderRadius: 20,
                                        backgroundColor: '#54E5FF',
                                    },
                                    _size(40, 40),
                                    _center,
                                ])}>
                                <Image source={images.send} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> 
                
            </View>      
            <CMailAttachModal 
                handleSelectAttachFile={(file) => handleSelectAttachFile(file)}
                visible={mailAttachModalVisible}
                handleModalClose={() => toggleMailAttachModal()}
            />
            
        </MainLayout>
    )
}

export default NewRMail