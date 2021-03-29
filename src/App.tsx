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
import './App.css';

const { CONFIG } = routes;
function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path={CONFIG} component={Config} />
                <Route path="*" component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
