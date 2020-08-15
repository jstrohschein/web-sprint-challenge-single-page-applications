import React from "react";
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import HomePage from './components/HomePage';
import OrderForm from './components/OrderForm';
import Confirmation from './components/Confirmation';
import Help from './components/Help'

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/help' component={Help} />
        <Route path='/pizza' component={OrderForm} />
        <Route path='/confirmation' component={Confirmation} />
      </Switch>
    </div>
  );
};
export default App;
