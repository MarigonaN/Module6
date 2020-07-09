import React from 'react';
import './App.css';
import {Container, Row, Col} from "react-bootstrap"
import HomePage from "./components/HomePage"
import {Router, Switch, Route} from "react-router"
import BackOffice from './components/BackOffice';

class App extends React.Component {
  render() {
    
  return (
 
    <HomePage />
  );
}
}

export default App;