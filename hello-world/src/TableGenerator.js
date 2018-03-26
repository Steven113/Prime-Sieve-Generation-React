import React, { Component } from 'react';

import {sha256} from './SHA256.js';

var numItemRenders = 0;

class TableItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            dataArray : props.dataArray,
            itemIndex : props.itemIndex,
            valueExtractionFunction : props.valueExtractionFunction,
            classExtractionFunction : props.classExtractionFunction
        };
    }

    render(){
        ++numItemRenders;

        var valueExtractionFunction = this.state.valueExtractionFunction;
        var classExtractionFunction = this.state.classExtractionFunction;

        var data = this.state.dataArray[this.state.itemIndex];

        return <td className={classExtractionFunction(data)}>{valueExtractionFunction(data)}</td>
    }
}

class TableRow extends Component {
    constructor(props){
        super(props);

        this.state = {
            dataArray : props.dataArray,
            valueExtractionFunction : props.valueExtractionFunction,
            classExtractionFunction : props.classExtractionFunction,
            keyExtractionFunction : props.keyExtractionFunction,
            start : props.start,
            end : props.end
        };

        //var rowDataArray = this.state.rowDataArray;

        //console.log(`rowDataArray ${JSON.stringify(rowDataArray)} ${rowDataArray.length}`);

    }

    componentWillReceiveProps(nextProps){
        //only update state if row changed
        var initialArrayKeys = this.state.dataArray.slice(this.state.start,this.state.end).map((item) => {return this.state.keyExtractionFunction(item)});
        var newArrayKeys = nextProps.dataArray.slice(this.state.start,this.state.end).map((item) => {return this.state.keyExtractionFunction(item)});



        if (!initialArrayKeys.compare(newArrayKeys)){
            //console.log("initialArrayKeys "+initialArrayKeys);
            //console.log("newArrayKeys "+newArrayKeys);
            this.setState({dataArray : nextProps.dataArray.deepCopy()});
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.state.dataArray.length !== nextState.dataArray.length){
            return true;
        }

        var keyExtractionFunction = this.state.keyExtractionFunction;

        for (let n = this.state.start; n<this.state.end; ++n){
            if (keyExtractionFunction(this.state.dataArray[n]) != keyExtractionFunction(nextState.dataArray[n])){
                //console.log(`${keyExtractionFunction(this.state.dataArray[n])} != ${keyExtractionFunction(nextState.dataArray[n])}`);

                return true;
            } else {
                //console.log(`${keyExtractionFunction(this.state.dataArray[n])} == ${keyExtractionFunction(nextState.dataArray[n])}`);
            }
        }

        return false;
    }

    render(){
        var valueExtractionFunction = this.state.valueExtractionFunction;
        var classExtractionFunction = this.state.classExtractionFunction;
        var keyExtractionFunction = this.state.keyExtractionFunction;

        var start = this.state.start;
        var end = this.state.end;

        var dataArray = this.state.dataArray;

        //console.log(`Rendering subarray: ${JSON.stringify(dataArray.slice(start, end))}`);

        var rowDataList = dataArray.slice(start, end).map(function(item, index){
            return <TableItem key={`${keyExtractionFunction(item)}`} dataArray={dataArray} itemIndex={start + index} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction}/>;
        });

        return <tr>{rowDataList}</tr>
    }
}

export class TableRenderer extends Component {
    constructor(props){
        super(props);

        //console.log(`props.dataArray tableName=${props.tableName} ${JSON.stringify(props.dataArray)} ${props.dataArray.length}`);

        this.state = {
            dataArray : props.dataArray.deepCopy(),
            rowWidth : props.rowWidth,
            valueExtractionFunction : props.valueExtractionFunction,
            classExtractionFunction : props.classExtractionFunction,
            keyExtractionFunction : props.keyExtractionFunction,
            tableName : props.tableName,
            noItemsFoundMessage : props.noItemsFoundMessage,
            columnHeaderNames : props.columnHeaderNames,
            tableClassName : props.tableClassName
        };
    }

    componentWillReceiveProps(nextProps){
        console.log(`Updating table: ${this.state.tableName}`);
        //console.log("Current array "+JSON.stringify(this.state.dataArray));
        //console.log("Next array "+JSON.stringify(nextProps.dataArray));

        //if (!this.state.dataArray.compare(nextProps.dataArray)){
            this.setState({dataArray : nextProps.dataArray.deepCopy()});
        //}
    }



    componentWillUnmount(){
        console.log("Destroying table "+this.state.tableName);
    }

    render() {

        var dataArray = this.state.dataArray;
        var rowWidth = this.state.rowWidth;
        var valueExtractionFunction = this.state.valueExtractionFunction;
        var classExtractionFunction = this.state.classExtractionFunction;
        var keyExtractionFunction = this.state.keyExtractionFunction;
        var tableName = this.state.tableName;
        var noItemsFoundMessage = this.state.noItemsFoundMessage;
        var columnHeaderNames = this.state.columnHeaderNames;

        var tableClassName = this.state.tableClassName;

        if (dataArray.length === 0){
            return <b>{noItemsFoundMessage}</b>
        }

        console.log(`numItemRenders for table ${tableName} ${numItemRenders}`);
        numItemRenders = 0;

        //console.log(`dataArray tableName=${tableName} ${JSON.stringify(dataArray)} ${dataArray.length}`);

        var rowArray = [];
        var n = 0;
        for (; (n+1)*rowWidth < dataArray.length; ++n){
            rowArray.push((<TableRow key={`${n*rowWidth} ${(n)*rowWidth + rowWidth}`} dataArray={dataArray} start={n*rowWidth} end={n*rowWidth+rowWidth} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction} keyExtractionFunction={keyExtractionFunction}/>));
        }
        rowArray.push((<TableRow key={`${n*rowWidth} ${dataArray.length}`} dataArray={dataArray} start={n*rowWidth} end={dataArray.length} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction} keyExtractionFunction={keyExtractionFunction}/>));

        if (columnHeaderNames){
            var headerHTML = [];
            columnHeaderNames.forEach(function(item, index){
                headerHTML.push((<th key={index}>{item}</th>));
            });

            rowArray.unshift((<tr key="Headers">{headerHTML}</tr>));
        }

        return (
            <table className={tableClassName}>
                <tbody>
                    {rowArray}
                </tbody>
            </table>
        );
    }
}
