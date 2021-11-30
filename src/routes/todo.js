import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WalletInvoice from 'src/views/wallet/WalletInvoice';
import Contract from 'src/views/wallet/Contract';
import WalletCardInfo from 'src/views/wallet/WalletCardInfo';
import WalletInvoiceDetail from 'src/views/wallet/WalletInvoiceDetail';
import WalletSignManually from 'src/views/wallet/WalletSignManually';
import WalletSignedManually from 'src/views/wallet/WalletSignedManually';
import WalletNewInvoice from 'src/views/wallet/WalletNewInvoice';
import SelectInvoiceUser from 'src/views/wallet/SelectInvoiceUser';
import InvoiceCategory from 'src/views/wallet/InvoiceCategory';

const todoStack = createStackNavigator();

const TodoStack = () => {

    return (
        <todoStack.Navigator headerMode='none' initialRouteName='WalletInvoice'>
            <todoStack.Screen name="WalletInvoice" component={WalletInvoice} />  
        </todoStack.Navigator>
    )
}

export default TodoStack


