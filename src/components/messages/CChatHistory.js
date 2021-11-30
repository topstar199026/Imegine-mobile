import moment from 'moment';
import { View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {useDispatch, useSelector} from 'react-redux';
import { SwipeRow } from 'react-native-swipe-list-view';

import { getContactInfo } from 'src/actions/contact';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flex, _flexRow, _font, _size, _style } from 'src/modules/Style';
import { UpperCaseString } from 'src/modules/FormatUtil';

var styles = StyleSheet.create({
    container: {
        width: '98%',
        overflow: 'hidden',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.$white,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 2,
        marginRight: 2,

        display: 'flex',
        flexDirection: 'row',

        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 2,
    },
    view1: {
        width: 75,
        // height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        
        paddingTop: 10,
        paddingBottom: 10,
    },
    view2: {
        flex: 1,
        // height: 80,,
        
        paddingTop: 10,
        paddingBottom: 10,
    },
    view3: {
        width: 83,
        alignItems: 'center',
        justifyContent: 'center',
        
        paddingTop: 10,
        paddingBottom: 10,
    },
    textTime: {
        fontFamily: fonts.$rubikRegular,
        color: '#000000',
        fontSize: 11,
        opacity: 0.7,
    },
    text1: {
        fontFamily: fonts.$rubikBold,
        color: colors.$secondaryBlue,
        fontSize: 15,
    },
    text2: {
        fontFamily: fonts.$rubikRegular,
        color: colors.$secondaryBlue,
        fontSize: 13,
        lineHeight: 17.86
    },
    text3: {
        fontFamily: fonts.$rubikBold,
        color: colors.$white,
        fontSize: 11,
        lineHeight: 17.86
    }
});

