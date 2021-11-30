import React, { useContext, useEffect, useState } from 'react';
import {View, StatusBar} from "react-native" ;
import {useSelector} from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import {colors} from 'src/assets/themes';

import CTabSelection from 'src/components/planner/CTabSelection';
import CDaySchedule from 'src/components/planner/CDaySchedule';
import CMapWithModal from 'src/components/modal/CMapWithModal';
import MainLayout from 'src/layouts';
import CPlusButton from 'src/components/CPlusButton';
import { _center, _centerH, _centerV, _flexCol, _style } from 'src/modules/Style';
import { PlannerActions } from 'src/actions';
import * as Utils from 'src/modules/Toast';
import moment from 'moment';
import {SocketContext} from 'src/contexts/SocketContext';

const Planner = () => {
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);
    // @ts-ignore
    const rsa = useSelector((state) => state.system.rsa);

    const socket = useContext(SocketContext);
   
    const {
        // @ts-ignore
        newPlanner, 
    } = socket;

    const navigation = useNavigation();
    const [mapWithVisible, setMapWithVisible] = useState(false);

    const [eventList, setEventList] = useState([]);
    const [scrollEvent, setScrollEvent] = useState(null);

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);

        loadPlanner();
    }, [])

    useEffect(() => {
        if(newPlanner !== null) {
            loadPlanner();
        }
    }, [newPlanner])

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
                    <CDaySchedule eventList={eventList} toggleMapWithModal={() => toggleMapWithModal()} handleScroll={() => handleScroll()} />
                </View>
                <CPlusButton scrollEvent={scrollEvent}  onPress={() => {onNewPlanner()}}/>
                <CMapWithModal 
                    visible={mapWithVisible} 
                    handleModalClose={(type) => closeMapWithModal(type)}    
                />
            </View>      
        </MainLayout>
    )
}

export default Planner