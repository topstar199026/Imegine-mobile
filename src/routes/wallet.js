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

const walletStack = createStackNavigator();

const WalletStack = () => {

    return (
        <walletStack.Navigator headerMode='none' initialRouteName='WalletInvoice'>
            <walletStack.Screen name="WalletInvoice" component={WalletInvoice} />
            <walletStack.Screen name="Contract" component={Contract} />
            <walletStack.Screen name="WalletCardInfo" component={WalletCardInfo} />  
            <walletStack.Screen name="WalletInvoiceDetail" component={WalletInvoiceDetail} />         
            <walletStack.Screen name="WalletSignManually" component={WalletSignManually} />       
            <walletStack.Screen name="WalletSignedManually" component={WalletSignedManually} /> 
            <walletStack.Screen name="WalletNewInvoice" component={WalletNewInvoice} /> 
            <walletStack.Screen name="SelectInvoiceUser" component={SelectInvoiceUser} /> 
            <walletStack.Screen name="InvoiceCategory" component={InvoiceCategory} />      
        </walletStack.Navigator>
    )
}

export default WalletStack


