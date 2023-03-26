import React from 'react';
import { FormInput } from '../form-input/form-input';
import { FormRadioSet } from '../form-input/form-radioset';
import './form.css';
import { FunctionSection } from '../type-sections/function-section';
import { ClassSection } from '../type-sections/class-section';
import { ObjectSection } from '../type-sections/object-section';
import { ArraySection } from '../type-sections/array-section';

const SupportedTypes = {
    FUNCTION: 'Function',
    CLASS: 'Class',
    OBJECT: 'Object',
    ARRAY: 'Array'
};

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestedName: 'initial',
            codeType: '',
        }

        this.updateTest = this.updateTest.bind(this);
        this.onSelectCodeType = this.onSelectCodeType.bind(this);
    }


    onSelectCodeType (selection) {
        this.setState({ codeType: selection });
    }

    updateTest (input) {
        this.setState({ suggestedName: input });
    };

    submitHandler(e) {
        e.preventDefault();
    }

    render () {
        return (<form onSubmit={this.submitHandler}>
            {/* intro */}
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
            <hr />

            {/* the form contents */}
            <FormRadioSet
            question="What is your code chunk?"
            identifier="main-question"
            answers={Object.values(SupportedTypes)}
            onSelection={this.onSelectCodeType}
            />

            { this.state.codeType === SupportedTypes.FUNCTION ? <FunctionSection /> : ''}
            { this.state.codeType === SupportedTypes.CLASS ? <ClassSection /> : ''}
            { this.state.codeType === SupportedTypes.OBJECT ? <ObjectSection /> : ''}
            { this.state.codeType === SupportedTypes.ARRAY ? <ArraySection /> : ''}

            <FormInput label="Test" onUpdate={this.updateTest}/>


            {/* result */}
            <p>
                <label htmlFor="result">Suggested Name: </label>
                <span id="result">
                    { this.state.suggestedName}
                </span>
            </p>
        </form>);
    }
}
