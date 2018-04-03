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
            end : props.end,
            rowKey : props.rowKey
        };

        //console.log(this.state.rowKeyArray);

        //console.log(`rowDataArray ${JSON.stringify(rowDataArray)} ${rowDataArray.length}`);

    }

    componentWillReceiveProps(nextProps){
        //only update state if row changed
        if (!this.state.rowKey !== (nextProps.rowKey)){
            //console.log("initialArrayKeys "+initialArrayKeys);
            //console.log("newArrayKeys "+newArrayKeys);
            this.setState({
                dataArray : nextProps.dataArray,
                rowKey : nextProps.rowKey
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState){

        if (this.state.rowKey === nextProps.rowKey){

            return false;
        } else {
            //console.log("oldRowKeys: "+JSON.stringify(oldRowKeys));
            //console.log("newRowKeys: "+JSON.stringify(newRowKeys));
            return true;
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
            rowKeys : this.generateRowKeys(props.dataArray, props.rowWidth),
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

    generateRowKeys(dataArray, rowWidth){
        var rowKeys = [];

        var n = 0;

        for (; n<dataArray.length; n+=rowWidth){
            var rowArray = dataArray.slice(n, Math.min(n + rowWidth, dataArray.length));

            rowKeys.push(sha256((rowArray)));
        }

        return rowKeys;
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.dataArray){
            console.log(`Updating table: ${this.state.tableName}`);

            this.setState({
                dataArray : nextProps.dataArray,
                rowKeys : this.generateRowKeys(nextProps.dataArray, nextProps.rowWidth)
            });
        //}
        }
    }



    componentWillUnmount(){
        console.log("Destroying table "+this.state.tableName);
    }

    render() {

        var dataArray = this.state.dataArray;
        var rowKeys = this.state.rowKeys;
        var rowWidth = this.state.rowWidth;
        var valueExtractionFunction = this.state.valueExtractionFunction;
        var classExtractionFunction = this.state.classExtractionFunction;
        var keyExtractionFunction = this.state.keyExtractionFunction;
        var tableName = this.state.tableName;
        var noItemsFoundMessage = this.state.noItemsFoundMessage;
        var columnHeaderNames = this.state.columnHeaderNames;

        var tableClassName = this.state.tableClassName;

        var rowKeyArray = this.state.rowKeyArray;

        if (dataArray.length === 0){
            return <b>{noItemsFoundMessage}</b>
        }

        console.log(`numItemRenders for table ${tableName} ${numItemRenders}`);
        numItemRenders = 0;

        //console.log(`dataArray tableName=${tableName} ${JSON.stringify(dataArray)} ${dataArray.length}`);

        //console.log(`keys = ${JSON.stringify(rowKeys)}`);

        var rowArray = [];
        var n = 0;
        for (; (n+1)*rowWidth < dataArray.length; ++n){
            rowArray.push((<TableRow key={`${n*rowWidth} ${(n)*rowWidth + rowWidth}`} dataArray={dataArray} start={n*rowWidth} end={n*rowWidth+rowWidth} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction} keyExtractionFunction={keyExtractionFunction} rowKeyArray={rowKeyArray} rowKey={rowKeys[n]}/>));
        }
        rowArray.push((<TableRow key={`${n*rowWidth} ${dataArray.length}`} dataArray={dataArray} start={n*rowWidth} end={dataArray.length} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction} keyExtractionFunction={keyExtractionFunction} rowKeyArray={rowKeyArray} rowKey={rowKeys[n]}/>));

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
