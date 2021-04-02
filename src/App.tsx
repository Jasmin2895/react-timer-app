import React from 'react';
import {
    Redirect,
    Route,
    Switch,
    BrowserRouter,
} from 'react-router-dom';
import logo from './logo.svg';
import { routes } from './constants/routes';
import Config from './components/Config';
import Main from './components/Main';
import ErrorPage from './components/Main';
import './App1.scss';
import './sass/index.scss';

const { CONFIG } = routes;
function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Config} />
                <Route path={CONFIG} component={Main} />
                <Route path="*" component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
