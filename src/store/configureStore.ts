import {configureStore, Middleware, combineReducers} from '@reduxjs/toolkit';

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

const rootReducer = combineReducers({
    shipments : shipmentsReducer // single slice for now
})

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer : rootReducer,
    middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(logger))
})

export default store;