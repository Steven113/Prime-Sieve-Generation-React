import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Clock from './Clock.js';
import IntMarker from './IntMarker.js';
import {TableRow,TableRenderer} from './TableGenerator.js';

class PrimeGenerator extends Component {
    constructor(props){
        super(props);

        this.state = {
            rowWidth : props.rowWidth,
            valueExtractionFunction : props.valueExtractionFunction,
            classExtractionFunction : props.classExtractionFunction,
            maxInt : props.maxInt,
            dataArray : [],
            primes : []
        };

        var maxInt = this.state.maxInt;

        var dataArray = this.state.dataArray;

        for (let i = 2; i<=maxInt; ++i){
            dataArray.push(new IntMarker(i));
        }

        this.updatePrimeTable = this.updatePrimeTable.bind(this);

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



                //console.log(`primesUpdated ${JSON.stringify(primesUpdated)} ${primesUpdated.length}`);

                primesUpdated.push(dataArrayUpdated[n]);



                this.setState({
                    dataArray : dataArrayUpdated,
                    primes : primesUpdated
                });

                return;
            }
        }
    }

    componentDidMount() {
        this.primeGeneratorInterval = setInterval (this.updatePrimeTable, 500);
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
            <h1> Prime Generator</h1>
            <Clock/>
            <PrimeGenerator rowWidth={10} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction} maxInt={this.end}/>
        </div>
    );
  }
}

export default App;
