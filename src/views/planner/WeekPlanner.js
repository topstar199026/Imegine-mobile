import React, { useEffect, useState } from 'react';
import {View, StyleSheet, StatusBar} from "react-native" ;
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {colors} from 'src/assets/themes';
import CTabSelection from 'src/components/planner/CTabSelection';
import CWeekSchedule from 'src/components/planner/CWeekSchedule';
import MainLayout from 'src/layouts';
import CPlusButton from 'src/components/CPlusButton';
import { _centerV, _flexCol, _style } from 'src/modules/Style';
import CWeekSliderBar from 'src/components/planner/CWeekSliderBar';
import CPlannerDetailModal from 'src/components/modal/CPlannerDetailModal';
import moment from 'moment';

const WeekPlanner = () => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);

    const navigation = useNavigation();

    const [weekRange, setWeekRange] = useState(1);

    const [plannerDetailModalVisible, setPlannerDetailModalVisible] = useState(false)
    
    const [scrollEvent, setScrollEvent] = useState(null);

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])

    useEffect(() => {
        console.log('weekRange', weekRange)
    }, [weekRange])
    
    const onPress =(item) => {
        navigation.navigate('SendMessage');
    } 
    
    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    const changeWeekRange = (type) => {
        setWeekRange(type*1);
    }

    const toggleModal = (data) => {
        setPlannerDetailModalVisible(!plannerDetailModalVisible)
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
        <MainLayout controlBarPosition={controlBarPosition}
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
                    <CTabSelection active={'week'} navigation={navigation} />
                </View>
                <View
                    style={_style([
                        {
                            flex: 1,
                            width: '100%',
                            paddingBottom: weekRange === 2 ? 5 : 0,
                        }
                    ])}>
                    <CWeekSchedule weekRange={weekRange} index={0} toggleMapWithModal={() => {}} toggleModal={(data) => toggleModal(data)} handleScroll={() => handleScroll()} />
                </View>
                {
                    weekRange === 2 &&
                    <View
                        style={_style([
                            {
                                flex: 1,
                                width: '100%',
                                paddingTop: 5,
                            }
                        ])}>
                        <CWeekSchedule weekRange={weekRange} index={1} toggleMapWithModal={() => {}} toggleModal={(data) => toggleModal(data)} handleScroll={() => handleScroll()} />
                    </View>
                }
                <CPlusButton scrollEvent={scrollEvent} onPress={() => {onNewPlanner()}}/>
                <CWeekSliderBar scrollEvent={scrollEvent} changeWeekRange={(type) => changeWeekRange(type)}  />
            </View>   
            <CPlannerDetailModal 
                visible={plannerDetailModalVisible}
                handleModalClose={() => toggleModal()}
            />   
        </MainLayout>
    )
}

export default WeekPlanner