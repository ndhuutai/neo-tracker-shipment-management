import {configureStore, Middleware, combineReducers} from '@reduxjs/toolkit';
import {connectRouter} from 'connected-react-router';
import {History} from 'history'
import {shipmentsReducer} from '../reducers/shipments';

export const logger: Middleware<
    {} // legacy type parameter added to satisfy interface signature
    > = store => next => action => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)
    console.log('state after dispatch', store.getState())

    return returnValue
}

const rootReducer = (history : History) => combineReducers({
    shipments : shipmentsReducer,
    router: connectRouter(history)
})

export type RootState = ReturnType<typeof rootReducer>;

const store = (history : History) => configureStore({
    reducer : rootReducer(history),
    middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(logger))
})

export default store;