import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import * as Reducers from './reducers'

const persistedReducers = persistReducer(
    {
        key: 'root',
        storage,
        blacklist: ['calendar'],
    },
    combineReducers(Reducers) as any,
)

const state = createStore(
    persistedReducers,
    composeWithDevTools(applyMiddleware(thunk)),
)

const persistor = persistStore(state)

export { state, persistor }
