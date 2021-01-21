import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history'
import {shipmentsReducer} from '../reducers/shipments';

export const browserHistory = createBrowserHistory();

const rootReducer = combineReducers({
    shipments : shipmentsReducer,
    router: connectRouter(browserHistory)
})

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer : rootReducer,
    middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(routerMiddleware(browserHistory)))
})

export default store;