import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text, Image, TouchableOpacity} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {colors, fonts, images} from 'src/assets/themes';
import CCard from 'src/components/CCard';
import { _center, _centerH, _centerV, _flex, _flexCol, _flexRow, _font, _size, _style } from 'src/modules/Style';
import MainLayout from 'src/layouts';
import { DeviceActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import CButton from 'src/components/CButton';
import CDeviceInfo from 'src/components/me/CDeviceInfo';
import CBusinessProfileImage from 'src/components/messages/CBusinessProfileImage';
import CBusinessProfileAction from 'src/components/messages/CBusinessProfileAction';
import CBusinessProfileReview from 'src/components/messages/CBusinessProfileReview';
import CFavoriteMessage from 'src/components/messages/CFavoriteMessage';
import CBusinessProfileMap from 'src/components/messages/CBusinessProfileMap';
import CUnblockButton from 'src/components/me/CUnblockButton';
import CBlockUserAction from 'src/components/me/CBlockUserAction';
import CBlockProfileImage from 'src/components/me/CBlockProfileImage';

var styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 49,
        alignItems: 'center',
        marginLeft: 2,
        marginRight: 2,

        display: 'flex',
        flexDirection: 'row',
        borderColor: 'rgba(112, 112, 112, 0.5)',
        borderBottomWidth: 1,
    },

});

const BlockUserDetail = (props) => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const user = useSelector((state) => state.auth.user);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    const scanner = useRef();

    const navigation = useNavigation();

    const [activeType, setActiveType] = useState('all');

    const [devices, setDevices] = useState([]);
    const [selectDevices, setSelectDevices] = useState([])
    
    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);

        handleDeviceStatus();
    }, [])

    const handleDeviceStatus = () => {
        DeviceActions.getDeviceStatus(rsa, res => {
            if(res && res.status === true) {
               console.log('res device status', res.data)
               setDevices(res.data)
            }else if(res && res.status === false && res.error) {
                Utils.toast(1, res.error);
                setDevices([]);
            }
        });
    }

    const onPress =() => {
        
    }    

    const handleTypeActive = (s) => {
        
    }

    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    const onSuccess = e => {
        
    };

    const handlePress = (i) => {
        
    }
    
    const handleUnlink =() => {
        
    }
    
    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'blockUserDetail'}
            switchHome={(action) => switchHome(action)}
            backFlag={true}
            handleTypeActive={(s) => {}} 
            activeType={activeType}
            data={null}
            >        
            <View
                style={_style([
                    {
                        height: '100%',
                        paddingTop: 70,
                        paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                        paddingLeft: 0,
                        paddingRight: 0,
                    },
                    _flexCol,
                ])}>
                <ScrollView
                    style={{
                        width: '100%',
                        paddingRight: 5,
                    }}>
                    <CCard
                        styles={{
                            padding: 10,
                            width: '100%',
                        }}>
                        
                        <CBlockProfileImage />
                        <CBlockUserAction />
                        <View
                            style={{
                                alignItems: 'center',
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}>
                            <CUnblockButton onPress={() => {}} />
                        </View>
                    </CCard>
                </ScrollView>
            </View>
        </MainLayout>
    )
}

export default BlockUserDetail