const CChatHistory = (props) => {

    const item = props.item.item;
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    // @ts-ignore
    const user = useSelector((state) => state.auth.user);
    // @ts-ignore
    // const messageStateFlag = useSelector((state) => state.socket.messageStateFlag);

    const dispatch = useDispatch();
    const historyRow = useRef();
    const actionState = props.actionState;
    
    const [groupName, setGroupName] = useState(null);
    const [contactInfo, setContactInfo] = useState(null);

    const [isGroup, setIsGroup] = useState(null);
    const [groupCount, setGroupCount] = useState(0);
    const [title, setTitle] = useState('Loading...');
    const [subTitle, setSubTitle] = useState(' ');
    const [content, setContent] = useState('...');
    const [imagePath, setImagePath] = useState(null);
    
    const [uId, setUId] = useState('...');
    
    useEffect(() => {
        if(item) {
            item && item.type !== 'favorite' && handleContactInfo(item);
            return () => {
                setGroupName('');
                setContactInfo({});
            }
        }else {
        }
    }, [])

    const handleContactInfo = async (item) => {
        try {
            let _private = item.private;
            const members = Object.values(item.member);
            console.log('_private', _private, item, members)
            setIsGroup(!_private);
            setGroupCount(members.length);
            if(_private === true) {
                let _contactId;
                for(var i=0; i<members.length; i++) {
                    if(members[i] !== user.userId) _contactId = members[i];
                }
                console.log('_private', _contactId)
                if(_contactId) {
                    const res = await getContactInfo(rsa, {
                        contactId: _contactId,
                    });

                    if(res.status === true) {
                        const _contactInfo = res.data;
                        // console.log('message history item contact info', _contactInfo);
                        const isContactInfo = _contactInfo.groupId ? true : false;
                        setContactInfo(_contactInfo);
                        setTitle(
                            UpperCaseString(_contactInfo.nickName, 'Sub')
                        );
                        setSubTitle(
                            isContactInfo ? _contactInfo.contactId : _contactInfo.userId
                        );
                        setContent(item.lastMessage);
                        setImagePath(isContactInfo ? _contactInfo.contactImage : _contactInfo.avatar);

                        setUId(_contactInfo.nickName.substr(0, 2));
                    } else {
                        setGroupName('Load failed.')
                    }
                    
                }else {
                    setGroupName('No contact id.')
                    setContent(item.lastMessage)
                };
            }else{
                setTitle(UpperCaseString(item.groupName, 'Sub'));
                setContent(item.lastMessage);
                setImagePath('https://imegine-app.fra1.digitaloceanspaces.com/avatar/group-chat');
                setUId(item.groupName.substr(0, 2));
            }
        } catch (error) {            
            console.log('error', error);
        }
        
    }

    const getChatTime = (date) => {
        return moment(date).format('HH:mm');
    }

    const handleDelete = async () => {
            props.handleDeleteHistory && props.handleDeleteHistory();
    }

    return (
        <>
            {
                props.item.item.type === 'favorite' ?                
                <View style={[styles.container, {
                        borderRadius: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                    }, props.style]}>
                    <View style={{

                        }}>
                        <Text style={{
                            fontFamily: fonts.$rubikRegular,
                            fontSize: 17,
                            color: colors.$secondaryBlue,
                            }}>
                            {'Favorites'}
                        </Text>
                    </View>
                </View>
                :
                <View style={[styles.container, props.style]}>
                    <SwipeRow
                        ref={historyRow}
                        disableRightSwipe
                        rightOpenValue={-50}
                        style={_style([
                            {
                                width: '100%',
                            }
                        ])}>
                        <View
                            style={_style([
                                {
                                    borderRadius: 20,
                                    width: '100%',
                                    height: 75,
                                    backgroundColor: 'red',
                                },
                                _flexRow,
                            ])}>
                            <View style={{flex: 1,}} />
                            <View 
                                style={_style([
                                    styles.view3,
                                    {
                                        backgroundColor: 'red',
                                        padding: 0,
                                        borderRadius: 20,
                                        width: 50,
                                        borderBottomLeftRadius: 0,
                                        borderTopLeftRadius: 0,
                                        // height: 74,
                                    }
                                ])}>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleDelete();
                                    }}>
                                    <View
                                        style={_style([
                                            {
                                                height: '100%',
                                                width: '100%',
                                            },
                                            _flex,
                                            _center
                                        ])}>
                                        <Image source={images.size4.message.eraseWhite4x} style={_style([_size(24, 24)])} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={_style([
                                {
                                    backgroundColor: colors.$white,
                                    width: '100%',
                                },
                            ])}>
                            <TouchableOpacity
                                onPress={() => {                                    
                                    if(historyRow?.current)
                                    // @ts-ignore
                                    historyRow.current.closeRow();
                                    props.onPress(contactInfo);
                                }}>
                                <View
                                    style={_style([
                                        {
                                            // borderRadius: 20,
                                            backgroundColor: colors.$white,
                                            width: '100%',
                                            // height: '100%',
                                        },
                                        _flexRow,
                                    ])}>
                                    
                                    <View style={[styles.view1]}>
                                        {
                                            imagePath ?
                                            <Image 
                                                source={{
                                                    uri: 'https://imegine-app.fra1.digitaloceanspaces.com/' + imagePath
                                                }} 
                                                style={_style([
                                                    {
                                                        borderRadius: 26, 
                                                        borderColor:'#54E5FF', 
                                                        borderWidth: 4
                                                    },
                                                    _size(52, 52),
                                                ])}
                                            />
                                            :
                                            <View
                                                style={_style([
                                                    {
                                                        borderRadius: 26, 
                                                        borderColor:'#54E5FF', 
                                                        borderWidth: 4,
                                                        backgroundColor: colors.$secondaryBlue
                                                    },
                                                    _size(52, 52),
                                                    _flex,
                                                    _center,
                                                ])}>
                                                <Text 
                                                    style={_style([
                                                        {
                                                        },
                                                        _font(fonts.$rubikMedium, colors.$white, 17)
                                                    ])}>
                                                    {uId ? uId.toUpperCase() : '...'}
                                                </Text>
                                            </View>
                                        }
                                        
                                        {/* <Text style={[styles.textTime, {marginTop: 4}]}>{getChatTime(item.lastDate)}</Text> */}
                                    </View>
                                    
                                    <View style={[styles.view2]}>
                                        <Text style={[styles.text1]}>
                                            {
                                                title
                                            }
                                        </Text>
                                        <Text 
                                            style={_style([                                
                                                styles.text1,
                                                _font(fonts.$robotMedium, colors.$secondaryBlue, 12),
                                                {
                                                    opacity: 0.8,
                                                }
                                            ])}>
                                            {
                                                isGroup ?
                                                'Members: ' + groupCount
                                                :
                                                'ID: ' + subTitle
                                            }
                                        </Text>
                                        <Text 
                                            style={_style([
                                                styles.text2, 
                                                {
                                                    marginTop: 2, 
                                                    maxHeight: 20, //50
                                                }
                                            ])}>
                                            {/* {item.lastMessage} */}
                                            {
                                                content
                                            }
                                        </Text>
                                    </View>
                                    <View style={[styles.view3]}>
                                        <Text style={[styles.textTime]}>
                                            {getChatTime(item.lastDate)}
                                            {/* {
                                                '25/22/2022'
                                            } */}
                                        </Text>
                                        {
                                            item.newMessage > 0 ?
                                            <View 
                                                style={_style([
                                                    {
                                                        borderRadius: 11,
                                                        backgroundColor: '#54E5FF',
                                                        marginTop: 10,
                                                    },
                                                    _size(21, 21),
                                                    _center,
                                                ])}>
                                                <Text style={[styles.text3]}>
                                                    {
                                                        item.newMessage.toString()
                                                    }
                                                </Text>
                                            </View>
                                            :
                                            <View 
                                                style={_style([
                                                    {
                                                        // borderRadius: 11,
                                                        // backgroundColor: '#54E5FF',
                                                        marginTop: 10,
                                                    },
                                                    _size(21, 21),
                                                    _center,
                                                ])}>
                                            </View>
                                        }                        
                                    </View>                                
                                </View>
                            </TouchableOpacity>
                        </View>
                    </SwipeRow>
                </View>
            }
        </>
    );
};

export default CChatHistory;
