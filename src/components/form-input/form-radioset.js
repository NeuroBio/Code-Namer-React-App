import React from 'react';
import './form-input.css';
import { FormRadioButton } from './form-radiobutton';

export class FormRadioSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onSelection = this.onSelection.bind(this);
    }

    onSelection(selection) {
        this.props.onSelection(selection);
    }

    render() {
        return ( <fieldset className='form-radio-set'>
            <legend>{ this.props.question }</legend>           
        
            {this.props.answers.map((answer, i) => {
                const key = `${this.props.identifier}-${i}`
                return (<FormRadioButton
                        value={answer.answer}
                        help={answer.help}
                        key={key}
                        id={key}
                        name={this.props.identifier}
                        default={answer.default}
                        onSelection={this.onSelection}
                    />)
            })}

         </fieldset>);
    }
}
