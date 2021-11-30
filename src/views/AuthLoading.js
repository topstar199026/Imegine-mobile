import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import * as NavigationService from 'src/routes/NavigationService';
import CWrapper from 'src/components/CWrapper';
const AuthLoading = () => {

    useEffect(() => {
        getToken()
    }, [])

    const getToken = async () => {
        const token = await AsyncStorage.getItem('BEARER_TOKEN')
        if (token) {
            await getUserDetails();
        } else {
            return NavigationService.replace('Auth')
        }
    }

    const getUserDetails = async () => {
        await users.getUser().then(res => {
            getUserStatus(res);
        }).catch(err => {
            getUserStatus();
        })
    }

    const getUserStatus = (userDetails) => {
        if (userDetails) {
            if (userDetails.UserInfo) {
                //return NavigationService.replace('Main')
                return NavigationService.replace('Auth')
            } else {
                return NavigationService.replace('Auth')
            }
        } else {
            return NavigationService.replace('Auth')
        }
    }

    return (
        <CWrapper>
            <Spinner visible textContent={''} size='large' textStyle={{}} overlayColor='rgba(0, 0, 0, 0.0)' />
        </CWrapper>
    )
}

export default AuthLoading