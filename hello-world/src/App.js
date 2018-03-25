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


        this.increasePrimeTableLength = props.increasePrimeTableLength;
        this.decreasePrimeTableLength = props.decreasePrimeTableLength;
        this.resetPrimeGenerator = props.resetPrimeGenerator;
        this.setPrimeTableLength = props.setPrimeTableLength;

        this.onPrimeTableLengthChanged = this.onPrimeTableLengthChanged.bind(this);

        this.state = {
            primeTableLength : props.primeTableLength,
            timerInterval : props.timerInterval
        };
    }

    onPrimeTableLengthChanged(e){
        e.preventDefault();

        console.log(document.getElementById('numPrimes'));
        var numPrimes = document.getElementById('numPrimes').value;
        this.setPrimeTableLength(numPrimes);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.primeTableLength !== this.state.primeTableLength){
            this.setState({
                primeTableLength : nextProps.primeTableLength
            });
        }

        this.setState({
            timerInterval : nextProps.timerInterval
        });
    }

    render(){

        return (
            <div className="optionsSection">
                <div className="primeGenerationSpeedTextBox">
                    {this.state.timerInterval/1000}s
                </div>
                {/*Controlling generator speed*/}
                <button type="button" className="increasePrimeGeneratorSpeedButton" onClick={this.increaseTimerInterval}>Increase generator speed</button>
                <button type="button" className="decreasePrimeGeneratorSpeedButton" onClick={this.decreaseTimerInterval}>Decrease generator speed</button>
                <button type="button" className="resetPrimeGeneratorSpeedButton" onClick={this.resetTimerInterval}>Reset generator speed</button>

                <div className="primeGenerationLengthTextBox">
                    {this.state.primeTableLength}
                </div>

                {/*Controlling generator size*/}
                <button type="button" className="increasePrimeGeneratorLengthButton" onClick={this.increasePrimeTableLength}>Increase generator length</button>
                <button type="button" className="decreasePrimeGeneratorLengthButton" onClick={this.decreasePrimeTableLength}>Decrease generator length</button>
                <button type="button" className="resetPrimeGeneratorLengthButton" onClick={this.resetPrimeGenerator}>Reset prime generator</button>

                <div className="primeGenerationLengthPromptBox">
                    {"Enter a new max value to calculate to:"}
                </div>
                <form onSubmit={this.onPrimeTableLengthChanged} className="primeGeneratorTextInputForm">
                  <input type="text" name="numPrimes" id="numPrimes" className="primeGenerationLengthInputBox" /><br/>
                  <input type="submit" value="Submit" className="primeGenerationLengthInputBoxSubmitButton"/>
                </form>
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

        this.increasePrimeTableLength = this.increasePrimeTableLength.bind(this);
        this.decreasePrimeTableLength = this.decreasePrimeTableLength.bind(this);
        this.resetPrimeGenerator = this.resetPrimeGenerator.bind(this);

        this.getPrimeTableLength = this.getPrimeTableLength.bind(this);
        this.setPrimeTableLength = this.setPrimeTableLength.bind(this);

        this.updatePrimeTable = this.updatePrimeTable.bind(this);

    }

    generatePrimeTable(){
        var maxInt = this.state.maxInt;

        var dataArrayUpdated = [];

        for (let i = 2; i<=maxInt; ++i){
            dataArrayUpdated.push(new IntMarker(i));
        }

        this.setState({
            dataArray : dataArrayUpdated,
            primes : []
        });
    }

    increasePrimeTableLength(e){
        e.preventDefault();

        this.setState({maxInt : this.state.maxInt + 1});

        this.generatePrimeTable();
    }

    decreasePrimeTableLength(e){
        e.preventDefault();

        if (this.state.dataArray.length > 1){
            this.setState({maxInt : this.state.maxInt - 1});

            this.generatePrimeTable();
        }
    }

    resetPrimeGenerator(){
        this.generatePrimeTable();
    }

    setPrimeTableLength(length) {
        var newPrimeArrayLength = parseInt(length, 10);

        console.log(newPrimeArrayLength);

        if (Number.isInteger(newPrimeArrayLength) && newPrimeArrayLength>0){
            this.setState({maxInt : newPrimeArrayLength}, this.generatePrimeTable);

            return true;
        } else {
            return false;
        }
    }

    getPrimeTableLength(){
        if (this.state.dataArray.length === 0) {
            return 0;
        }
        return this.state.dataArray.length + this.state.dataArray[0].value - 1;
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
        this.generatePrimeTable();
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

                <PrimeUserOptions increaseTimerInterval={this.increaseTimerInterval} decreaseTimerInterval={this.decreaseTimerInterval} changeTimeInterval={this.changeTimeInterval} resetTimerInterval={this.resetTimerInterval} timerInterval={this.getTimerInterval()} primeTableLength={this.getPrimeTableLength()} increasePrimeTableLength={this.increasePrimeTableLength} decreasePrimeTableLength={this.decreasePrimeTableLength} resetPrimeGenerator={this.resetPrimeGenerator} setPrimeTableLength={this.setPrimeTableLength}/>
                 </div>
                <TableRenderer dataArray={dataArray} tableName={visualizationTableName} rowWidth={rowWidth} noItemsFoundMessage={"No values"} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction}/>
                <h2> Primes found </h2>
                <TableRenderer dataArray={primes} rowWidth={rowWidth} tableName={primeTableName} noItemsFoundMessage={"No primes found"} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction}/>
            </div>
        );
    }

}

class App extends Component {

    constructor(props){
        super(props);

        this.end = 12;
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

            <PrimeGenerator rowWidth={15} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction} maxInt={this.end}/>
        </div>
    );
  }
}

export default App;
