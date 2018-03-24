import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Clock from './Clock.js';
import IntMarker from './IntMarker.js';
import {TableRenderer} from './TableGenerator.js';

class PrimeUserOptions extends Component {

    constructor(props){
        super(props);


        this.increaseTimerInterval = props.increaseTimerInterval;
        this.changeTimeInterval = props.changeTimeInterval;
        this.decreaseTimerInterval = props.decreaseTimerInterval;
        this.resetTimerInterval = props.resetTimerInterval;
        this.getTimerInterval = props.getTimerInterval;
    }



    render(){

        return (
            <div className="optionsSection">
                <div className="primeGenerationSpeedTextBoxStyle">
                    {this.getTimerInterval()}
                </div>
                <button type="button" className="increasePrimeGeneratorSpeedButtonStyle" onClick={this.increaseTimerInterval}>Increase generator speed</button>
                <button type="button" className="decreasePrimeGeneratorSpeedButtonStyle" onClick={this.decreaseTimerInterval}>Decrease generator speed</button>
                <button type="button" className="resetPrimeGeneratorSpeedButtonStyle" onClick={this.resetTimerInterval}>Reset generator speed</button>
            </div>
        );
    }
}

class PrimeGenerator extends Component {
    constructor(props){
        super(props);

        this.state = {
            rowWidth : props.rowWidth,
            valueExtractionFunction : props.valueExtractionFunction,
            classExtractionFunction : props.classExtractionFunction,
            maxInt : props.maxInt,
            dataArray : [],
            primes : [],

            timerInterval : 500,
            defaultTimerInterval : 500,
            minTimerInterval : 100,
            timeIntervalDelta : 100
        };

        this.increaseTimerInterval = this.increaseTimerInterval.bind(this);
        this.changeTimeInterval = this.changeTimeInterval.bind(this);
        this.decreaseTimerInterval = this.decreaseTimerInterval.bind(this);
        this.resetTimerInterval = this.resetTimerInterval.bind(this);
        this.getTimerInterval = this.getTimerInterval.bind(this);

        var maxInt = this.state.maxInt;

        var dataArray = this.state.dataArray;

        for (let i = 2; i<=maxInt; ++i){
            dataArray.push(new IntMarker(i));
        }

        this.updatePrimeTable = this.updatePrimeTable.bind(this);

    }

    changeTimeInterval(delta){
        var timerInterval = this.state.timerInterval;
        timerInterval += delta;
        if (timerInterval < this.state.minTimerInterval){
            timerInterval = this.state.minTimerInterval;
        }

        this.setPrimeTimer(timerInterval);

        this.setState({"timerInterval" : timerInterval});
    }

    increaseTimerInterval(e){
        e.preventDefault();
        this.changeTimeInterval(this.state.timeIntervalDelta);
    }

    decreaseTimerInterval(e){
        e.preventDefault();
        this.changeTimeInterval(-this.state.timeIntervalDelta);
    }

    resetTimerInterval(e){
        e.preventDefault();
        this.setPrimeTimer(this.state.defaultTimerInterval);
        this.setState({timerInterval : this.state.defaultTimerInterval});
    }

    getTimerInterval(){
        return this.state.timerInterval
    }

    updatePrimeTable(){
        var dataArrayUpdated = this.state.dataArray.slice(0,this.state.dataArray.length);
        var primesUpdated = this.state.primes.slice(0,this.state.primes.length);

        for (let n = 0; n<dataArrayUpdated.length; ++n){
            if (dataArrayUpdated[n].isPrime === "Unprocessed-Value"){
                dataArrayUpdated[n].isPrime = "Is-Prime";

                for (let k = n + dataArrayUpdated[n].value; k < dataArrayUpdated.length; k+=dataArrayUpdated[n].value){
                    dataArrayUpdated[k].isPrime = "Not-Prime";
                }

                primesUpdated.push(dataArrayUpdated[n]);

                this.setState({
                    dataArray : dataArrayUpdated,
                    primes : primesUpdated
                });

                return;
            }
        }
    }

    setPrimeTimer(interval) {
        if (this.primeGeneratorInterval){
            clearInterval(this.primeGeneratorInterval);
        }
        this.primeGeneratorInterval = setInterval (this.updatePrimeTable, interval);
    }

    componentDidMount() {
        this.setPrimeTimer(this.state.timerInterval);
    }

    componentWillUnmount() {
        clearInterval(this.primeGeneratorInterval);
    }

    render(){
        var dataArray = this.state.dataArray;
        var rowWidth = this.state.rowWidth;
        var valueExtractionFunction = this.state.valueExtractionFunction;
        var classExtractionFunction = this.state.classExtractionFunction;
        var primes = this.state.primes;

        var visualizationTableName = "Primes calculation visualization";
        var primeTableName = "Primes found";

        //console.log(`primes ${JSON.stringify(primes)} ${primes.length}`);

        return (
            <div>
                <h1> Prime Generator</h1>
                <Clock/>
                <div className="user-options">

                <PrimeUserOptions increaseTimerInterval={this.increaseTimerInterval} decreaseTimerInterval={this.decreaseTimerInterval} changeTimeInterval={this.changeTimeInterval} resetTimerInterval={this.resetTimerInterval} getTimerInterval={this.getTimerInterval}/>
                 </div>
                <TableRenderer dataArray={dataArray} tableName={visualizationTableName} rowWidth={rowWidth} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction}/>
                <h2> Primes found </h2>
                <TableRenderer dataArray={primes} rowWidth={rowWidth} tableName={primeTableName} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction}/>
            </div>
        );
    }

}

class App extends Component {

    constructor(props){
        super(props);

        this.end = 1000;
    }



  render() {
      var valueExtractionFunction = function(item){
          return item.value;
      }

      var classExtractionFunction = function(item){
          return item.isPrime;
      }
    return (
        <div>

            <PrimeGenerator rowWidth={10} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction} maxInt={this.end}/>
        </div>
    );
  }
}

export default App;
