import React from 'react';
import './form-input.css';
import { ToolTip } from './tooltip'

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
                onChange={this.onSelection}
                defaultChecked={this.props.default}/>
            <label htmlFor={this.props.id}>
                {this.props.value}
                <ToolTip help={this.props.help} />
            </label>
         </div>);
    }
}
