import React, { Component } from 'react';
import './App.css';



import {PrimeGenerator} from './PrimeGenerator.js';



class App extends Component {

    constructor(props){
        super(props);

        this.end = 55
    }



  render() {

    return (
        <div>

            <PrimeGenerator rowWidth={15} maxInt={this.end}/>
        </div>
    );
  }
}

export default App;
