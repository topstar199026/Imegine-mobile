import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import {Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, Keyboard} from "react-native" ;
import {useSelector} from 'react-redux';

import { ContactActions } from 'src/actions';
import {colors, images, fonts} from 'src/assets/themes';
import { _flexRow, _font, _style } from 'src/modules/Style';
import CContactSelectItem from './CContactSelectItem';
import * as Utils from 'src/modules/Toast';
import { UpperCaseString } from 'src/modules/FormatUtil';

const CMailContactItem = (props) => {
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    
    const [viewContacts, setViewContacts] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [searchString, setSearchString] = useState('');

    const [contactListTemp, setContactListTemp] = useState(null);
    const [contactList, setContactList] = useState([]);
    const [groupContactList, setGroupContactList] = useState([]);
    const [groupContactItem, setGroupContactItem] = useState(new Map());



    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
            setKeyboardHeight(e.endCoordinates.height)
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", (e) => {
            setKeyboardHeight(e.endCoordinates.height)
        });
        getContactList();
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [])

    useEffect(() => {
        // getContactList();
        props.handleGroupContactList(groupContactList);
    }, [groupContactList])

    useEffect(() => {
        // searchString.length > 2 &&
        // searchString && getContactList();
        getContactList();
    }, [searchString]);
    useEffect(() => {
        makeContactList(true);
        makeGroupContactList();        
    }, [groupContactItem]);
    
    useEffect(() => {
        makeContactList();
    }, [contactListTemp]);

    const handleViewContact = (flag) => {
        setViewContacts(flag);
        props.handleViewContact && props.handleViewContact(flag);
    }

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
                if(_temp[i].type === 'item' || _temp[i].type === 'user') {
                    _temp[i].selected = checkSelected(_temp[i].item);
                }
            }
            setContactList(_temp);
        }else{
            if(contactListTemp){
                const _temp = [];
                var groupId = '';
                contactListTemp.uRows.map((item, index) => {
                    if(index === 0) {
                        const _fContactList = {
                            id: _temp.length,
                            type: 'group',
                            title: 'Matched contacted',
                        };
                        _temp.length === 0 && _temp.push(_fContactList);
                    }
                    _temp.push(
                        {
                            id: _temp.length,
                            type: 'user',
                            item: item,
                            selected: checkSelected(item),
                        }
                    );
                });
                contactListTemp.fRows.map((item, index) => {
                    if(index === 0) {
                        const _fContactList = {
                            id: _temp.length,
                            type: 'group',
                            title: 'Frequently contacted',
                        };
                        _temp.push(_fContactList);
                    }
                    _temp.push(
                        {
                            id: _temp.length,
                            type: 'item',
                            item: item,
                            selected: checkSelected(item),
                        }
                    );
                });

                contactListTemp.rows.map((item, index) => {
                    const _sC = UpperCaseString(item.nickName, 'First');
        
                    if(groupId !== _sC) {
                        groupId = _sC;
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
                            item: item,
                            selected: checkSelected(item),
                        }
                    );
                });
                setContactList(_temp);
            }else{
                setContactList([]);
            }
        }
        
        
    }

    const getContactList = () => {
        ContactActions.getContactList4(rsa, {
            searchString: searchString || '',
            key: rsa.public,
            flag: true,
        }, res => {
            if(res && res.status === true) {
                setContactListTemp(res.data);
            }else if(res && res.status === false && res.error) {
                setContactListTemp([]);
                Utils.toast(1, res.error);
            }
        });
    }

    
    const checkSelected = (item) => {
        console.log('item------', item)
        return groupContactItem.has(item.contactId || item.userId);    

           
    }

    const handleTypeActive = (s) => {
        
    }

    const handleChange = (t) => {
        setSearchString(t);
    }
    

    const onPress = (item) => {
        const _item = item.item.item;

        console.log('_item-----------', item.item.type, _item)
        const _temp = groupContactItem;

        if(item.item.type === 'user') {
            if(_temp.has(_item.userId)) {
                _temp.delete(_item.userId)
            }else{
                _temp.set(_item.userId, item)
            }
        } else {
            if(_temp.has(_item.contactId)) {
                _temp.delete(_item.contactId)
            }else{
                _temp.set(_item.contactId, item)
            }
        }

        console.log('-----------------------', _temp)
        
        setGroupContactItem(new Map(_temp));
    }  
    
    const removeItemFromGroup = (contactId) => {
        handleViewContact(true);
        const _temp = groupContactItem;
        if(_temp.has(contactId)) {
            _temp.delete(contactId);
            setGroupContactItem(new Map(_temp));
        }
    }

    return (
        <View
            style={_style([
                {
                    // position: 'relative',
                    // flex: 1,
                    // borderWidth: 5,
                    // borderColor: 'red',

                    display: 'flex',
                    flexDirection: 'column',
                },
                viewContacts ? {
                    height: '100%',
                } : {},
            ])}>
            <View
                style={_style([
                    {
                        width: '100%',
                        paddingTop: 15,
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingBottom: 10,
                        // borderWidth: 1,
                        // borderColor: 'red',
                        borderBottomWidth: 1,
                        borderColor: 'rgba(185, 185, 185, 0.5)',
                    },
                    _flexRow,
                ])}>
                <View
                    style={_style([
                        {
                            width: 25,
                            paddingTop: 2,
                        },
                    ])}>
                    <Text
                        style={_style([
                            _font(fonts.$rubikRegular, '#B2B2B2', 15),
                        ])}>
                        {'To'}
                    </Text>
                </View>
                <View
                    style={_style([
                        {
                            flex: 1,
                            flexWrap: 'wrap',
                        },
                        _flexRow,

                    ])}>
                    {
                        groupContactList.length > 0 && groupContactList.map((item, index) =>
                            <View
                                key={index.toString()}
                                style={_style([
                                    {       
                                        paddingLeft: 2,
                                        paddingRight: 2,
                                        paddingTop: 2,
                                        paddingBottom: 2,
                                        height: 25, 
                                    },
                                ])}>
                                <TouchableOpacity
                                    onPress={() => {
                                        removeItemFromGroup(item.item.contactId || item.item.userId);
                                    }}>
                                    <View
                                        style={_style([
                                            {      
                                                paddingLeft: 4,
                                                paddingRight: 4,
                                                paddingTop: 1,
                                                paddingBottom: 1,         
                                                borderRadius: 6,  
                                                backgroundColor: '#CECECE'
                                            },
                                        ])}>
                                        <Text
                                            style={_style([
                                                {    
                                                },
                                                _font(fonts.$rubikMedium, colors.$secondaryBlue, 15),
                                            ])}>
                                            {
                                                UpperCaseString(item.item.nickName, 'Sub')
                                            }
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    <TextInput 
                        style={_style([
                            {
                                padding: 0,
                                height: 25,
                                // borderColor: 'blue',
                                // borderWidth: 1,
                                flex: 1,
                                minWidth: '30%',
                                paddingLeft: 5,
                                paddingRight: 5,
                            },
                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 15),
                        ])}
                        onFocus={() => handleViewContact(true)}
                        onChangeText={(t) => handleChange(t)}
                        placeholder={"Search..."}  
                        value={searchString}
                    />
                </View>
                
                
            </View>
            {
                viewContacts &&
                <View
                    style={_style([
                        {
                            // position: 'absolute',
                            width: '100%',
                            // top: '100%',
                            flex: 1,
                            // borderWidth: 5,
                            // borderColor: 'red',
                            zIndex: 5,
                            backgroundColor: colors.$white,


                            display: 'flex',
                            flexDirection: 'column',
                        },
                    ])}>
                    <View
                        style={_style([
                            {
                                paddingRight: 10,
                                paddingTop: 10,
                                paddingBottom: 5,
                                alignItems: 'flex-end',
                            }
                        ])}>
                        <TouchableOpacity onPress={() => {

                                Keyboard.dismiss();
                                handleViewContact(false)
                            }}>
                            <Image 
                                style={{
                                    width: 15,
                                    height: 15,
                                }}
                                resizeMode="stretch" 
                                source={images.closeWallet} 
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={_style([
                            {
                                // maxHeight: 200,
                                paddingRight: 5,
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
                                    onLongPress={() => {}}
                                />
                            }
                            keyExtractor={item => item.id + new Date()}
                        />
                    </View>  
                </View>
            }
            
        </View>
    );
};

export default CMailContactItem;
