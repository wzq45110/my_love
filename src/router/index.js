import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import home from "@/pages/home/home";
import Home from '../components/home';
import Login from '../components/peoples/login';

const BasicRoute = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </HashRouter>
    )
}
export default BasicRoute