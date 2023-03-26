import React from 'react';
import './form-input.css';

export class FormInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputRef = React.createRef();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.keypressHandler = this.keypressHandler.bind(this);
    }

    handleInputChange (event) {
        const input = event.target.value;
        this.props.onUpdate(input);
    }

    keypressHandler (event) {
        if(event.code === 'Enter') {
            this.inputRef.current.blur();
        }
    }

    render() {
        return (<div className="form-input">
            <label>{this.props.label}</label><br />
            <input type="text" id={this.props.label}
                ref={this.inputRef}
                onBlur={this.handleInputChange}
                onKeyDown={this.keypressHandler}
            />
        </div>);
    }
}
