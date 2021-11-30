import React, { useEffect, useState } from 'react';
import {View, StyleSheet, StatusBar, Image, Text} from "react-native" ;
import {useSelector} from 'react-redux';
import * as yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';

import {colors, fonts, images} from 'src/assets/themes';
import { useNavigation } from '@react-navigation/native';

import MainLayout from 'src/layouts';

import { _center, _flexRow, _size, _style } from 'src/modules/Style';
import CLableInput from 'src/components/messages/CLableInput';
import { ContactActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import { TouchableOpacity } from 'react-native-gesture-handler';

let validationSchema = yup.object().shape({
    // firstName: 
    //     yup.string().required('Please enter correct value'),
    // lastName: 
    //     yup.string().required('Please enter correct value'),
    identigier: 
        yup.string().required('Please enter correct value'),
    // jobTitle: 
    //     yup.string().required('Please enter correct value'),
    // birthday: 
    //     yup.string().required('Please enter correct value'),
    // nickName: 
    //     yup.string().required('Please enter correct value'),
    // address: 
    //     yup.string().required('Please enter correct value'),
});

var styles = StyleSheet.create({
    
});

const BasicInfo = (props) => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);

    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [identigier, setIdentigier] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [birthday, setBirthday] = useState('');
    // const [nickName, setNickName] = useState('');
    const [address, setAddress] = useState('');
    const [validate, setValidate] = useState(false);

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, []);

    const handleSend = (message) => {
    }

    const handleTypeActive = (s) => {
        validationSchema.validate({
            // firstName: firstName,
            // lastName: lastName,
            identigier: identigier,
            jobTitle: jobTitle,
            birthday: birthday,
            // nickName: nickName,
            address: address,
        }).then(res => {
            setValidate(false);
            setTimeout(() => {                     
                ContactActions.contactSave(rsa, {
                    // firstName: firstName,
                    // lastName: lastName,
                    identigier: identigier,
                    jobTitle: jobTitle,
                    birthday: birthday,
                    // nickName: nickName,
                    address: address,
                }, res => {
                    if(res && res.status === true) {
                        setTimeout(() => {
                            navigation.goBack();
                        }, 1000);
                    }else if(res && res.status === false && res.error) {
                        Utils.toast(1, res.error);
                    }
                });
            }, 200);
        }).catch(err => {
            setValidate(true);
        });
    }

    const onPress =(item) => {
    }    

    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    const handleChange = (t, field) => {
        switch (field) {
            // case 'firstName':
            //     setFirstName(t);
            //     break;
            // case 'lastName':
            //     setLastName(t);
            //     break;
            case 'identigier':
                setIdentigier(t);
                break;
            case 'jobTitle':
                setJobTitle(t);
                break;
            case 'birthday':
                setBirthday(t);
                break;
            // case 'nickName':
            //     setNickName(t);
            //     break;
            case 'address':
                setAddress(t);
                break;
        
            default:
                break;
        }
    }

    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'basicInfo'}
            switchHome={(action) => switchHome(action)}
            backFlag={true}
            handleTypeActive={(s) => handleTypeActive(s)} 
            >        
            <View
                style={[{
                    height: '100%',
                    paddingTop: 70,
                    paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                    paddingLeft: 10,
                    paddingRight: 10,
                }]}>
                <View
                    style={_style([
                        {
                            paddingLeft: 15,
                            paddingRight: 15,
                            paddingBottom: 15,
                        },
                        _flexRow,
                        _center,
                    ])}>
                    <View
                        style={_style([
                            {
                            },
                            _center,
                            _size(80, 80),
                        ])}>
                        <TouchableOpacity onPress={() => {
                                ImagePicker.openPicker({
                                    width: 300,
                                    height: 300,
                                    cropping: true
                                }).then(image => {
                                    console.log(image);
                                    // setImagePath(image.path);
                                });
                            }}>
                            <Image style={_style([
                                _size(80, 80),
                            ])} source={images.messagePage.newGroup.groupSave} />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={_style([
                            {
                                flex: 1,
                                paddingLeft: 15,
                            },
                        ])}>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikMedium,
                                color: colors.$secondaryBlue,
                                fontSize: 18,
                            }}>
                            {'Edit profile picture'}
                        </Text>
                    </View>
                </View>
                <View
                    style={_style([
                        {
                            paddingLeft: 10,
                            paddingRight: 10,
                        },
                    ])}>
                    <View>
                        <CLableInput 
                            label={'Name'} 
                            placeholder={'First Name'} 
                            handleChange={(t) => handleChange(t, 'firstName')}
                            value={firstName}
                        />
                    </View>
                    <View>
                        <CLableInput 
                            label={''} 
                            placeholder={'Last Name'} 
                            handleChange={(t) => handleChange(t, 'lastName')}
                            value={lastName}
                        />
                    </View>
                    <View>
                        <CLableInput 
                            label={'ID'} 
                            placeholder={'Imegine Identifier'} 
                            handleChange={(t) => handleChange(t, 'identigier')}
                            value={identigier}
                        />
                    </View>
                    <View>
                        <CLableInput 
                            label={'Job Title'} 
                            placeholder={'Job title'} 
                            handleChange={(t) => handleChange(t, 'jobTitle')}
                            value={jobTitle}
                        />
                    </View>
                    <View>
                        <CLableInput 
                            label={'Birthday'} 
                            placeholder={'Birthday'} 
                            handleChange={(t) => handleChange(t, 'birthday')}
                            value={birthday}
                        />
                    </View>
                    {/* <View>
                        <CLableInput 
                            label={'Nick Name'} 
                            placeholder={'Nick Name'} 
                            handleChange={(t) => handleChange(t, 'nickName')}
                            value={nickName}
                        />
                    </View> */}
                    <View>
                        <CLableInput 
                            label={'Address'} 
                            placeholder={'Address'} 
                            handleChange={(t) => handleChange(t, 'address')}
                            value={address}
                        />
                    </View>
                    <View>

                    </View>                    
                </View>              
            </View>      
        </MainLayout>
    )
}

export default BasicInfo