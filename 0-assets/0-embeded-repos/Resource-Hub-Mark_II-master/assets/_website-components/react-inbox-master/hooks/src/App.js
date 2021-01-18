import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Inbox from "./Inbox/Inbox"

class App extends Component {
  render() {
    return (
      <div className="App">
        <section>
          <Inbox />
        </section> 
      </div>
    );
  }
}

export default App;
