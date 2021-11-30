import React, { useEffect } from 'react';
import {View, StatusBar} from 'react-native' ;
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {colors} from 'src/assets/themes';

import CMainTopBar from 'src/components/bar/CMainTopBar';
import CMainBottomBar from 'src/components/bar/CMainBottomBar';
import CMainLeftBar from 'src/components/bar/CMainLeftBar';
import { _flexCol, _flexRow, _font, _size, _style } from 'src/modules/Style';
import { SystemActions } from 'src/actions';
import CLoadingView from 'src/components/state/CLoadingView';



const MainLayout = (props) => {    
    
    // @ts-ignore
    const controlBarPosition = useSelector((state) => state.system.controlBarPosition);

    const topBarId = props.topBarId || '';
    
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        StatusBar.setBackgroundColor(colors.$topBar, true);
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setTranslucent(true);
    }, [])
    
    const switchHome =(action) => {
        if(action === 'Me') {
            dispatch(SystemActions.onSetControlBarPosition(controlBarPosition === 'left' ? 'bottom' : controlBarPosition === 'bottom' ? 'right' : 'left'));
        }
        navigation.navigate(action);
    }

    const renderControlBar = (backFlag = false, bottomFlag = false) => {
        return (
            <>
                {
                    controlBarPosition === 'bottom' && bottomFlag === false &&
                    <CMainBottomBar active={props.active} switchHome={(action) => switchHome(action)} /> 
                }
                {
                    (controlBarPosition === 'left' || controlBarPosition === 'right')&& 
                    <CMainLeftBar back={backFlag} active={props.active} switchHome={(action) => switchHome(action)} /> 
                }
            </>
        );
    }

    return (
        <SafeAreaView>
            <StatusBar />
            <View
                style={_style([{
                    },
                    _size('100%', '100%'),
                    _flexRow,
                ])}>
                <View
                    style={{
                        width: controlBarPosition === 'left' ? 60 : 0,
                    }}>
                </View>             
                <View
                    style={[{
                        flex: 1,
                        height: '100%',
                    }]}>                    
                    <CMainTopBar 
                        topBarId={topBarId}  
                        active={props.active} 
                        handleTypeActive={props.handleTypeActive} 
                        activeType={props.activeType} 
                        data={props.data}
                    /> 
                    {props.children}                    
                </View>    
                <View
                    style={{
                        width: controlBarPosition === 'right' ? 60 : 0,
                    }}>
                </View>  
                {renderControlBar(props.backFlag, props.bottomFlag)}       
            </View>
            <CLoadingView />
        </SafeAreaView>
    )
}

export default MainLayout