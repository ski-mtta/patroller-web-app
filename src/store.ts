import { createStore, combineReducers } from 'redux'
import { main, patroller } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const state = createStore(
    combineReducers({
        main,
        patroller,
    }),
    composeWithDevTools(),
)

export default state
