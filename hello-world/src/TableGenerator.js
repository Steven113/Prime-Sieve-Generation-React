import React, { Component } from 'react';

import {sha256} from './SHA256.js';

var numItemRenders = 0;

class TableItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            data : props.data,
            valueExtractionFunction : props.valueExtractionFunction,
            classExtractionFunction : props.classExtractionFunction
        };
    }

    render(){
        ++numItemRenders;

        var valueExtractionFunction = this.state.valueExtractionFunction;
        var classExtractionFunction = this.state.classExtractionFunction;

        var data = this.state.data;

        return <td className={classExtractionFunction(data)}>{valueExtractionFunction(data)}</td>
    }
}

class TableHeader extends Component {
    constructor(props){
        super(props);

        this.state = {
            data : props.data,
            valueExtractionFunction : props.valueExtractionFunction,
            classExtractionFunction : props.classExtractionFunction
        };
    }

    render(){
        ++numItemRenders;

        var valueExtractionFunction = this.state.valueExtractionFunction;
        var classExtractionFunction = this.state.classExtractionFunction;

        var data = this.state.data;

        return <th className={classExtractionFunction(data)}>{valueExtractionFunction(data)}</th>
    }
}

class TableRow extends Component {
    constructor(props){
        super(props);

        this.state = {
            rowDataArray : props.rowDataArray,
            valueExtractionFunction : props.valueExtractionFunction,
            classExtractionFunction : props.classExtractionFunction,
            keyExtractionFunction : props.keyExtractionFunction
        };

        //var rowDataArray = this.state.rowDataArray;

        //console.log(`rowDataArray ${JSON.stringify(rowDataArray)} ${rowDataArray.length}`);

    }

    componentWillReceiveProps(nextProps){
        //only update state if row changed
        if (!this.state.rowDataArray.compare(nextProps.rowDataArray)){
            this.setState({rowDataArray : nextProps.rowDataArray,});
        }
    }

    render(){
        var valueExtractionFunction = this.state.valueExtractionFunction;
        var classExtractionFunction = this.state.classExtractionFunction;
        var keyExtractionFunction = this.state.keyExtractionFunction;

        var rowDataArray = this.state.rowDataArray;

        var rowDataList = rowDataArray.map(function(item, index){
            return <TableItem key={`${keyExtractionFunction(item)}`} data={item} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction}/>;
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

        console.log(`numItemRenders for table ${tableName} ${numItemRenders}`);
        numItemRenders = 0;

        //console.log(`dataArray tableName=${tableName} ${JSON.stringify(dataArray)} ${dataArray.length}`);

        var rowArray = [];
        var n = 0;
        for (; (n+1)*rowWidth < dataArray.length; ++n){
            rowArray.push(dataArray.slice((n)*rowWidth,(n+1)*rowWidth));
        }
        rowArray.push(dataArray.slice(n*rowWidth, dataArray.length));

        var rowHTMLList = rowArray.map(function(rowData, index){
            //console.log(`rowData tableName=${tableName} ${JSON.stringify(rowData)} ${rowData.length}`);
            return <TableRow key={`${JSON.stringify(rowData)}`} rowDataArray={rowData} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction} keyExtractionFunction={keyExtractionFunction}/>;
        });

        if (columnHeaderNames){
            var headerHTML = [];
            columnHeaderNames.forEach(function(item){
                headerHTML.push((<th>{item}</th>));
            });

            rowHTMLList.unshift((<tr>{headerHTML}</tr>));
        }

        return (
            <table>
                <tbody>
                    {rowHTMLList}
                </tbody>
            </table>
        );
    }
}
