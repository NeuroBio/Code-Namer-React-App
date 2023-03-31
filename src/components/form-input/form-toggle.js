import React from 'react';
import './form-input.css';

export class FormToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            on: this.props.default ?? false,
        };

        this.onToggle = this.onToggle.bind(this);
    }

    onToggle () {
        const newState = !this.state.on;
        this.setState({ on: newState });
        this.props.onToggle(newState);
    }

    render() {
        return (<div className="toggle-box">
            <label className="switch">
                <input
                    type="checkbox"
                    checked={this.state.on}
                    onChange={this.onToggle} />
                <span className="slider round"></span>
            </label>
            <span className="toggle-text">{this.props.label}</span>
        </div>);
    }
}