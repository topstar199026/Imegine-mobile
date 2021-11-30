import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;

import {colors, fonts, images} from 'src/assets/themes';
import CCard from '../CCard';

var styles = StyleSheet.create({
});

const CBusinessProfileMap = (props) => {
    return (
        <CCard
            styles={{
                backgroundColor: colors.$white,
                paddingTop: 5,

            }}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <View>
                    <Image source={images.clockMessage} />
                </View>
                <View>
                    <Text
                        style={{
                            paddingLeft: 15,
                            fontFamily: fonts.$rubikRegular,
                            color: colors.$secondaryBlue,
                            fontSize: 13,
                        }}>
                        {'Todays 07:00 - 23:00'}
                    </Text>
                </View>
                <View
                    style={{
                        paddingLeft: 5,
                    }}>
                    <Image source={images.downWallet} />
                </View>
            </View>
            <View
                style={{
                    paddingTop: 10,
                }}>
                <Image style={{width: '100%',}} source={images.mapView} />
            </View>
            <View
                style={{
                    paddingTop: 15,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <View>
                    <Image source={images.mapBlueMessage} />
                </View>
                <View>
                    <Text
                        style={{
                            paddingLeft: 15,
                            paddingRight: 25,
                            fontFamily: fonts.$rubikMedium,
                            color: colors.$secondaryBlue,
                            fontSize: 13,
                        }}>
                        {'379 West Broadway, 2nd Floor, New York, NY 10012'}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    paddingTop: 15,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <View>
                    <Text
                        style={{
                            paddingLeft: 33,
                            paddingRight: 25,
                            paddingBottom: 15,
                            fontFamily: fonts.$rubikRegular,
                            color: colors.$secondaryBlue,
                            fontSize: 13,
                        }}>
                        {'Show more information'}
                    </Text>
                </View>
            </View>
        </CCard>

    );
};

export default CBusinessProfileMap;
