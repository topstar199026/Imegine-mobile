import { View } from 'native-base';
import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { style } from 'styled-system';

var styles = StyleSheet.create({
    selectedTab: {
        opacity: 1,
    },
    tab: {
        fontFamily: fonts.$rubikBold,
        color: colors.$text,
        fontSize: 20,
        opacity: 0.5,
    }
});

const CTabSelection = (props) => {

    const getTitle = (type) => {
        switch (type) {
            case 0:
                if(props.active === 'today') return 'Month';
                else if(props.active === 'week') return 'Today';
                else return 'Week';
            case 1:
                if(props.active === 'today') return 'Today';
                else if(props.active === 'week') return 'Week';
                else return 'Month';
            case 2:
                if(props.active === 'today') return 'Week';
                else if(props.active === 'week') return 'Month';
                else return 'Today';        
        }
    }

    const GoToCalendarView = (type) => {
        switch (type) {
            case 'Today':
                props.navigation.navigate('Main', {screen: 'Planner'});
                break;
            case 'Month':
                props.navigation.navigate('PlannerPage', {screen: 'MonthPlanner'});
                break;
            case 'Week':   
                props.navigation.navigate('PlannerPage', {screen: 'WeekPlanner'});  
                break;
        }
    }

    return (
        <View
            style={{
                paddingTop: 21,
                paddingBottom: 21,
                display: 'flex',
                flexDirection: 'row',
            }}>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => GoToCalendarView(getTitle(0))}>
                    <Text
                        style={[styles.tab]}>
                        {getTitle(0)}
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <TouchableOpacity>
                    <Text
                        style={[styles.tab, styles.selectedTab]}>
                        {getTitle(1)}
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => GoToCalendarView(getTitle(2))}>
                    <Text
                        style={[styles.tab]}>
                        {getTitle(2)}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CTabSelection;
