import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Social from 'src/views/home/Social';
import Contact from 'src/views/home/Contact';
import Message from 'src/views/home/Message';
import Todo from 'src/views/home/Todo';
import Planner from 'src/views/home/Planner';
import Wallet from 'src/views/home/Wallet';
import Me from 'src/views/home/Me';

const mainStack = createStackNavigator();

const MainStack = () => {

    return (
        <mainStack.Navigator headerMode='none' initialRouteName='Message'>
            <mainStack.Screen name="Social" component={Social} />
            <mainStack.Screen name="Contact" component={Contact} />
            <mainStack.Screen name="Message" component={Message} />
            <mainStack.Screen name="Todo" component={Todo} />
            <mainStack.Screen name="Planner" component={Planner} />
            <mainStack.Screen name="Wallet" component={Wallet} />
            <mainStack.Screen name="Me" component={Me} />
        </mainStack.Navigator>
    )
}

export default MainStack


