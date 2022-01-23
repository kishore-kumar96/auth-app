import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './containers/Dashboard'
import Login from './containers/Auth/Login'
import Signup from './containers/Auth/Singup'
import { getLocalStorage } from './utils'
import { localKeyName } from './constants';

export const getAuthenticated = () => {
    const { access_token = '' } = getLocalStorage(localKeyName) || {}
    if (access_token) return true
    else return false
}

//Public routes
function PublicRoute(props) {
    const { component: Component, restricted = false, ...rest } = props
    //Auth and restricted check
    const render = props => {
        if (getAuthenticated()) {
            return <Redirect to="/" />
        }
        return <Component {...props} />
    }
    return <Route {...rest} render={render} />
}

//Private routes
function PrivateRoute(props) {
    const { component: Component, ...rest } = props;
    //Auth check
    const render = props => {
        if (!getAuthenticated()) {
            return <Redirect to="/login" />
        }
        return <Component {...props} />
    }
    return <Route {...rest} render={render} />
}

export default function Routes() {
    const data = getLocalStorage(localKeyName)
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact component={Dashboard} />
                <PublicRoute path="/login" exact component={Login} />
                <PublicRoute path="/signup" exact component={Signup} />
                <Redirect from='*' to='/' />
            </Switch>
        </Router>
    )
}