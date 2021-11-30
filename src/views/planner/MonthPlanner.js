import React, { useEffect, useState } from 'react';
import {View, StyleSheet, StatusBar} from "react-native" ;
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import {colors} from 'src/assets/themes';

import CBottomBar from 'src/components/bar/CBottomBar';
import CTopPlannerBar from 'src/components/bar/CTopPlannerBar';
import CPlusButton from 'src/components/CPlusButton';
import CTabSelection from 'src/components/planner/CTabSelection';
import CMonthSchedule from 'src/components/planner/CMonthSchedule';
import MainLayout from 'src/layouts';
import { _centerV, _flexCol, _style } from 'src/modules/Style';
import moment from 'moment';

var styles = StyleSheet.create({
});

const MonthPlanner = () => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    

    const navigation = useNavigation();
    const [scrollEvent, setScrollEvent] = useState(null);
    
    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, []);

    const onPress =(item) => {
        navigation.navigate('SendMessage');
    } 
    
    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    const onNewPlanner = () => {
        navigation.navigate('PlannerPage', {
            screen: 'NewPlanner'
        });
    }

    const handleScroll =() => {
        setScrollEvent(moment().format());
    }
    
    return (
        <MainLayout 
            controlBarPosition={controlBarPosition}
            topBarId={'planner'}
            active={'Planner'}
            switchHome={(action) => switchHome(action)}>        
            <View
                style={_style([
                    {
                        height: '100%',
                        paddingTop: 70,
                        paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                        paddingLeft: 0,
                        paddingRight: 0,
                    },
                    _flexCol,
                    _centerV,
                ])}>  
                <View
                    style={{
                        width: '98%',
                    }}>
                    <CTabSelection active={'month'} navigation={navigation} />
                </View>
                <View
                    style={_style([
                        {
                            flex: 1,
                            width: '100%',
                            paddingBottom: 0,
                        }
                    ])}>
                    <CMonthSchedule toggleMapWithModal={() => {}} handleScroll={() => handleScroll()} />
                </View>
                <CPlusButton scrollEvent={scrollEvent} onPress={() => {onNewPlanner()}}/>
            </View>      
        </MainLayout>
    )
}

export default MonthPlanner