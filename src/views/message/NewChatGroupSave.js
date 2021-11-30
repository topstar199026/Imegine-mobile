import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, StatusBar, FlatList, Image, ScrollView, Text} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
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
import { _center, _centerH, _centerV, _flexRow, _font, _size, _style } from 'src/modules/Style';
import CNewContact from 'src/components/messages/CNewContact';
import { ContactActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import CContactSelectItem from 'src/components/messages/CContactSelectItem';
import CContactGroupItem from 'src/components/messages/CContactGroupItem';
import CLableInput from 'src/components/messages/CLableInput';


var styles = StyleSheet.create({
    
});

const NewChatGroupSave = (props) => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);

    const _groupContactList = props.route.params.groupContactList;
    
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    
    const [groupContactList, setGroupContactList] = useState([]);
    const [groupContactItem, setGroupContactItem] = useState(new Map());
    const [groupName, setGroupName] = useState('');

    const [validate, setValidate] = useState(false);

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);

        const _temp = groupContactItem;
        for(var i = 0; i < _groupContactList.length; i++) {
            _temp.set(_groupContactList[i].item.contactId, _groupContactList[i].item)
        }
        setGroupContactItem(new Map(_temp));

    }, []);

    useEffect(() => {
        makeGroupContactList();        
    }, [groupContactItem]);

    const makeGroupContactList = () => {
        var __groupContactList = [];
        var keys = Array.from(groupContactItem.keys());
        for(var i = 0; i < keys.length; i++) {
            var _key = keys[i];
            var _data = groupContactItem.get(_key);
            __groupContactList.push({
                id: i,
                item: _data,
            });
        }
        setGroupContactList(__groupContactList);
    }


    const handleTypeActive = (s) => {
        var _validate = false;

        if(groupName.length > 0 && groupContactList.length > 0) {
            
        } else {
            _validate = true;
        }

        _validate === false && ContactActions.groupSave(rsa, {
            groupName: groupName,
            groupContactList:groupContactList,
            key: rsa.public
        }, res => {
            if(res && res.status === true) {
                setTimeout(() => {
                    navigation.navigate('Main', {
                        screen: 'Message'
                    });
                }, 1000);
            }else if(res && res.status === false && res.error) {
                Utils.toast(1, res.error);
            }
        });
    }
    
    const removeItemFromGroup = (contactId) => {
        const _temp = groupContactItem;
        console.log(contactId, groupContactItem)
        if(_temp.has(contactId)) {
            _temp.delete(contactId);
            setGroupContactItem(new Map(_temp));
        }
        var keys = Array.from(_temp.keys());
        if(keys.length < 1) {
            navigation.goBack();
        }
    }  
    
    const handleChange = (t) => {
        setGroupName(t)
    }

    const onLongPress = (item) => {

    }

    const switchHome = (action) => {
        navigation.navigate(action);
    } 

    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'newChatGroupSave'}
            switchHome={(action) => switchHome(action)}
            backFlag={true}
            handleTypeActive={(s) => handleTypeActive(s)} 
            >        
            <View
                style={[{
                    height: '100%',
                    paddingTop: 70,
                    paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                    // paddingLeft: 10,
                    // paddingRight: 10,
                }]}>
                <View
                    style={_style([
                        {
                            paddingLeft: 15,
                            paddingRight: 15,
                            paddingBottom: 15,
                        },
                        _flexRow,
                        _center,
                    ])}>
                    <View
                        style={_style([
                            {
                            },
                            _center,
                            _size(80, 80),
                        ])}>
                        <Image style={_style([
                            _size(80, 80),
                        ])} source={images.messagePage.newGroup.groupSave} />
                    </View>
                    <View
                        style={_style([
                            {
                                flex: 1,
                                paddingLeft: 15,
                            },
                        ])}>
                        <CLableInput 
                            noLabel={true}
                            label={''} 
                            placeholder={'Group Name'} 
                            handleChange={(t) => handleChange(t)}
                            value={groupName}
                        />
                    </View>
                </View>
                <View
                    style={_style([
                        {
                            paddingBottom : 10,
                        },
                        _flexRow,
                        _center,
                    ])}>
                    <View
                        style={_style([
                            {
                                flex: 1,
                                paddingLeft: 15,
                                backgroundColor: colors.$white,
                                height: 32,
                                width: '100%',

                                shadowColor: colors.$secondaryBlue,
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.5,
                                shadowRadius: 1,        
                                elevation: 6,
                            },
                            _centerH,
                        ])}>
                        <Text
                            style={_style([
                                _font(fonts.$rubikMedium, colors.$secondaryBlue, 17)
                            ])}>
                            {'Participants'}
                        </Text>
                    </View>
                </View>
                <ScrollView
                    style={_style([
                        {
                            padding: 10,
                        },
                    ])}>
                    <View
                        style={_style([
                            _flexRow,
                            {
                                flexWrap: 'wrap',
                            },
                        ])}>
                        {
                            groupContactList.map((item, index) => 
                                <CContactGroupItem 
                                    key={index.toString()}
                                    item={item.item}
                                    onPress={(contactId) => removeItemFromGroup(contactId)}
                                    // style={{
                                    //     width: '25%',
                                    //     height: 95,
                                    // }}
                                />
                            )                            
                        }                            
                    </View>
                    
                </ScrollView>
                {/* <View
                    style={{
                                         
                    }}>
                    {
                        _groupContactList.length > 0 &&
                        <FlatList 
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={_groupContactList}
                            renderItem={item => 
                                <CContactGroupItem 
                                    item={item.item.item}
                                    onPress={(contactId) => removeItemFromGroup(contactId)}
                                />
                            }
                            keyExtractor={item => item.id.toString()}    
                        />
                    }
                    
                </View> */}
                           
            </View>      
        </MainLayout>
    )
}

export default NewChatGroupSave