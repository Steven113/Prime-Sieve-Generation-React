import React, { Component } from 'react';

import Clock from './Clock.js';
import IntMarker from './IntMarker.js';

import {PrimeUserOptions} from './PrimeUserOptions.js';

import {TableRenderer} from './TableGenerator.js';

export class PrimeGenerator extends Component {
    constructor(props){
        super(props);

        this.state = {
            rowWidth : props.rowWidth,
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

    valueExtractionFunction(item){
        return item.value;
    }

    classExtractionFunction(item){
        return item.isPrime;
    }

    keyExtractionFunction(item){
        return item.value + " " + item.isPrime;
    }

    render(){
        var dataArray = this.state.dataArray;
        var rowWidth = this.state.rowWidth;
        var valueExtractionFunction = this.valueExtractionFunction;
        var classExtractionFunction = this.classExtractionFunction;
        var keyExtractionFunction = this.keyExtractionFunction;
        var primes = this.state.primes;

        var visualizationTableName = "Primes calculation visualization";
        var primeTableName = "Primes found";

        //console.log(`primes ${JSON.stringify(primes)} ${primes.length}`);

        return (
            <div className="primeGenerator">

                <div className="primeGeneratorHeading">
                    <h1> Prime Generator</h1>
                    <Clock/>
                </div>

                <div className="user-options">

                <section><PrimeUserOptions increaseTimerInterval={this.increaseTimerInterval} decreaseTimerInterval={this.decreaseTimerInterval} changeTimeInterval={this.changeTimeInterval} resetTimerInterval={this.resetTimerInterval} timerInterval={this.getTimerInterval()} primeTableLength={this.getPrimeTableLength()} increasePrimeTableLength={this.increasePrimeTableLength} decreasePrimeTableLength={this.decreasePrimeTableLength} resetPrimeGenerator={this.resetPrimeGenerator} setPrimeTableLength={this.setPrimeTableLength}/></section>
                 </div>

                <section>
                    <div className="tableSection">
                        <TableRenderer dataArray={dataArray} tableName={visualizationTableName} key={visualizationTableName} rowWidth={rowWidth} noItemsFoundMessage={"No values"} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction} keyExtractionFunction={keyExtractionFunction} tableClassName={"center"}/>
                        <h2> Primes found </h2>
                        <TableRenderer dataArray={primes} rowWidth={rowWidth} tableName={primeTableName} key={primeTableName} noItemsFoundMessage={"No primes found"} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction} keyExtractionFunction={keyExtractionFunction} tableClassName={"center"}/>
                    </div>
                </section>
            </div>
        );
    }

}
