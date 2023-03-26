import React from 'react';
import './form-input.css';

export class FormRadioButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onSelection = this.onSelection.bind(this);
    }

    onSelection() {
        this.props.onSelection(this.props.value);
    }

    render() {
        return (<div>
            <input
                type="radio"
                id={this.props.id}
                value={this.props.value}
                name={this.props.name}
                onChange={this.onSelection}/>
            <label htmlFor={this.props.id}>{this.props.value}</label>
         </div>);
    }
}
