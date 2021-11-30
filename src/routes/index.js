// @ts-nocheck
import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';

import { colors } from 'src/assets/themes';
import Theme from 'src/assets/themes/theme';

import AuthLoading from 'src/views/AuthLoading';

import AuthStack from './auth';
import MainStack from './main';
import MessageStack from './message';
import WalletStack from './wallet';
import TodoStack from './todo';
import PlannerStack from './planner';
import MeStack from './me';

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator headerMode="none" initialRouteName="AuthLoading">
            <Stack.Screen name='AuthLoading' component={AuthLoading} />
            <Stack.Screen name='Auth' component={AuthStack} />
            <Stack.Screen name='Main' component={MainStack} />            
            <Stack.Screen name='SendMessage' component={MessageStack} />  
            <Stack.Screen name='TodoPage' component={TodoStack} />    
            <Stack.Screen name='WalletPage' component={WalletStack} />   
            <Stack.Screen name='PlannerPage' component={PlannerStack} />
            <Stack.Screen name='MePage' component={MeStack} />
        </Stack.Navigator>
    )
}

const AppContainer = () => {
    return (
        <NavigationContainer ref={navigationRef} theme={Theme.theme}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.$stateBarColor} translucent={false}/>
            <Routes />
        </NavigationContainer>
    )
}

export default AppContainer;

