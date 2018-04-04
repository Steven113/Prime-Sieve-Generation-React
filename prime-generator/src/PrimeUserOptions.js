import React, { Component } from 'react';

export class PrimeUserOptions extends Component {

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

                        <div className="grid-container-4-items flex-flow-row">
                            <div className="grid-item">
                                <div>{this.state.timerInterval/1000}s</div>
                            </div>
                            {/*Controlling generator speed*/}
                            <button type="button" className="grid-item" onClick={this.decreaseTimerInterval}>Increase generator speed</button>
                            <button type="button" className="grid-item" onClick={this.increaseTimerInterval}>Decrease generator speed</button>
                            <button type="button" className="grid-item" onClick={this.resetTimerInterval}>Reset generator speed</button>
                        </div>

                        <div className="grid-container-4-items flex-flow-row">
                            <div className="grid-item">
                                    <div>{this.state.primeTableLength}</div>
                            </div>
                            {/*Controlling generator size*/}
                            <button type="button" className="grid-item" onClick={this.increasePrimeTableLength}>Increase generator length</button>
                            <button type="button" className="grid-item" onClick={this.decreasePrimeTableLength}>Decrease generator length</button>
                            <button type="button" className="grid-item" onClick={this.resetPrimeGenerator}>Reset prime generator</button>
                        </div>

                    <div className="grid-container-2-items flex-flow-row">
                        <div className="grid-item">{"Enter a new max value to calculate to:"}</div>
                        <form onSubmit={this.onPrimeTableLengthChanged} className="primeGeneratorTextInputForm grid-item">
                          <input type="text" name="numPrimes" id="numPrimes" className="primeGenerationLengthInputBox" /><br/>
                          <input type="submit" value="Submit" className="primeGenerationLengthInputBoxSubmitButton"/>
                        </form>
                    </div>
            </div>
        );
    }
}
