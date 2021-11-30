import moment from 'moment';
import { StatusBar, View } from 'native-base';
import React, {memo, useEffect, useState} from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HTMLView from 'react-native-htmlview';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flex, _flexRow, _font, _size, _style } from 'src/modules/Style';
import CChatBotTitle from './CChatBotTitle';
import CTyping from './CTyping';
import CCheck from './CCheck';
import { UpperCaseString } from 'src/modules/FormatUtil';

var styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 7,
        marginBottom: 7
    },
    avatarContainer1: {
        width: 50,
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    avatarContainer2: {
        width: 60,
        paddingLeft: 10,
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    textContainer1: {
        minWidth: 80,
        maxWidth: '80%',
        // flex: 1,
        paddingTop: 3,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 3,
        borderColor: '#54E5FF',
        borderWidth: 3,
        borderRadius: 15,
        borderTopLeftRadius: 0,
        backgroundColor: colors.$white,
        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 2,
    },
    textContainer1_copy: {
        flex: 1,
        padding: 14,
        borderColor: '#54E5FF',
        borderWidth: 4,
        borderRadius: 30,
        borderTopLeftRadius: 0,
        backgroundColor: colors.$white,
        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 2,
    },
    textContainer2: {
        minWidth: 80,
        maxWidth: '80%',
        // flex: 1,        
        paddingTop: 3,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 3,
        borderColor: '#CDEBF9',
        borderWidth: 4,
        borderRadius: 15,
        borderTopRightRadius: 0,
        backgroundColor: '#CDEBF9',
        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 2,
    },
    textContainer2_copy: {
        flex: 1,
        padding: 18,
        borderColor: '#CDEBF9',
        borderWidth: 4,
        borderRadius: 40,
        borderTopRightRadius: 0,
        backgroundColor: '#CDEBF9',
        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 2,
    },
    text1: {
        fontFamily: fonts.$rubikRegular,
        fontSize: 17,
        color: colors.$secondaryBlue
    },
    text2: {
        fontFamily: fonts.$rubikRegular,
        fontSize: 17,
        color: colors.$secondaryBlue
    },



    typing_container: {
        flex: 1,
        paddingTop: 6,
        paddingLeft: 11,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        backgroundColor: '#D9D9D9',
        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 2,
    },



    
    receive_email_container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 7,
        marginBottom: 7,
        paddingRight: 40,
    },
    receive_email_textContainer: {
        flex: 1,
        borderRadius: 30,
        borderTopLeftRadius: 0,
        // backgroundColor: '#54E5FF',
        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 2,
    },
    receive_email_subContainer: {
        padding: 14,
        borderStyle: 'dashed',
        // borderColor: '#0291CA',#54E5FF
        borderColor: '#54E5FF',
        borderWidth: 4,
        borderRadius: 30,
        borderTopLeftRadius: 0,
        
    },


    send_email_container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 7,
        marginBottom: 7,
    },
    send_email_textContainer: {
        flex: 1,
        // maxWidth: '80%',
        // minWidth: '80%',
        borderRadius: 30,
        borderTopRightRadius: 0,
        backgroundColor: '#CDEBF9',
        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 2,
    },
    send_email_subContainer: {
        padding: 14,
        borderStyle: 'dashed',
        // borderColor: '#0291CA',#54E5FF
        borderColor: '#54E5FF',
        borderWidth: 4,
        borderRadius: 30,
        borderTopRightRadius: 0,
        
    },

    email_container: {
        width: '100%',
        // height: 150,
        padding: 12,
        borderRadius: 20,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.$white,
        marginTop: 9,
        marginBottom: 9,
        marginLeft: 2,
        marginRight: 2,

        display: 'flex',
        flexDirection: 'column',

        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 2, 
    },

    no_new_container: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

var htmlStyles = StyleSheet.create({
    // html: {
    //     fontFamily: fonts.$rubikRegular,
    //     fontSize: 17,
    //     color: colors.$secondaryBlue,
    // },
    // body: {
    //     fontFamily: fonts.$rubikRegular,
    //     fontSize: 17,
    //     color: colors.$secondaryBlue,
    // },
    // div: {
    //     fontFamily: fonts.$rubikRegular,
    //     fontSize: 17,
    //     color: colors.$secondaryBlue,
    // }
});


