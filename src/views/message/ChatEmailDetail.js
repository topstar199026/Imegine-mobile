import React, { useEffect, useState } from 'react';
import {View, StatusBar, ScrollView, TouchableOpacity, Image, Text} from "react-native" ;
import {useDispatch, useSelector} from 'react-redux';
import {Dirs, FileSystem} from 'react-native-file-access';

import {colors, fonts, images} from 'src/assets/themes';
import { useNavigation } from '@react-navigation/native';

import MainLayout from 'src/layouts';

import { _center, _flexCol, _flexRow, _font, _size, _style } from 'src/modules/Style';
import CCard from 'src/components/CCard';
import CBottomEmailDetailBar from 'src/components/bar/CBottomEmailDetailBar';


const ChatEmailDetail = (props) => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);
    // @ts-ignore
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const cachePath = `${Dirs.CacheDir}/name.pdf`;
    const [ready, setReady] = useState(true);
    
    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);

        FileSystem
        .fetch('https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf', {path: cachePath})
        .then(res => {
            console.log(cachePath)
            setReady(true);    
        });

    }, []);

    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    const handleTypeActive = (s) => {
    }

    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'emailView'}
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
                        paddingLeft: 3,
                        paddingRight: 3,
                    },
                    _flexCol,
                ])}>
                <ScrollView
                    style={_style([
                        {
                            width: '100%',
                            paddingRight: 5,
                        }
                    ])}>
                    <CCard
                        styles={_style([
                            {
                                padding: 10,
                            }
                        ])}>
                        <View
                            style={_style([
                                {
                                    padding: 10,
                                },
                                _flexRow,
                            ])}>
                            <View>
                                <Image source={images.avatarN} style={_style([_size(36, 36), {borderRadius: 18}])} />
                            </View>
                            <View
                                style={_style([
                                    {
                                        paddingLeft: 10,
                                    }
                                ])}>
                                <Text 
                                    style={_style([
                                        {
                                        },
                                        _font(fonts.$rubikBold, colors.$textSecondary, 16)
                                    ])}>
                                    {'Steve Williams'}
                                </Text>
                                <Text 
                                    style={_style([
                                        {
                                        },
                                        _font(fonts.$rubikRegular, colors.$textSecondary, 13)
                                    ])}>
                                    {'To: Pablo Zehle'}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={_style([
                                {
                                    paddingLeft: 13,
                                    marginTop: 30
                                }
                            ])}>
                            <Text 
                                style={_style([
                                    {
                                    },
                                    _font(fonts.$rubikBold, colors.$iconDark, 22)
                                ])}>
                                {'App Patent Registration'}
                            </Text>
                        </View>

                        <View
                            style={_style([
                                {
                                    paddingLeft: 13,
                                    paddingRight: 13,
                                    marginTop: 15
                                }
                            ])}>
                            <Text 
                                style={_style([
                                    {
                                    },
                                    _font(fonts.$rubikMedium, '#6A6A6A', 13)
                                ])}>
                                {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr. Sed diam nonumy eirmod tempor invidunt ut labore.\n\n\n dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n\n\n Lorem ipsum dolor sit amet, consetetur sadipscing elitr. Sed diam nonumy eirmod tempor invidunt ut labore.'}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ChatEmailPdfView');
                            }}>
                            <View
                                style={_style([
                                    {
                                        marginTop: 20,
                                        borderRadius: 20,
                                        backgroundColor: '#54E5FF',
                                        padding: 12,
                                    }
                                ])}>
                                <View
                                    style={_style([
                                        {
                                        },
                                        _flexRow,
                                        _center,
                                    ])}>
                                    <View
                                        style={_style([
                                            {
                                                width: 32,
                                            },
                                            _center,
                                        ])}>
                                        <Image source={images.size4.message.pdfWhite4x} style={_style([_size(30, 37.5)])} />
                                        <Text 
                                            style={_style([
                                                {
                                                    marginTop: 3,
                                                },
                                                _font(fonts.$rubikRegular, colors.$white, 11)
                                            ])}>
                                            {'PDF'}
                                        </Text>
                                    </View>
                                    <View
                                        style={_style([
                                            {
                                                flex: 1,
                                                justifyContent: 'center',
                                                paddingLeft: 15,
                                            },
                                        ])}>
                                        <Text 
                                            style={_style([
                                                {
                                                },
                                                _font(fonts.$rubikBold, colors.$white, 15)
                                            ])}>
                                            {'App Patent Registration.pdf'}
                                        </Text>
                                        <Text 
                                            style={_style([
                                                {
                                                },
                                                _font(fonts.$rubikRegular, colors.$white, 11)
                                            ])}>
                                            {'208.3 kb'}
                                        </Text>
                                    </View>
                                    <TouchableOpacity>
                                        <View
                                            style={_style([
                                                {
                                                    width: 32,
                                                },
                                                _center
                                            ])}>
                                            <Image source={images.size4.message.eyeWhite4x} style={_style([_size(24, 24)])} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View
                                            style={_style([
                                                {
                                                    width: 32,
                                                },
                                                _center
                                            ])}>
                                            <Image source={images.size4.message.downWhite4x} style={_style([_size(24, 24)])} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* {
                                ready &&
                                <View style={{height: 2800}}>
                                    <Pdf horizontal  style={{}} source={cachePath} />
                                </View>
                            } */}
                        </TouchableOpacity>
                    </CCard>
                </ScrollView>
                <CBottomEmailDetailBar active={'Messages'}/>
            </View>                  
        </MainLayout>
    )
}

export default ChatEmailDetail