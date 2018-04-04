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
                <table>
                    <tr>
                        <td className="primeGenerationSpeedTextBox">
                            <div>{this.state.timerInterval/1000}s</div>
                        </td>
                        {/*Controlling generator speed*/}
                        <td className="tableButton"><button type="button" className="increasePrimeGeneratorSpeedButton tableButton" onClick={this.decreaseTimerInterval}>Increase generator speed</button></td>
                        <td className="tableButton"><button type="button" className="decreasePrimeGeneratorSpeedButton tableButton" onClick={this.increaseTimerInterval}>Decrease generator speed</button></td>
                        <td className="tableButton"><button type="button" className="resetPrimeGeneratorSpeedButton tableButton" onClick={this.resetTimerInterval}>Reset generator speed</button></td>
                    </tr>

                    <tr>
                    <td className="primeGenerationLengthTextBox">
                            <div>{this.state.primeTableLength}</div>
                    </td>


                        {/*Controlling generator size*/}
                        <td className="tableButton"><button type="button" className="increasePrimeGeneratorLengthButton tableButton" onClick={this.increasePrimeTableLength}>Increase generator length</button></td>
                        <td className="tableButton"><button type="button" className="decreasePrimeGeneratorLengthButton tableButton" onClick={this.decreasePrimeTableLength}>Decrease generator length</button></td>
                        <td className="tableButton"><button type="button" className="resetPrimeGeneratorLengthButton tableButton" onClick={this.resetPrimeGenerator}>Reset prime generator</button></td>
                    </tr>
                </table>
                <div className="textInfo center">
                    <div className="textInfo">{"Enter a new max value to calculate to:"}</div>
                    <form onSubmit={this.onPrimeTableLengthChanged} className="primeGeneratorTextInputForm">
                      <input type="text" name="numPrimes" id="numPrimes" className="primeGenerationLengthInputBox" /><br/>
                      <input type="submit" value="Submit" className="primeGenerationLengthInputBoxSubmitButton"/>
                    </form>
                </div>
            </div>
        );
    }
}