const getChatTime = (date) => {
    return moment(date).format('HH:mm');
}

const Htmls = ({message}) => {
    // console.log('message', message)
    return (
        // @ts-ignore
        <HTMLView
            value={message}
            stylesheet={htmlStyles}
        />
    );
}

const ReceiveItem = (data) => {
    const sender = data.data.sender;
    const groupContactMap = data.groupContactMap;
    const selectState = data.selectState;
    const checked = data.checked;

    const [avatar, setAvatar] = useState(null);
    const [userSubName, setUserSubName] = useState(null);

    useEffect(() => {
        if(groupContactMap) {
            const senderInfo = groupContactMap.get(sender.userId);
            if(senderInfo) {
                // console.log('senderInfo', senderInfo);
                senderInfo.avatar && setAvatar('https://imegine-app.fra1.digitaloceanspaces.com/' + senderInfo.avatar);
                setUserSubName(senderInfo.nickName.substr(0, 2));
            }else{
                setUserSubName(sender.nickName.substr(0, 2));
            }
        }

    }, [groupContactMap])
    
    return (
        <View style={[styles.container]}>
            <View style={[styles.avatarContainer1]}>
                {
                    selectState?
                    <CCheck checked={checked} />
                    :
                    avatar ?
                    <Image 
                        source={{
                            uri: avatar
                        }} 
                        style={_style([
                            {
                                borderRadius: 20, 
                                borderColor: colors.$bubbles, 
                                borderWidth: 2
                            },
                            _size(40, 40)
                        ])} 
                    />  
                    :
                    <View
                        style={_style([
                            {
                                borderRadius: 20, 
                                borderColor: colors.$bubbles, 
                                borderWidth: 2,
                                backgroundColor: colors.$secondaryBlue
                            },
                            _size(40, 40),
                            _flex,
                            _center,
                        ])}>
                        <Text 
                            style={_style([
                                {
                                },
                                _font(fonts.$rubikMedium, colors.$white, 17)
                            ])}>
                            {userSubName ? userSubName.toUpperCase() : '...'}
                        </Text>
                    </View>

                }
                              
            </View>
            <View 
                style={_style([
                    {
                        flex: 1,
                    },
                    _flexRow,
                ])}>
                <View style={[styles.textContainer1]}>
                    {/* <Htmls message={data.data.message} /> */}
                    <Text style={[styles.text1]}>
                        {data.data.message}
                    </Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={{flex: 1}}></Text>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikRegular,
                                fontSize: 13,
                                color: colors.$secondaryBlue,
                                opacity: 0.5,
                            }}>
                            {
                                getChatTime(data.data.date).toString()
                            }
                        </Text>
                    </View>
                </View>
                <View
                    style={_style([
                        {
                            flex: 1,
                        },
                    ])}>
                </View>
            </View>
        </View>
    );
}

const ReceiveBotItem = (data) => {
    return (
        
        <View style={[styles.container]}>
            <View style={[styles.avatarContainer1]}>
                <Image source={images.bot} style={{width: 40, height: 40, borderRadius: 20, borderColor: colors.$white, borderWidth: 2}} />
                {/* <Image source={images.bot} style={{width: 52, height: 52, borderRadius: 26, borderColor: colors.$white, borderWidth: 4}} /> */}
            </View>
            <View style={{flex: 1, paddingRight: 8}}>
                <LinearGradient
                    colors={['#56DDF5', '#7D9FFB']} 
                    style={{
                        borderRadius: 30,
                        borderTopLeftRadius: 0,
                        shadowColor: colors.$secondaryBlue,
                        shadowOffset: {
                            width: 3,
                            height: 3,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,        
                        elevation: 4,
                    }}>
                    <View style={{
                            flex: 1,
                            padding: 14,
                            borderColor: colors.$transparent,
                            borderWidth: 4,
                            borderRadius: 30,
                            borderTopLeftRadius: 0,
                            backgroundColor: colors.$white,
                            
                        }}>
                        <Text 
                            style={{
                                fontFamily: fonts.$rubikMedium,
                                fontSize: 13,
                                color: colors.$secondaryBlue,
                            }}>
                            {'Albert Johnson(Gala)'}
                        </Text>
                        <Text 
                            style={{
                                fontFamily: fonts.$rubikRegular,
                                fontSize: 17,
                                color: colors.$secondaryBlue,
                                lineHeight: 22,
                                marginTop: 2,
                            }}>
                            {'What type of appointment do you need?'}
                        </Text>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Text style={{flex: 1}}></Text>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikRegular,
                                    fontSize: 13,
                                    color: colors.$secondaryBlue,
                                    opacity: 0.5,
                                }}>
                                12:16
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
                
            </View>
        </View>
    );
}

