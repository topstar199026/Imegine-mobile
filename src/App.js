import React, { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import UserContextProvider from 'src/contexts/UserContext';
import SocketContextProvider from 'src/contexts/SocketContext';

import AppContainer from 'src/routes';
import {store, persistor} from 'src/store';

const App = () => {

    useEffect(() => {
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NativeBaseProvider>
                    <UserContextProvider
                        // @ts-ignore
                        UserContextProvider>
                        <SocketContextProvider>
                            <AppContainer />
                        </SocketContextProvider>
                    </UserContextProvider>
                </NativeBaseProvider>
            </PersistGate>
        </Provider>
    )

}

export default App;