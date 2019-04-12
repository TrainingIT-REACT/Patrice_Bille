import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { history } from "../_helpers";
import PrivateRoute from "../Auth/PrivateRoute";
import LoginPage from "../Auth/Login/LoginPage";
import {notifyActions} from "../_actions/notify.actions";
import {RestrictedArea} from "../PrivatePage";

const App = ({ dispatch }) => {
    history.listen(() => {
        dispatch(notifyActions.clear());
    });

    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <PrivateRoute path="/" component={RestrictedArea} />
            </Switch>
        </Router>
    );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(App);