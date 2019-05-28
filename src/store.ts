import { createStore, combineReducers } from 'redux'
import * as Reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const state = createStore(
    combineReducers(Reducers),
    composeWithDevTools(),
)

export default state
