import React from 'react';
import './form-input.css';

export class FormInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        const input = event.target.value;
        this.props.onUpdate(input);
    }

    render() {
        return (<div className="form-input">
            <label>{this.props.label}</label><br />
            <input type="text" id={this.props.label}
                onChange={this.handleInputChange}
            />
        </div>);
    }
}