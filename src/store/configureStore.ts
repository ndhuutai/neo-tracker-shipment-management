import {configureStore, Middleware} from '@reduxjs/toolkit';

import {shipmentsReducer} from '../reducers/shipments';

export const logger: Middleware<
    {} // legacy type parameter added to satisfy interface signature
    > = store => next => action => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log('state after dispatch', store.getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
}

let preloadedState

const store = configureStore({
    reducer : shipmentsReducer, // single slice for now
    middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(logger))
})

export default store;