import { View } from 'native-base';
import React from 'react';
import {Text, Image, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import {colors, images, fonts} from 'src/assets/themes';
import CTopAccountInfoBar from './CTopAccountInfoBar';
import CTopBar from './CTopBar';
import CTopBasicInfoBar from './CTopBasicInfoBar';
import CTopBlockUserBar from './CTopBlockUserBar';
import CTopBlockUserDetailBar from './CTopBlockUserDetailBar';
import CTopBusinessProfileBar from './CTopBusinessProfileBar';
import CTopChatBotBar from './CTopChatBotBar';
import CTopContractBar from './CTopContractBar';
import CTopEmailViewBar from './CTopEmailViewBar';
import CTopInvoiceCategoryBar from './CTopInvoiceCategoryBar';
import CTopLinkDeviceBar from './CTopLinkDeviceBar';
import CTopMessageBar from './CTopMessageBar';
import CTopMessageBar2 from './CTopMessageBar2';
import CTopNewChatBar from './CTopNewChatBar';
import CTopNewChatGroupBar from './CTopNewChatGroupBar';
import CTopNewChatGroupSaveBar from './CTopNewChatGroupSaveBar';
import CTopNewContactBar from './CTopNewContactBar';
import CTopNewEventBar from './CTopNewEventBar';
import CTopNewInvoiceBar from './CTopNewInvoiceBar';
import CTopNewRMailBar from './CTopNewRMailBar';
import CTopNewSelectInvoiceUserBar from './CTopNewSelectInvoiceUserBar';
import CTopPlannerBar from './CTopPlannerBar';
import CTopPrivacyInfoBar from './CTopPrivacyInfoBar';
import CTopSignInfoBar from './CTopSignInfoBar';
import CTopWalletBar from './CTopWalletBar';
import CTopWalletBar2 from './CTopWalletBar2';
import CTopWalletInvoiceBar from './CTopWalletInvoiceBar';



var styles = (controlBarPosition, topBarId = '') => StyleSheet.create({
    defaultTopBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: topBarId.toString() === 'messageSend' ? 79 : 57,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        zIndex: 2,
    },
    topBar: controlBarPosition === 'bottom' ?
        {          
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20, 
            backgroundColor: colors.$white,
            shadowColor: colors.$secondaryBlue,
            shadowOffset: {
                width: 11,
                height: 11,
            },
            shadowOpacity: 0.9,
            shadowRadius: 55,        
            elevation: 25,
        }
        :
        {
            backgroundColor: colors.$transparent,
        }
    ,
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
const CMainTopBar = (props) => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);

    const Bars = {
        message: <CTopMessageBar active={'Messages'} />,
        planner: <CTopPlannerBar active={'Planner'} />,
        wallet: <CTopWalletBar2 active={'Wallet'} />,
        messageSend: <CTopMessageBar2 handleTypeActive={(s) => props.handleTypeActive(s)} activeType={props.activeType} data={props.data} />,
        newChat: <CTopNewChatBar />,
        newContact: <CTopNewContactBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        newChatGroup: <CTopNewChatGroupBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        newChatGroupSave: <CTopNewChatGroupSaveBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        businessProfile: <CTopBusinessProfileBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        chatBotMessage: <CTopChatBotBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        newRMail: <CTopNewRMailBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        emailView: <CTopEmailViewBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,

        contract: <CTopContractBar active={'contract'} />,
        newInvoice: <CTopNewInvoiceBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        selectInvoiceUser: <CTopNewSelectInvoiceUserBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        invoiceCategory: <CTopInvoiceCategoryBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        walletInvoice: <CTopWalletInvoiceBar />,
        
        linkDevice: <CTopLinkDeviceBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        accountInfo: <CTopAccountInfoBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        basicInfo: <CTopBasicInfoBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        signInfo: <CTopSignInfoBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        privacyInfo: <CTopPrivacyInfoBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        blockUser: <CTopBlockUserBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        blockUserDetail: <CTopBlockUserDetailBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
        
        newEvent: <CTopNewEventBar handleTypeActive={(s) => props.handleTypeActive(s)}/>,
    };
    
    return (
        <View style={[styles(controlBarPosition, props.topBarId).defaultTopBar, styles(controlBarPosition, props.topBarId).topBar]}>
            {
                props.topBarId!=='a' && Bars[props.topBarId]
            }
        </View>
    );
};

export default CMainTopBar;
