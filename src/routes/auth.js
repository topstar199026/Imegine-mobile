import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GetStart from 'src/views/auth/GetStart';
import LogIn from 'src/views/auth/LogIn';
import CreateName from 'src/views/auth/CreateName';
import CreatePassword from 'src/views/auth/CreatePassword';
import CreateId from 'src/views/auth/CreateId';
import QrCodeSet from 'src/views/auth/QrCodeSet';

const authStack = createStackNavigator();

const AuthStack = () => {
    return (
        <authStack.Navigator headerMode='none' initialRouteName='GetStart'>
            <authStack.Screen
                name="GetStart"
                component={GetStart}
                // @ts-ignore
                animation="fade"
            />
            <authStack.Screen
                name="LogIn"
                component={LogIn}
                // @ts-ignore
                animation="fade"
            />
            <authStack.Screen
                name="CreateName"
                component={CreateName}
                // @ts-ignore
                animation="fade"
            />
            <authStack.Screen
                name="CreatePassword"
                component={CreatePassword}
                // @ts-ignore
                animation="fade"
            />
            <authStack.Screen
                name="CreateId"
                component={CreateId}
                // @ts-ignore
                animation="fade"
            />
            <authStack.Screen
                name="QrCodeSet"
                component={QrCodeSet}
                // @ts-ignore
                animation="fade"
            />
        </authStack.Navigator>
    )
}

export default AuthStack;

