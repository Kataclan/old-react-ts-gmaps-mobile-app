//#region [ Import React ]
import * as React from 'react';
import {Component} from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';


//#region [ Import Components ]
import HomePage from './views/HomePage';
//#endregion

var router = (
     <Router  history={hashHistory}>
      <Route path="/" component={HomePage}>
      </Route>
    </Router>
);


export let AppRouter = router;

