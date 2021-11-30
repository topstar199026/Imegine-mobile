import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SendMessage from 'src/views/message/SendMessage';
import ChatEmailDetail from 'src/views/message/ChatEmailDetail';
import ChatEmailPdfView from 'src/views/message/ChatEmailPdfView';
import BusinessProfile from 'src/views/message/BusinessProfile';
import ChatBotMessage from 'src/views/message/ChatBotMessage';
import NewChat from 'src/views/message/NewChat';
import NewContact from 'src/views/message/NewContact';
import NewChatGroup from 'src/views/message/NewChatGroup';
import NewChatGroupSave from 'src/views/message/NewChatGroupSave';
import NewRMail from 'src/views/message/NewRMail';

const messageStack = createStackNavigator();

const MessageStack = (props) => {

    return (
        <messageStack.Navigator headerMode='none' initialRouteName='SendMessage'>
            <messageStack.Screen name="SendMessage" {...props} component={SendMessage} />
            <messageStack.Screen name="ChatEmailDetail" component={ChatEmailDetail} />            
            <messageStack.Screen name="ChatEmailPdfView" component={ChatEmailPdfView} />           
            <messageStack.Screen name="BusinessProfile" component={BusinessProfile} />          
            <messageStack.Screen name="ChatBotMessage" component={ChatBotMessage} />           
            <messageStack.Screen name="NewChat" component={NewChat} />          
            <messageStack.Screen name="NewContact" component={NewContact} />    
            <messageStack.Screen name="NewChatGroup" component={NewChatGroup} /> 
            <messageStack.Screen name="NewChatGroupSave" component={NewChatGroupSave} />          
            <messageStack.Screen name="NewRMail" component={NewRMail} />          
        </messageStack.Navigator>
    )
}

export default MessageStack