const ReceiveScheduleItem = (data) => {
    return (
        <View style={[styles.container]}>
            <View style={[styles.avatarContainer1]}>
                <Image source={images.bot} style={{width: 40, height: 40, borderRadius: 20, borderColor: colors.$white, borderWidth: 2}} />
            </View>
            <View style={{flex: 1, paddingRight: 8}}>
                <View style={[styles.textContainer1]}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingBottom: 5,
                        }}>
                        <View
                            style={{
                                paddingTop: 3,
                            }}>
                            <Image source={images.calendar} />
                        </View>
                        <View
                            style={{
                                paddingLeft: 8
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikBold,
                                    fontSize: 15,
                                    color: colors.$secondaryBlue,
                                }}>
                                {'Doctor Appointment'}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikRegular,
                                    fontSize: 13,
                                    color: colors.$secondaryBlue,
                                }}>
                                {'Tuesday 4 July'}
                            </Text>
                        </View>
                    </View>
                    <View 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: 1,
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikBold,
                                fontSize: 13,
                                color: colors.$secondaryBlue,
                            }}>
                            {'From:  '}
                        </Text>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikRegular,
                                fontSize: 13,
                                color: colors.$secondaryBlue,
                            }}>
                            {'13:00 to 14:00'}
                        </Text>
                    </View>
                    <View 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: 1,
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikBold,
                                fontSize: 13,
                                color: colors.$secondaryBlue,
                            }}>
                            {'Guests:  '}
                        </Text>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikRegular,
                                fontSize: 13,
                                color: colors.$secondaryBlue,
                            }}>
                            {'1'}
                        </Text>
                    </View>
                    <View 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: 1,
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikBold,
                                fontSize: 13,
                                color: colors.$secondaryBlue,
                            }}>
                            {'Location:  '}
                        </Text>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikRegular,
                                fontSize: 13,
                                color: colors.$secondaryBlue,
                            }}>
                            {'7th Avenue 7850B, New York'}
                        </Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 3,}}>
                        <Text style={{flex: 1}}></Text>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikRegular,
                                fontSize: 13,
                                color: colors.$secondaryBlue,
                                opacity: 0.5,
                            }}>
                            12:16
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const ReceiveEmailItem = (data) => {
    return (
        <View style={[styles.receive_email_container]}>
            <View style={[styles.avatarContainer1]}>
                <Image source={images.bot} style={{width: 40, height: 40, borderRadius: 20, borderColor: colors.$white, borderWidth: 2}} />
            </View>
            <View style={{flex: 1, paddingRight: 8}}>
                <View style={[styles.receive_email_textContainer]}>
                    <View style={[styles.receive_email_subContainer]}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <View>
                                <Image source={images.email} />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingLeft: 9,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikBold,
                                        fontSize: 13,
                                        color: colors.$secondaryBlue,
                                    }}>
                                    {data.data.subject || 'No Subject'}
                                </Text>
                            </View>
                            <View>
                                <Image source={images.next} />
                            </View>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Text style={{flex: 1}}></Text>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikRegular,
                                    fontSize: 13,
                                    color: colors.$secondaryBlue,
                                    opacity: 0.5,
                                }}>
                                {
                                    getChatTime(data.data.date).toString()
                                }
                            </Text>
                        </View>
                    </View>
                    
                </View>
            </View>
        </View>
    );
}

