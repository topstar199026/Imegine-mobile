import React, { useEffect, useState } from 'react';
import {View, StyleSheet, StatusBar} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import {colors, fonts} from 'src/assets/themes';

import CTabSelection from 'src/components/planner/CTabSelection';
import CDaySchedule from 'src/components/planner/CDaySchedule';
import CMapWithModal from 'src/components/modal/CMapWithModal';
import MainLayout from 'src/layouts';
import CPlusButton from 'src/components/CPlusButton';
import { _center, _centerH, _centerV, _flexCol, _style } from 'src/modules/Style';
import { PlannerActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import moment from 'moment';

var styles = StyleSheet.create({
});

const Todo = () => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);

    const navigation = useNavigation();
    const [mapWithVisible, setMapWithVisible] = useState(false);

    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);

        loadPlanner();
    }, [])

    const loadPlanner = () => {
        let startDate = moment()
            .startOf('day')
            .format();

        let endDate = moment()
            .startOf('day')
            .format();

        var data = {
            startDate: startDate,
            endDate: endDate,
        };

        PlannerActions.plannerGet(rsa, data, res => {
            if(res && res.status === true) {
                var data = res.data;
                setEventList(data);
            }else if(res && res.status === false && res.error) {
                Utils.toast(1, res.error);
            }
        });
    }

    const toggleMapWithModal = () => {
        setMapWithVisible(!mapWithVisible);
    }

    const closeMapWithModal = (type) => {
        toggleMapWithModal();
        switch (type) {
            case '0':
                break;
            case '1':
                break;
            case '2':
                break;
            default:
                break;
        }
    }

    const onPress =(item) => {
        navigation.navigate('SendMessage');
    } 

    const onNewPlanner = () => {
        navigation.navigate('PlannerPage', {
            screen: 'NewPlanner'
        });
    }
    
    const switchHome =(action) => {
        navigation.navigate(action);
    } 

    return (
        <MainLayout controlBarPosition={controlBarPosition}
            topBarId={'planner'}
            active={'ToDo'}
            switchHome={(action) => switchHome(action)}>        
            <View
                style={_style([
                    {
                        height: '100%',
                        paddingTop: 70,
                        paddingBottom: controlBarPosition !== 'bottom' ? 10 : 70,
                        paddingLeft: 10,
                        paddingRight: 10,
                    },
                    _flexCol,
                    _centerV,
                ])}>    
                <View
                    style={{
                        width: '98%',
                    }}>
                    <CTabSelection active={'today'} navigation={navigation} />
                </View>
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                    }}>
                    <CDaySchedule eventList={eventList} toggleMapWithModal={() => toggleMapWithModal()}/>
                </View>
                <CPlusButton onPress={() => {onNewPlanner()}}/>
                <CMapWithModal 
                    visible={mapWithVisible} 
                    handleModalClose={(type) => closeMapWithModal(type)}    
                />
            </View>      
        </MainLayout>
    )
}

export default Todo