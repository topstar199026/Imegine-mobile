import { combineReducers } from 'redux';
import SystemReducer from './system';
import AuthReducer from './auth';
import ApplicationReducer from './application';
import SocketReducer from './socket';
import WalletReducer from './wallet';

export const rootReducer = combineReducers({
    system: SystemReducer,
    auth: AuthReducer,
    application: ApplicationReducer,
    socket: SocketReducer,
    wallet: WalletReducer,
});
