import React, { Component } from 'react';

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
        var valueExtractionFunction = this.state.valueExtractionFunction;
        var classExtractionFunction = this.state.classExtractionFunction;

        var data = this.state.data;

        return <td className={classExtractionFunction(data)}>{valueExtractionFunction(data)}</td>
    }
}

class TableRow extends Component {
    constructor(props){
        super(props);

        this.state = {
            rowDataArray : props.rowDataArray,
            valueExtractionFunction : props.valueExtractionFunction,
            classExtractionFunction : props.classExtractionFunction
        };

        //var rowDataArray = this.state.rowDataArray;

        //console.log(`rowDataArray ${JSON.stringify(rowDataArray)} ${rowDataArray.length}`);

    }

    render(){
        var valueExtractionFunction = this.state.valueExtractionFunction;
        var classExtractionFunction = this.state.classExtractionFunction;

        var rowDataArray = this.state.rowDataArray;

        var rowDataList = rowDataArray.map(function(item, index){
            return <TableItem key={`${valueExtractionFunction(item)} ${index}`} data={item} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction}/>;
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
            tableName : props.tableName,
            noItemsFoundMessage : props.noItemsFoundMessage
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dataArray : nextProps.dataArray,
            rowWidth : nextProps.rowWidth,
            valueExtractionFunction : nextProps.valueExtractionFunction,
            classExtractionFunction : nextProps.classExtractionFunction,
            tableName : nextProps.tableName
        });
    }

    render() {



        var dataArray = this.state.dataArray;
        var rowWidth = this.state.rowWidth;
        var valueExtractionFunction = this.state.valueExtractionFunction;
        var classExtractionFunction = this.state.classExtractionFunction;
        var tableName = this.state.tableName;
        var noItemsFoundMessage = this.state.noItemsFoundMessage;

        if (dataArray.length === 0){
            return <b>{noItemsFoundMessage}</b>
        }

        //console.log(`dataArray tableName=${tableName} ${JSON.stringify(dataArray)} ${dataArray.length}`);

        var rowArray = [];
        var n = 0;
        for (; (n+1)*rowWidth < dataArray.length; ++n){
            rowArray.push(dataArray.slice((n)*rowWidth,(n+1)*rowWidth));
        }
        rowArray.push(dataArray.slice(n*rowWidth, dataArray.length));

        var rowHTMLList = rowArray.map(function(rowData, index){
            //console.log(`rowData tableName=${tableName} ${JSON.stringify(rowData)} ${rowData.length}`);
            return <TableRow key={`${JSON.stringify(rowData)}${index}`} rowDataArray={rowData} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction}/>;
        });

        return (
            <table>
                <tbody>
                    {rowHTMLList}
                </tbody>
            </table>
        );
    }
}
