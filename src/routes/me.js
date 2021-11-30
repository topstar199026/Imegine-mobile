import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LinkDevice from 'src/views/me/LinkDevice';
import LinkDeviceGuide from 'src/views/me/LinkDeviceGuide';
import ScanDevice from 'src/views/me/ScanDevice';
import AccountInfo from 'src/views/me/AccountInfo';
import BasicInfo from 'src/views/me/BasicInfo';
import SignInfo from 'src/views/me/SignInfo';
import SignDescription from 'src/views/me/SignDescription';
import SignNew1 from 'src/views/me/SignNew1';
import SignNew2 from 'src/views/me/SignNew2';
import PrivacyInfo from 'src/views/me/PrivacyInfo';
import BlockUser from 'src/views/me/BlockUser';
import BlockUserDetail from 'src/views/me/BlockUserDetail';

const meStack = createStackNavigator();

const MeStack = () => {

    return (
        <meStack.Navigator headerMode='none' initialRouteName='LinkDevice'>
            <meStack.Screen name="LinkDevice" component={LinkDevice} />  
            <meStack.Screen name="LinkDeviceGuide" component={LinkDeviceGuide} />  
            <meStack.Screen name="ScanDevice" component={ScanDevice} />  
            <meStack.Screen name="AccountInfo" component={AccountInfo} />  
            <meStack.Screen name="BasicInfo" component={BasicInfo} />  
            <meStack.Screen name="SignInfo" component={SignInfo} />   
            <meStack.Screen name="SignDescription" component={SignDescription} />  
            <meStack.Screen name="SignNew1" component={SignNew1} />  
            <meStack.Screen name="SignNew2" component={SignNew2} />  
            <meStack.Screen name="PrivacyInfo" component={PrivacyInfo} />  
            <meStack.Screen name="BlockUser" component={BlockUser} />  
            <meStack.Screen name="BlockUserDetail" component={BlockUserDetail} />  
        </meStack.Navigator>
    )
}

export default MeStack


