import React, { useEffect, useState } from 'react';
import {View, StyleSheet, StatusBar, ScrollView, TextInput, Text} from "react-native" ;
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';

import { useNavigation } from '@react-navigation/native';

import {colors, fonts} from 'src/assets/themes';

import MainLayout from 'src/layouts';
import { _centerH, _centerV, _flex, _flexCol, _font, _style } from 'src/modules/Style';
import CPlannerDatePicker from 'src/components/planner/CPlannerDatePicker';
import CSetOutOffice from 'src/components/planner/CSetOutOffice';
import CReminder from 'src/components/planner/CReminder';
import CRepeat from 'src/components/planner/CRepeat';
import CAttach from 'src/components/planner/CAttach';
import CNote from 'src/components/planner/CNote';
import CDateTimePickerModal from 'src/components/modal/CDateTimePickerModal';
import CTimeScrollPickerModal from 'src/components/modal/CTimeScrollPickerModal';
import moment from 'moment';
import CLocation from 'src/components/planner/CLocation';
import { PlannerActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import CInvoiceDatePicker from 'src/components/wallet/CInvoiceDatePicker';
import CInvoiceUser from 'src/components/wallet/CInvoiceUser';
import CInvoiceCategory from 'src/components/wallet/CInvoiceCategory';
import CInvoiceAttach from 'src/components/wallet/CInvoiceAttach';
import CInvoiceNote from 'src/components/wallet/CInvoiceNote';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WalletActions } from 'src/actions';

var styles = StyleSheet.create({
});

const categoryList = [
    'Food',
    'Transport',
    'Mortgage',
    'Groceries',
    'Health',
    'Entertainment',
    'Education',
    'Other',
];
const InvoiceCategory = () => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    // @ts-ignore
    const invoiceCategory = useSelector((state) => state.wallet.invoiceCategory);
    
    const dispatch = useDispatch();
    const navigation = useNavigation();



    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    const handleTypeActive =(s) => {
        
    }

    const handleClick = async (category) => {
        await dispatch(WalletActions.onSetInvoiceCategory(category));
        navigation.goBack();
    }

    const ColorCode = () => 
        'rgb(' + (256 - Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (256 - Math.floor(Math.random() * 256)) + ')';
    
    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'invoiceCategory'}
            handleTypeActive={(s) => handleTypeActive(s)} 
            active={''}
            backFlag={true}>        
            <View
                style={_style([
                    {
                        height: '100%',
                        paddingTop: 70,
                        paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                        paddingLeft: 0,
                        paddingRight: 0,
                    },
                ])}>    
                <ScrollView
                    style={_style([
                        {
                            width: '100%',
                            flex: 1,
                        },
                    ])}>
                     <View
                        style={_style([
                            {
                                width: '100%',
                            },
                            _flexCol,
                        ])}>
                        {
                            categoryList.map((category, index) =>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleClick(category);
                                    }}>
                                    <View
                                        style={_style([
                                            {
                                                backgroundColor: ColorCode(),
                                                height: 46,
                                                paddingLeft: 15,
                                            },
                                            _flex,
                                            _centerH,
                                        ])}>
                                        <Text 
                                            style={_style([
                                                {
                                                },
                                                _font(fonts.$rubikMedium, colors.$white, 17)
                                            ])}>
                                            {category}
                                        </Text>   
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    </View>                    
                </ScrollView>
            </View>      
        </MainLayout>
    )
}

export default InvoiceCategory