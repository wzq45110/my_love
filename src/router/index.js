import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from "../router/PrivateRoute"
// import { routerConfig } from './router.config'
// import home from "../pages/home/home";
import Home from '../pages/home';
import Login from '../pages/login';
import Regist from '../pages/Regist';
import Dating from '../pages/Dating';
import Inbox from '../pages/Inbox';
import Meetyou from '../pages/Meetyou';
import inSearch from '../pages/inSearch';
import Mycity from '../pages/Mycity';
import Lastsignup from '../pages/Lastsignup';
import Witheme from '../pages/Witheme';
import Online from '../pages/Online';
import Myresume from '../pages/myResume';
import onSearch from '../pages/onSearch';
import meLike from '../pages/melike';
import onCity from '../pages/oncity';
import perosenInfo from '../pages/peroseninfo';
// import text from '../components/heart/heart'
const BasicRoute = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/regist" component={Regist} />
                <Route exact path="/dating" component={Dating} />
                <PrivateRoute exact path="/inbox" component={Inbox} />
                <PrivateRoute exact path="/meetyou" component={Meetyou} />
                <PrivateRoute exact path="/insearch" component={inSearch} />
                <PrivateRoute exact path="/mycity" component={Mycity} />
                <PrivateRoute exact path="/lastsignup" component={Lastsignup} />
                <PrivateRoute exact path="/witheme" component={Witheme} />
                <PrivateRoute exact path="/online" component={Online} />
                <PrivateRoute exact path="/myresume:key" component={Myresume} />
                <PrivateRoute exact path="/search" component={onSearch} />
                <PrivateRoute exact path="/like" component={meLike} />
                <PrivateRoute exact path="/city" component={onCity} />
                <PrivateRoute exact path="/personinfo" component={perosenInfo} />
                {/* <PrivateRoute exact path="/text" component={text} /> */}
            </Switch>
        </HashRouter>
    )
}
export default BasicRoute