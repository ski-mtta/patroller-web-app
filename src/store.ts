import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk";
import * as Reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const state = createStore(combineReducers(Reducers), composeWithDevTools(applyMiddleware(thunk)))

export default state
