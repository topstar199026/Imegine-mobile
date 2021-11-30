import React, { useEffect, useState } from 'react';
import {View, StatusBar, FlatList} from "react-native" ;
import {useSelector} from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import {colors, images} from 'src/assets/themes';
import { useNavigation } from '@react-navigation/native';

import CSearch from 'src/components/messages/CSearch';
import MainLayout from 'src/layouts';

import { _style } from 'src/modules/Style';
import CNewContact from 'src/components/messages/CNewContact';
import { ContactActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import CContactItem from 'src/components/messages/CContactItem';
import { UpperCaseString } from 'src/modules/FormatUtil';

const NewChat = () => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    
    const [searchString, setSearchString] = useState(null);
    const [contactListTemp, setContactListTemp] = useState(null);
    const [contactList, setContactList] = useState([]);
    const NewList = [
        {
            id: 0,
            image: images.size4.message.newGroupBlue4x,
            title: 'New Group',
            action: [
                'NewChatGroup',
            ],
        },
        {
            id: 1,
            image: images.size4.message.newContactBlue4x,
            title: 'New Contact',
            action: [
                'NewContact',
            ],
        },
        {
            id: 2,
            image: images.size4.message.newEmailBlue4x,
            title: 'New Email',
            action: [''],
        }
    ];

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, []);

    useEffect(() => {
        // setSearchString(null);
    }, [isFocused])

    useEffect(() => {
        // searchString.length > 2 &&
        getContactList();
    }, [searchString]);

    useEffect(() => {
        makeContactList();
    }, [contactListTemp]);

    const refresh = () => {
        getContactList();
    }

    const makeContactList = () => {
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
                    }
                );
            });

            console.log('1----------', _temp.length)
            // for(var i = 0; i < contactListTemp.uRows.length; i++) {
            //     if(i === 0) {
            //         const _fContactList = {
            //             id: _temp.length,
            //             type: 'group',
            //             title: 'Matched contacted',
            //         };
            //         _temp.length === 0 && _temp.push(_fContactList);
            //     }
            //     _temp.push(
            //         // @ts-ignore
            //         {
            //             id: _temp.length,
            //             type: 'user',
            //             item: contactListTemp.uRows[i],
            //         }
            //     );
            // }

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
                    }
                );
            });
            console.log('2----------', _temp.length)
            
            // for(var i = 0; i < contactListTemp.fRows.length; i++) {
            //     if(i === 0) {
            //         const _fContactList = {
            //             id: _temp.length,
            //             type: 'group',
            //             title: 'Frequently contacted',
            //         };
            //         _temp.length === 0 && _temp.push(_fContactList);
            //     }
            //     _temp.push(
            //         // @ts-ignore
            //         {
            //             id: _temp.length,
            //             type: 'item',
            //             item: contactListTemp.fRows[i],
            //         }
            //     );
            // }

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
                    }
                );
            });
            
            console.log('3----------', _temp.length)
            // for(var i = 0; i < contactListTemp.rows.length; i++) {
            //     const _item = contactListTemp.rows[i];
            //     const _sC = _item.firstName ?  _item.firstName.charAt(0) : ' ';
    
            //     if(groupId === _sC.toUpperCase()) {
    
            //     }else{
            //         groupId = _sC.toUpperCase();
            //         _temp.push(
            //             {
            //                 id: _temp.length,
            //                 type: 'group',
            //                 title: groupId,
            //             }
            //         );
            //     }
            //     _temp.push(
            //         // @ts-ignore
            //         {
            //             id: _temp.length,
            //             type: 'item',
            //             item: _item,
            //         }
            //     );
            // }
            setContactList(_temp);

            console.log(_temp);
        }else{
            setContactList([]);
        }
        
    }

    const getContactList = async () => {
        ContactActions.getContactList4(rsa, {
            searchString: searchString || '',
            key: rsa.public,
            flag: false,
        }, res => {
            if(res && res.status === true) {

                console.log(res.data)
                setContactListTemp(res.data);
            }else if(res && res.status === false && res.error) {
                setContactListTemp([]);
                Utils.toast(1, res.error);
            }
        });
    }

    const handleTypeActive = (s) => {
        
    }

    const handleChange = (t) => {
        setSearchString(t);
    }
    

    const onPress = (item) => {
        navigation.navigate('SendMessage', {
            contactInfo: JSON.stringify(item.item.item),
        });
    }    

    const onLongPress = (item) => {

    }

    const switchHome = (action) => {
        navigation.navigate(action);
    } 

    return (
        <MainLayout 
            controlBarPosition={controlBarPosition}
            topBarId={'newChat'}
            switchHome={(action) => switchHome(action)}
            backFlag={true}
            handleTypeActive={(s) => handleTypeActive(s)} 
            >        
            <View
                style={_style([
                    {
                        height: '100%',
                        paddingTop: 70,
                        paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                        paddingLeft: 10,
                        paddingRight: 10,
                    }
                ])}>
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
                    <FlatList 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={NewList}
                        renderItem={item => 
                            <CNewContact 
                                id={item.item.id}
                                image={item.item.image} 
                                title={item.item.title}
                                action={item.item.action}
                            />
                        }
                        keyExtractor={item => item.id.toString()}    
                    />
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
                        renderItem={(item, index) => 
                            <CContactItem 
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

export default NewChat