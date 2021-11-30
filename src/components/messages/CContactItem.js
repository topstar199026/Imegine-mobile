import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;

import {colors, images, fonts} from 'src/assets/themes';
import { UpperCaseString } from 'src/modules/FormatUtil';
import { _font, _style } from 'src/modules/Style';

var styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 32,
        paddingLeft: 15,
        alignItems: 'center',
        backgroundColor: colors.$white,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5,

        shadowColor: colors.$secondaryBlue,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 7,
        zIndex: 1,
    },
    itemContainer: {
        width: '100%',
        height: 32,
        paddingLeft: 15,
        alignItems: 'center',
        backgroundColor: colors.$transparent,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: 'rgba(112, 112, 112, 0.1)',
    },
    view1: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view2: {
        flex: 1,
        paddingLeft: 15,
    },
    text1: {
        fontFamily: fonts.$rubikRegular,
        color: colors.$secondaryBlue,
        fontSize: 17,
    },
});

const CContactItem = (props) => {
    const item = props.item.item;

    console.log(item)
    function imagePath (item) {
        return {
            uri: 
                item.item.contactImage ?
                'https://imegine-app.fra1.digitaloceanspaces.com/' + item.item.contactImage
                :
                'https://imegine-app.fra1.digitaloceanspaces.com/avatar/no-user-image'
        };
    };

    const [avatar, setAvatar] = useState(null);
    
    useEffect(() => {
        if(item.type === 'user') {
            item.item.avatar && setAvatar('https://imegine-app.fra1.digitaloceanspaces.com/' + item.item.avatar);
        } else if (item.type !== 'group') {
            item.item['contact_user.avatar'] && setAvatar('https://imegine-app.fra1.digitaloceanspaces.com/' + item.item['contact_user.avatar']);
            // setAvatar('https://imegine-app.fra1.digitaloceanspaces.com/avatar/no-user-image')
        }
    }, [item])

    // console.log('contact user data', item)

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            {
                item.type === 'group' ? 
                <View style={[styles.container, {
                    }, props.style]}>
                    <View style={{

                        }}>
                        <Text 
                            style={_style([
                                {},
                                _font(fonts.$rubikMedium, colors.$secondaryBlue, 17)
                            ])}>
                            {item.title}
                        </Text>
                    </View>
                </View>
                :
                <TouchableOpacity 
                    onPress={() => props.onPress()} 
                    onLongPress={() => props.onLongPress()}>
                    {
                        item.type === 'user' ? 
                        <View style={[styles.itemContainer, props.style]}>
                            <View style={[styles.view1]}>
                                <Image 
                                    source={{
                                        uri: avatar,
                                    }}
                                    style={_style([
                                    {width: 24, height: 24, borderRadius: 12, borderColor:'#54E5FF', borderWidth: 0}
                                ])} />
                            </View>
                            <View style={[styles.view2]}>
                                <Text style={[styles.text1]}>
                                    {UpperCaseString(item.item.nickName, 'Sub')}
                                </Text>
                            </View>
                        </View>
                        :
                        <View style={[styles.itemContainer, props.style]}>
                            <View style={[styles.view1]}>
                                <Image 
                                    source={item.item.isGroup ?
                                        {
                                            uri: 'https://imegine-app.fra1.digitaloceanspaces.com/avatar/group-chat',
                                        }
                                        :
                                        {
                                            uri: avatar
                                        }
                                    }
                                    // source={images.avatarN} 
                                    style={_style([
                                    {width: 24, height: 24, borderRadius: 12, borderColor:'#54E5FF', borderWidth: 0}
                                ])} />
                            </View>
                            <View style={[styles.view2]}>
                                <Text style={[styles.text1]}>
                                    {
                                        item.item.nickName ? 
                                        UpperCaseString(item.item.nickName, 'Sub')
                                        :
                                        item.item.contactId ?
                                        UpperCaseString(item.item.nickName, 'Sub')
                                        :
                                        item.item.contactName
                                    }
                                </Text>
                            </View>
                        </View>
                    }
                </TouchableOpacity>
            }
            
        </>
    );
};

export default CContactItem;
