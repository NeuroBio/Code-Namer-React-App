import React from 'react';
import { FormInput } from '../form-input/form-input';

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestedName: 'initial',
        }

        this.updateTest = this.updateTest.bind(this);
    }

    updateTest (input) {
        this.setState({ suggestedName: input });
    };

    submitHandler(e) {
        e.preventDefault();
    }

    render () {
        return (<form onSubmit={this.submitHandler}>
            Henlo

            <FormInput label="Test" onUpdate={this.updateTest}/>

            <p>
                <label htmlFor="result">Suggested Name: </label>
                <span id="result">
                    { this.state.suggestedName}
                </span>
            </p>
        </form>);
    }
}
