import React, { Component } from 'react';

import {sha256} from './SHA256.js';

var numItemRenders = 0;

class FlexItem extends Component {
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

        var classData = `grid-item grid-item-equal-column-width ${classExtractionFunction(data)}`;

        return <div className={classData}>{valueExtractionFunction(data)}</div>
    }
}

export class FlexRow extends Component {
    constructor(props){
        super(props);

        //console.log(`props = ${JSON.stringify(props)}`);

        this.state = {
            noItemsFoundMessage : this.noItemsFoundMessage,
            dataArray : props.dataArray,
            valueExtractionFunction : props.valueExtractionFunction,
            classExtractionFunction : props.classExtractionFunction,
            keyExtractionFunction : props.keyExtractionFunction
        };

        //console.log(this.state.rowKeyArray);

        //console.log(`rowDataArray ${JSON.stringify(rowDataArray)} ${rowDataArray.length}`);

    }

    componentWillReceiveProps(nextProps){

        if (nextProps.dataArray){

            this.setState({
                dataArray : nextProps.dataArray
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState){

        var keyExtractionFunction = this.state.keyExtractionFunction;

        this.state.dataArray.forEach(function(item, index){
            if (keyExtractionFunction(item) !== keyExtractionFunction(nextProps.dataArray[index])){
                return true;
            }
        });

        return false;
    }

    render(){
        var valueExtractionFunction = this.state.valueExtractionFunction;
        var classExtractionFunction = this.state.classExtractionFunction;
        var keyExtractionFunction = this.state.keyExtractionFunction;
        var noItemsFoundMessage = this.noItemsFoundMessage;

        var dataArray = this.state.dataArray;

        console.log(`dataArray = ${JSON.stringify(dataArray)}`);



        //console.log(`Rendering subarray: ${JSON.stringify(dataArray.slice(start, end))}`);

        if (dataArray.length == 0){
            return <div>{noItemsFoundMessage}</div>
        }

        var rowDataList = dataArray.map(function(item, index){
            return <FlexItem key={`${keyExtractionFunction(item)}`} dataArray={dataArray} itemIndex={index} valueExtractionFunction={valueExtractionFunction} classExtractionFunction={classExtractionFunction}/>;
        });

        return <div className="grid-container-auto-fill-row">{rowDataList}</div>
    }
}
