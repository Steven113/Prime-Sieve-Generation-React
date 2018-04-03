import React, { Component } from 'react';

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
                <h2>{this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

export default Clock;