const SendItem = (data) => {
    const sender = data.data.sender;
    const groupContactMap = data.groupContactMap;
    const selectState = data.selectState;
    const checked = data.checked;

    const [avatar, setAvatar] = useState(null);
    const [userSubName, setUserSubName] = useState(null);

    
    useEffect(() => {
        if(groupContactMap) {
            const senderInfo = groupContactMap.get(sender.userId);
            if(senderInfo) {
                // console.log('senderInfo', senderInfo);
                senderInfo.avatar && setAvatar('https://imegine-app.fra1.digitaloceanspaces.com/' + senderInfo.avatar);
                setUserSubName(senderInfo.nickName.substr(0, 2));
            }else{
                setUserSubName(sender.nickName.substr(0, 2));                
            }
        }

    }, [groupContactMap])

    return (
        <View style={[styles.container]}>
            <View 
                style={_style([
                    {
                        flex: 1,

                    },
                    _flexRow,
                ])}>
                <View
                    style={_style([
                        {
                            flex: 1,
                        },
                    ])}>
                </View>
                <View style={[styles.textContainer2]}>
                    <Text style={[styles.text2]}>
                        {data.data.message}
                    </Text>
                    <View 
                        style={{
                            display: 'flex', flexDirection: 'row', marginTop: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{flex: 1}}></Text>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikRegular,
                                fontSize: 13,
                                color: colors.$secondaryBlue,
                                opacity: 0.5,
                            }}>
                            {
                                getChatTime(data.data.date).toString()
                            }
                        </Text>
                        {
                            data.data.readBy === true &&
                            <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    backgroundColor: '#EDF8FD',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: 10,
                                }}>
                                <Image source={images.doubleChecked} />
                            </View>
                        }                        
                    </View>
                </View>
            </View>
            <View style={[styles.avatarContainer2]}>
                {
                    selectState?
                    <CCheck checked={checked} />
                    :
                    avatar ?
                    <Image 
                        source={{
                            uri: avatar
                        }} 
                        style={_style([
                            {
                                borderRadius: 20, 
                                borderColor: colors.$bubbles, 
                                borderWidth: 2
                            },
                            _size(40, 40)
                        ])} 
                    />  
                    :
                    <View
                        style={_style([
                            {
                                borderRadius: 20, 
                                borderColor: colors.$bubbles, 
                                borderWidth: 2,
                                backgroundColor: colors.$secondaryBlue
                            },
                            _size(40, 40),
                            _flex,
                            _center,
                        ])}>
                        <Text 
                            style={_style([
                                {
                                },
                                _font(fonts.$rubikMedium, colors.$white, 17)
                            ])}>
                            {userSubName ? userSubName.toUpperCase() : '...'}
                        </Text>
                    </View>

                }
            </View>
        </View>
    );
}

const SendEmailItem = (data) => {

    // console.log('SendEmailItem', data.data.mailTo)
    return (
        <View style={[styles.send_email_container]}>
            <View style={_style([
                {
                    flex: 1,

                },
                _flexRow,
            ])}>

                <View
                    style={_style([
                        {
                            // flex: 1,
                            width: 50,
                        },
                    ])}>
                </View>
                <View style={[styles.send_email_textContainer]}>
                    <View style={[styles.send_email_subContainer]}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <View>
                                <Image source={images.email} />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingLeft: 9,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.$rubikBold,
                                        fontSize: 13,
                                        color: colors.$secondaryBlue,
                                    }}>
                                    {data.data.subject || 'No Subject'}
                                </Text>
                            </View>
                            <View>
                                <Image source={images.next} />
                            </View>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Text style={{flex: 1}}></Text>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikRegular,
                                    fontSize: 13,
                                    color: colors.$secondaryBlue,
                                    opacity: 0.5,
                                }}>
                                {
                                    getChatTime(data.data.date).toString()
                                }
                            </Text>
                        </View>
                    </View>
                    
                </View>
            </View>
            <View style={[styles.avatarContainer2]}>
                <Image source={images.bot} style={{width: 40, height: 40, borderRadius: 20, borderColor: colors.$white, borderWidth: 2}} />
            </View>
        </View>
    );
}

