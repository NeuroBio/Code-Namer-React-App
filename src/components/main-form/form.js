import React from 'react';
import { FormInput } from '../form-input/form-input';
import './form.css';

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
            <section className="long-text" id="mission-statement">
                <p>
                    <b>Your mission:</b> to never get your PR rejected over naming conventions ever again.
                </p>

                <p>
                    How do we achieve this?  With the combined power of automation and science!!  Just answer a few quick questions for our <i>state-of-the-art, natural-language machine learning algorithm</i> to never be questioned by a fleshy humanoid again!
                </p>

                <p>
                    <span className="smol">On naming.</span><br />
                    <span className="smoller">You'll still be questioned on literally everything else.</span><br />
                    <span className="smollest">Including why you chose to wear <i>those</i> shoes today.</span>
                </p>
            </section>

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
