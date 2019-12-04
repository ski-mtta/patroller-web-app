import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { state, persistor } from './store'
import './index.css'
import * as serviceWorker from './serviceWorker'

import Layout from './components/Layout'
import Login from './components/Login'
import Join from './components/Join'
import Patroller from './components/Patroller'

const App = () => (
    <Layout
        Router={() => (
            <Router>
                <Route path={'/'} exact component={Login} />
                <Route path={'/login'} exact component={Login} />
                <Route path={'/join'} exact component={Join} />
                <Route path={'/home'} exact component={Patroller} />
            </Router>
        )}
    />
)

ReactDOM.render(
    <Provider store={state}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