const EmailItem = (data) => {
    console.log('data-------', data)
    const sender = data.data.sender;
    const groupContactMap = data.groupContactMap;
    const selectState = data.selectState;
    const checked = data.checked;

    const [avatar, setAvatar] = useState(null);
    const [userSubName, setUserSubName] = useState(null);

    useEffect(() => {
        if(groupContactMap) {
            const senderInfo = groupContactMap.get(sender.userId);
            if(senderInfo) {
                // console.log('senderInfo', senderInfo);
                senderInfo.avatar && setAvatar('https://imegine-app.fra1.digitaloceanspaces.com/' + senderInfo.avatar);
                setUserSubName(UpperCaseString(senderInfo.nickName, 'Sub'));
            }else{
                setUserSubName(UpperCaseString(senderInfo.nickName, 'Sub'));
            }
        }

    }, [groupContactMap])

    return (
        <View style={[styles.email_container]}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                <View
                    style={{
                        width: 36,
                    }}>
                    <Image source={images.bot} style={{width: 36, height: 36, borderRadius: 18, borderColor: colors.$white, borderWidth: 2}} />
                </View>
                <View
                    style={{
                        flex: 1,
                        paddingLeft: 10,
                    }}>
                    <View>
                        <Text
                            style={{
                                fontFamily: fonts.$rubikRegular,
                                fontSize: 13,
                                color: colors.$secondaryBlue  
                            }}>
                            {userSubName || ''}
                        </Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <View>
                            <Text
                                style={{
                                    fontFamily: fonts.$rubikMedium,
                                    fontSize: 15,
                                    color: colors.$secondaryBlue
                                }}>
                                {data.data.subject || 'No Subject'}
                            </Text>
                        </View>
                        <View
                            style={{
                                marginLeft: 10
                            }}>
                            <Image source={images.pin} />
                        </View>
                        <View 
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: '#54E5FF',
                                marginLeft: 10
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        // width: 36,
                        paddingRight: 5
                    }}>
                    <Text
                        style={{
                            fontFamily: fonts.$rubikRegular,
                            fontSize: 13,
                            color: 'rgba(0,0,0,0.6)',
                        }}>
                        {
                            getChatTime(data.data.date).toString()
                        }
                    </Text>
                </View>                
            </View>
            <View
                style={_style([
                    {
                        marginTop: 5,
                        paddingLeft: 5,
                        paddingRight: 20,
                        maxHeight: 34,
                    },
                ])}>
                <Htmls message={data.data.message} />
                {/* <Text
                    style={{
                        fontFamily: fonts.$rubikRegular,
                        fontSize: 13,
                        color: colors.$secondaryBlue,
                        lineHeight: 16.9,
                    }}>
                    {'Dear Pablo, please find an attachment of your medical prescription. If you have any questions, please let me know. If you have any questions, please let me know. If you have any questions, please let me know.'}
                </Text> */}
            </View>
        </View>
    );
}

