import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Clock from './Clock.js';

var dataArray = [];

var start = 1;
var end = 95;

for (let i = start; i<end; ++i){
    dataArray.push(i);
}

var intList = dataArray.map(
    (number) => {
        //key is used to track changes to item
        return <td key={number.toString()}>{number}</td>
    }
);

class TableRow extends Component {
    constructor(props){
        super(props);

        this.state = {
            rowDataArray : props.rowDataArray
        };
    }

    render(){
        var rowDataList = this.state.rowDataArray.map(function(item){
            return <td>{item}</td>
        });

        return <tr>{rowDataList}</tr>
    }
}

class TableRenderer extends Component {
    constructor(props){
        super(props);

        this.state = {
            dataArray : props.dataArray,
            rowWidth : props.rowWidth
        };
    }

    render() {
        var dataArray = this.state.dataArray;
        var rowWidth = this.state.rowWidth;

        var rowArray = [];
        var n = 0;
        for (; (n+1)*rowWidth < dataArray.length; ++n){
            rowArray.push(dataArray.slice((n)*rowWidth,(n+1)*rowWidth));
        }
        rowArray.push(dataArray.slice(n*rowWidth, dataArray.length));

        var rowHTMLList = rowArray.map(function(rowData){
            return <TableRow rowDataArray={rowData}/>;
        });

        return (
            <table>
                {rowHTMLList}
            </table>
        );
    }
}

class App extends Component {
  render() {
    return <TableRenderer dataArray={intList} rowWidth={10}/>
  }
}

export default App;
