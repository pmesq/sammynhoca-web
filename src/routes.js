import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Game from './pages/Game';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
				<Route path="/" exact component={ Home } />
				<Route path="/login" component={ Login } />
                <Route path="/game" component={ Game } />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
