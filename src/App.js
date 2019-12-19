import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Data, Edit} from './Form.js';
import Players from './Players';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <Router>
      <Navbar bg="secondary" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/add">Add</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Players}></Route>
        <Route exact path="/add" component={Data}></Route>
        <Route exact path="/edit/:id" component={Edit}></Route> 
      </Switch>
    </Router>
  );
}

export default App;
