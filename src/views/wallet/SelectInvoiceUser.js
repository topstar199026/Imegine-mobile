import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, StatusBar, FlatList, AppState} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import { useIsFocused } from '@react-navigation/native';


import {colors, fonts, images} from 'src/assets/themes';
import { useNavigation } from '@react-navigation/native';

import CTopMessageBar from 'src/components/bar/CTopMessageBar2';
import CBottomMessageBar from 'src/components/bar/CBottomMessageBar';
import CChatItem from 'src/components/messages/CChatItem';
import CSearch from 'src/components/messages/CSearch';
import CReadByModal from 'src/components/modal/CReadBy';
import CScheduleModal from 'src/components/modal/CScheduleModal';
import CBusyModal from 'src/components/modal/CBusyModal';
import MainLayout from 'src/layouts';

import { createSocketIO, sendMessage } from 'src/modules/Socket';
import { _style } from 'src/modules/Style';
import CNewContact from 'src/components/messages/CNewContact';
import { ContactActions, WalletActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import CContactSelectItem from 'src/components/messages/CContactSelectItem';
import CContactGroupItem from 'src/components/messages/CContactGroupItem';


var styles = StyleSheet.create({
    
});

const SelectInvoiceUser = () => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    // @ts-ignore
    const invoiceUser = useSelector((state) => state.wallet.invoiceUser);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    
    const [searchString, setSearchString] = useState('');

    const [contactCount, setContactCount] = useState(0);
    const [contactListTemp, setContactListTemp] = useState(null);
    const [contactList, setContactList] = useState([]);
    const [groupContactList, setGroupContactList] = useState([]);
    const [groupContactItem, setGroupContactItem] = useState(new Map());

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, []);

    useEffect(() => {
        getContactList();
    }, [isFocused])

    useEffect(() => {
        // searchString.length > 2 &&
        searchString && getContactList();
    }, [searchString]);
    useEffect(() => {
        makeContactList(true);
        makeGroupContactList();        
    }, [groupContactItem]);
    
    useEffect(() => {
        makeContactList();
    }, [contactListTemp]);

    const makeGroupContactList = () => {
        var _groupContactList = [];
        var keys = Array.from(groupContactItem.keys());
        for(var i = 0; i < keys.length; i++) {
            var _key = keys[i];
            var _data = groupContactItem.get(_key);
            _groupContactList.push({
                id: i,
                item: _data.item.item,
            });
        }
        setGroupContactList(_groupContactList);
    }

    const makeContactList = (flag = false) => {
        if(flag){
            const _temp = [...contactList];
            for(var i = 0; i < _temp.length; i++) {
                if(_temp[i].type === 'item') {
                    _temp[i].selected = checkSelected(_temp[i].item);
                }
            }
            setContactList(_temp);
        }else{
            if(contactListTemp){                
                const _temp = [];
                for(var i = 0; i < contactListTemp.uRows.length; i++) {
                    if(i === 0) {
                        const _fContactList = {
                            id: _temp.length,
                            type: 'group',
                            title: 'Matched contacted',
                        };
                        _temp.length === 0 && _temp.push(_fContactList);
                    }
                    _temp.push(
                        // @ts-ignore
                        {
                            id: _temp.length,
                            type: 'user',
                            item: contactListTemp.uRows[i],
                        }
                    );
                }
                
                for(var i = 0; i < contactListTemp.fRows.length; i++) {
                    if(i === 0) {
                        const _fContactList = {
                            id: _temp.length,
                            type: 'group',
                            title: 'Frequently contacted',
                        };
                        _temp.length === 0 && _temp.push(_fContactList);
                    }
                    _temp.push(
                        // @ts-ignore
                        {
                            id: _temp.length,
                            type: 'item',
                            item: contactListTemp.fRows[i],
                        }
                    );
                }
        
                var groupId = '';
                for(var i = 0; i < contactListTemp.rows.length; i++) {
                    const _item = contactListTemp.rows[i];
                    const _sC = _item.firstName ?  _item.firstName.charAt(0) : ' ';
        
                    if(groupId === _sC.toUpperCase()) {
        
                    }else{
                        groupId = _sC.toUpperCase();
                        _temp.push(
                            {
                                id: _temp.length,
                                type: 'group',
                                title: groupId,
                            }
                        );
                    }
                    _temp.push(
                        // @ts-ignore
                        {
                            id: _temp.length,
                            type: 'item',
                            item: _item,
                        }
                    );
                }
                setContactList(_temp);
            }else{
                setContactList([]);
            }
        }
        
        
    }

    const getContactList = () => {
        ContactActions.getContactList3(rsa, {
            flag: true,
            searchString: searchString || '',
            key: rsa.public,
        }, res => {
            if(res && res.status === true) {
                setContactListTemp(res.data);
            }else if(res && res.status === false && res.error) {
                setContactListTemp([]);
                setContactCount(0);
                Utils.toast(1, res.error);
            }
        });
    }

    
    const checkSelected = (item) => {
        return groupContactItem.has(item.contactId);        
    }

    const handleTypeActive = async (s) => {
        await dispatch(WalletActions.onSetInvoiceUser(groupContactList));
        navigation.goBack();
    }

    const handleChange = (t) => {
        setSearchString(t);
    }
    

    const onPress = (item) => {
        const _item = item.item.item;
        const _temp = groupContactItem;
        if(_temp.has(_item.contactId)) {
            _temp.delete(_item.contactId)
        }else{
            _temp.set(_item.contactId, item)
        }
        setGroupContactItem(new Map(_temp));
    }  
    
    const removeItemFromGroup = (contactId) => {
        const _temp = groupContactItem;
        if(_temp.has(contactId)) {
            _temp.delete(contactId);
            setGroupContactItem(new Map(_temp));
        }
    }  
    
    

    const onLongPress = (item) => {

    }

    const switchHome = (action) => {
        navigation.navigate(action);
    } 

    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'selectInvoiceUser'}
            switchHome={(action) => switchHome(action)}
            backFlag={true}
            handleTypeActive={(s) => handleTypeActive(s)} 
            >        
            <View
                style={[{
                    height: '100%',
                    paddingTop: 70,
                    paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                    paddingLeft: 10,
                    paddingRight: 10,
                }]}>
                <CSearch 
                    placeholder={'Search Contact'}
                    style={{marginBottom: 10}} 
                    handleChange={(t) => handleChange(t)}
                    value={searchString}
                />  
                <View
                    style={{
                        paddingBottom: 10,
                        
                    }}>
                    {
                        groupContactList.length > 0 &&
                        <FlatList 
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={groupContactList}
                            renderItem={item => 
                                <CContactGroupItem 
                                    item={item.item.item}
                                    onPress={(contactId) => removeItemFromGroup(contactId)}
                                />
                            }
                            keyExtractor={item => item.id.toString()}    
                        />
                    }
                    
                </View>
                <View
                    style={_style([
                        {
                            flex: 1,
                            // borderWidth: 1,
                            // borderColor: 'red',
                        }
                    ])}>
                    <FlatList
                        data={contactList}
                        renderItem={item => 
                            <CContactSelectItem 
                                item={item}
                                onPress={() => {onPress(item)}}
                                onLongPress={() => {onLongPress(item)}}
                            />
                        }
                        keyExtractor={item => item.id + new Date()}
                    />
                </View>              
            </View>      
        </MainLayout>
    )
}

export default SelectInvoiceUser