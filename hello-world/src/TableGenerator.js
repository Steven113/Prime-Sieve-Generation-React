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
        if (!this.state.dataArray.compare(nextProps.dataArray)){
            this.setState({dataArray : nextProps.dataArray,});
        }
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
            dataArray : props.dataArray,
            rowWidth : props.rowWidth,
            valueExtractionFunction : props.valueExtractionFunction,
            classExtractionFunction : props.classExtractionFunction,
            keyExtractionFunction : props.keyExtractionFunction,
            tableName : props.tableName,
            noItemsFoundMessage : props.noItemsFoundMessage,
            columnHeaderNames : props.columnHeaderNames
        };
    }

    componentWillReceiveProps(nextProps){
        if (!this.state.dataArray.compare(nextProps.dataArray)){
            this.setState({dataArray : nextProps.dataArray});
        }

        this.setState({
            rowWidth : nextProps.rowWidth,
            valueExtractionFunction : nextProps.valueExtractionFunction,
            classExtractionFunction : nextProps.classExtractionFunction,
            keyExtractionFunction : nextProps.keyExtractionFunction,
            tableName : nextProps.tableName,
            columnHeaderNames : nextProps.columnHeaderNames
        });
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

        if (dataArray.length === 0){
            return <b>{noItemsFoundMessage}</b>
        }

        //console.log(`numItemRenders for table ${tableName} ${numItemRenders}`);
        //numItemRenders = 0;

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
            <table>
                <tbody>
                    {rowArray}
                </tbody>
            </table>
        );
    }
}
