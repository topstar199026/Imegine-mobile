import { View } from 'native-base';
import React from 'react';
import {Text, Image, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { G, Path, Svg } from 'react-native-svg';
import Pie from 'paths-js/pie';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flexRow, _font, _size, _style } from 'src/modules/Style';
import { TouchableOpacity } from 'react-native-gesture-handler';

var styles = StyleSheet.create({
    titleContainer: {
        width: wp(100),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const percentage =80;
const sqSize =500;
const strokeWidth = 10;
const radius = (sqSize - 20) / 2;
const viewBox = `0 0 ${sqSize} ${sqSize}`;
const dashArray = radius * Math.PI * 2;
const dashOffset = dashArray - dashArray * 80 / 100;

const CWalletProgress = (props) => {

    const percents = props.percents;

    const width = props.width;
    const stokeWidth = 30;
    const stokeProgressWidth = 15;
    const rD = (width / 2) * 0.8;
    
    const backgroundPie = () => {
        const r = rD - stokeWidth / 2;
        return Pie({
            r,
            R: r,
            center: [0, 0],
            data: [1, 0],
            accessor(x) {
                return x;
            }
        });
    }
    
    const ColorCode = () => 
        'rgb(' + (256 - Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (256 - Math.floor(Math.random() * 256)) + ')';
        // 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',256)';
    

    const progressList = () => {
        
        const _array = [];
        const r = rD - stokeProgressWidth / 2 - (stokeWidth - stokeProgressWidth) / 2;
        
        const d = stokeProgressWidth / (2 * 3.141592 * r);
        let sum  = 0;

        for(let i=0; i<percents.length; i++) {
            let _percent = percents[i].percent / 100;
            const _i = i > 0 ? 1 : 0;
            const _arrayValue = {
                i: i,
                l: percents[i].title,
                p: _percent,
                p2: percents[i].percent,
                c: ColorCode(),
                t: 360 * (-percents[0].percent / 2 / 100+ sum + d),
                s: sum,
                pie: Pie({
                    r,
                    R: r,
                    center: [0, 0],
                    data: [_percent - d, 1 - _percent + d],
                    accessor(x) {
                        return x;
                    }
                })
            };
            _array.push(_arrayValue);
            sum += _percent;
        }
        return _array;
    }

    const dataList = progressList();

    const progressPie = () => {
        const r = rD - stokeProgressWidth / 2 - (stokeWidth - stokeProgressWidth) / 2;
        return Pie({
            r,
            R: r,
            center: [0, 0],
            data: [0.25, 0.75],
            accessor(x) {
                return x;
            }
        });
    }
    

    return (
        <View style={[styles.titleContainer]}>
            <View
                style={_style([
                    {
                        //height: width,
                        width: width,
                        paddingBottom: 15,
                    },
                ])}>
                <View
                    style={_style([
                        {
                            position: 'absolute',
                        },
                        _size(width, width),
                        _center,
                    ])}>
                    <View
                        style={_style([
                            {
                            },
                            _flexRow,
                            _center,
                        ])}>
                        <TouchableOpacity>
                            <View
                                style={_style([
                                    {
                                        paddingRight: 15
                                    }
                                ])}>
                                <Image style={_size(24, 24)} source={images.size4.wallet.prevGray4x_2} />
                            </View>

                        </TouchableOpacity>
                        
                        <View
                            style={_style([
                                _center,
                            ])}>
                            <Text
                                style={_style([
                                    _font(fonts.$rubikRegular, colors.$secondaryBlue, 44)
                                ])}>
                                {'67.45%'}
                            </Text>
                            <Text
                                style={_style([
                                    _font(fonts.$rubikRegular, colors.$secondaryBlue, 15)
                                ])}>
                                {'LAST 7 DAYS'}
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <View
                                style={_style([
                                    {
                                        paddingRight: 15
                                    }
                                ])}>
                                <Image style={_size(24, 24)} source={images.size4.wallet.nextGray4x_2} />
                            </View>

                        </TouchableOpacity>
                    </View>
                </View>
                <Svg
                    width={width}
                    height={width}
                    >
                     <G
                        x={width/2}
                        y={width/2}
                        >
                    </G>
                    <G
                        x={width/2}
                        y={width/2}
                        >
                        <G>                            
                            <Path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={backgroundPie().curves[0].sector.path.print()}
                                strokeWidth={stokeWidth}
                                stroke={
                                    '#F0F0F0'
                                }
                            />
                            {
                                dataList.map((_p, i) => {
                                    return <Path
                                        key={i}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d={_p.pie.curves[0].sector.path.print()}
                                        strokeWidth={stokeProgressWidth}
                                        stroke={
                                            _p.c
                                        }
                                        transform={'rotate('+ _p.t +')'}
                                    />
                                })
                            }
                        </G>
                    </G>
                </Svg>
                <View
                    style={_style([
                        _center,
                    ])}>
                    {
                        dataList.map((data, i) => 
                            <View
                                key={i}
                                style={_style([
                                    {
                                        width: '50%',
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                    },
                                    _flexRow,
                                    _center,
                                ])}>
                                <View
                                    style={_style([
                                        {
                                            width: 30,
                                        }
                                    ])}>
                                    <View style={_style([
                                        {
                                            borderRadius: 5.5,
                                            backgroundColor: data.c
                                        },
                                        _size(11, 11),
                                    ])} />
                                </View>
                                <View
                                    style={_style([
                                        {
                                            flex: 1,
                                        }
                                    ])}>
                                    <Text
                                        style={_style([
                                            _font(fonts.$rubikBold, colors.$secondaryBlue, 15)
                                        ])}>
                                        {data.l}
                                    </Text>
                                </View>
                                <View
                                    style={_style([
                                        {
                                            width: 70,
                                            alignItems: 'center',
                                        }
                                    ])}>
                                    <Text
                                        style={_style([
                                            _font(fonts.$rubikRegular, colors.$secondaryBlue, 15)
                                        ])}>
                                        {data.p2 + '%'}
                                    </Text>
                                </View>
                            </View>                        
                        )
                    }
                    
                </View>
            </View>
        </View>
    );
};

export default CWalletProgress;
