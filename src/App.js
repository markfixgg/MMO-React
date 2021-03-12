import React from "react";
import {BrowserRouter as Router, Switch, Route, Link, Redirect, useLocation} from "react-router-dom";
import Auth from './components/Auth';
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import HomePage from './components/HomePage'
import PrivateRoute from './components/PrivateRoute'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "./components/styles/Login.css";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
            <Auth child={<LoginComponent/>} forgot={"block"}/>
        </Route>
        <Route path="/signup">
            <Auth child={<RegisterComponent/>} forgot={"none"}/>
        </Route>
        <Route exact path="/">
          <PrivateRoute component={<HomePage/>}/>
        </Route>
        <Route exact path="/profile">
          <PrivateRoute component={<h1>Тут будет профиль</h1>}/>
        </Route>
      </Switch>
    </Router>
  );
}


export default App;
