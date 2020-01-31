import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Game from './pages/Game';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/game" component={ Game } />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