const EmptyItem = (data) => {
    return (
        <View style={[styles.no_new_container, data.styles]}>
            <View
                style={{
                    width: 130,
                    height: 130,
                    borderRadius: 130,
                    backgroundColor: colors.$searchFilter,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Image source={images.noNewEmail} />
            </View>
            <Text
                style={{
                    fontFamily: fonts.$rubikBold,
                    fontSize: 27,
                    color: colors.$secondaryBlue,
                    marginTop: 11,
                }}>
                {'No new emails'}
            </Text>
            <Text
                style={{
                    fontFamily: fonts.$rubikRegular,
                    fontSize: 15,
                    color: colors.$secondaryBlue,
                    marginTop: 11,
                }}>
                {'You don’t have emails from:'}
            </Text>
            <Text
                style={{
                    fontFamily: fonts.$rubikRegular,
                    fontSize: 15,
                    color: colors.$secondaryBlue
                }}>
                {'Albert Johnson'}
            </Text>
        </View>
    );
}

const ChattingItem = (data) => {

    const sender = data.data.sender;
    const groupContactMap = data.groupContactMap;

    const [avatar, setAvatar] = useState(null);
    const [userSubName, setUserSubName] = useState(null);

    useEffect(() => {
        if(groupContactMap) {
            const senderInfo = groupContactMap.get(sender.userId);
            if(senderInfo) {
                // console.log('senderInfo', senderInfo);
                senderInfo.avatar && setAvatar('https://imegine-app.fra1.digitaloceanspaces.com/' + senderInfo.avatar);
                setUserSubName(senderInfo.nickName.substr(0, 2));
            }else{
                setUserSubName(sender.nickName.substr(0, 2));
            }
        }

    }, [groupContactMap])

    return (
        <View style={[styles.container,{
            alignItems: 'center',
            }]}>
            <View style={[styles.avatarContainer1]}>
            {
                    avatar ?
                    <Image 
                        source={{
                            uri: avatar
                        }} 
                        style={_style([
                            {
                                borderRadius: 20, 
                                borderColor: colors.$bubbles, 
                                borderWidth: 2
                            },
                            _size(40, 40)
                        ])} 
                    />  
                    :
                    <View
                        style={_style([
                            {
                                borderRadius: 20, 
                                borderColor: colors.$bubbles, 
                                borderWidth: 2,
                                backgroundColor: colors.$secondaryBlue
                            },
                            _size(40, 40),
                            _flex,
                            _center,
                        ])}>
                        <Text 
                            style={_style([
                                {
                                },
                                _font(fonts.$rubikMedium, colors.$white, 17)
                            ])}>
                            {userSubName ? userSubName.toUpperCase() : '...'}
                        </Text>
                    </View>

                }
            </View>
            <View style={{width: 52, height: 20,}}>
                <View style={[styles.typing_container]}>
                    <CTyping />
                </View>
            </View>
        </View>
    );
}

const CChatItem = (props) => {

    const data = props.data.item;
    const groupContactMap = props.groupContactMap;    
    const selectState = props.selectState;

    const [checked, setChecked] = useState(false);

    const handleCheck = () => {
        setChecked(!checked);
    }

    useEffect(() => {
        !selectState && setChecked(false);
    }, [selectState])

    return (
        <TouchableOpacity 
            onPress={() => {
                if(selectState){
                    handleCheck();
                    props.handleSelectMessage(data);
                }else{
                    data.type === '1' && props.onPress()
                }
                
            }}
            onLongPress={() => {
                props.onLongPress()
            }}>
            {
                data.type === '1' &&
                <SendItem groupContactMap={groupContactMap} data={data} selectState={selectState} checked={checked} />
            }
            {
                data.type === '2' &&
                <ReceiveItem groupContactMap={groupContactMap} data={data} selectState={selectState} checked={checked} />
            }
            {
                data.type === '4' &&
                <ReceiveBotItem groupContactMap={groupContactMap} data={data}  selectState={selectState} checked={checked} />
            }
            {
                data.type === '5' &&
                <ReceiveScheduleItem groupContactMap={groupContactMap} data={data} selectState={selectState} checked={checked} />
            }
            {
                data.type === '7' &&
                <SendEmailItem groupContactMap={groupContactMap} data={data} selectState={selectState} checked={checked} />
            }
            {
                data.type === '8' &&
                <ReceiveEmailItem groupContactMap={groupContactMap} data={data} selectState={selectState} checked={checked} />
            }
            {
                data.type === '11' &&
                <EmailItem groupContactMap={groupContactMap} data={data} selectState={selectState} checked={checked} />
            }
            {
                data.type === '15' &&
                <EmptyItem groupContactMap={groupContactMap} styles={props.styles} selectState={selectState} checked={checked} />
            }
            {
                data.type === '20' &&
                <ChattingItem groupContactMap={groupContactMap} data={data} styles={props.styles} selectState={selectState} checked={checked} />
            }
            {
                data.type === '40' &&
                <CChatBotTitle groupContactMap={groupContactMap} selectState={selectState} checked={checked} />
            }
        </TouchableOpacity>
    );
};

export default memo(CChatItem);
