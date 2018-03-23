import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Clock extends Component {
    constructor(props){
        super(props);
        this.state = {date: new Date()};

        this.updateTimeEvent = this.updateTimeEvent.bind(this);
    }

    //lifecycle hook - called when component is rendered to DOM
    componentDidMount(){
        this.timerID = setInterval(
            () => this.updateTime(),
            1000
        );
    }

    //lifecyce hook - used when component is destroyed
    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    updateTime(){
        this.setState({
            date: new Date()
        });
    }

    updateTimeEvent(e){
        e.preventDefault();
        this.updateTime();
    }

    render () {
        return (
            <div>
                <h1> Hello world </h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

class App extends Component {
  render() {
    return (
      <Clock />
    );
  }
}

export default App;
