import React from 'react';
import './form.css';
import { FormRadioSet } from '../form-input/form-radioset';
import { FunctionSection } from '../type-sections/function-section';
import { ClassSection } from '../type-sections/class-section';
import { ObjectSection } from '../type-sections/object-section';
import { ArraySection } from '../type-sections/array-section';

const SupportedTypes = {
    FUNCTION: { answer: 'Function' },
    CLASS: { answer: 'Class' },
    OBJECT: { answer: 'Object' },
    ARRAY: { answer: 'Array' },
};

const ReviewerTypes = {
    JONES: { answer: 'Jones', help: 'verbose = true'},
    JEREMY: { answer: 'Jeremy', help: 'verbose = false'},
    BOTH: { answer: 'Both', help: 'verbose = trufalse'},
}

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jeremyName: '',
            jonesName: '',
            codeType: '',
        }

        this.updateName = this.updateName.bind(this);
        this.onSelectCodeType = this.onSelectCodeType.bind(this);
        this.onSelectReviewerType = this.onSelectReviewerType.bind(this);
    }


    onSelectCodeType (selection) {
        this.setState({ codeType: selection }, this.updateName);
    }

    onSelectReviewerType (selection) {
        this.setState({ reviewerType: selection }, this.updateName);
    }

    updateName (input) {
        this.setState({ jonesName: input?.jonesName || '' });
        this.setState({ jeremyName: input?.jeremyName || '' });
    }

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
            <section className="main-form-inputs">
                <FormRadioSet
                    question="Your code chunk is a:"
                    identifier="code-chunk-type"
                    answers={Object.values(SupportedTypes)}
                    onSelection={this.onSelectCodeType}
                />
                <FormRadioSet
                    question="Revewier Mode:"
                    identifier="reviewer"
                    answers={Object.values(ReviewerTypes)}
                    onSelection={this.onSelectReviewerType}
                />
            </section>
            <section className="section-form-inputs">
                { this.state.codeType === SupportedTypes.FUNCTION.answer
                    ? <FunctionSection
                        updateName={this.updateName}
                    /> : ''}
                { this.state.codeType === SupportedTypes.CLASS.answer
                    ? <ClassSection
                        updateName={this.updateName}
                    /> : ''}
                { this.state.codeType === SupportedTypes.OBJECT.answer
                    ? <ObjectSection
                        updateName={this.updateName}
                    /> : ''}
                { this.state.codeType === SupportedTypes.ARRAY.answer
                    ? <ArraySection
                        updateName={this.updateName}
                    /> : ''}
            </section>

            {/* result */}
            <p id="form-results">
                <label id="result-label" htmlFor="result">Suggested Name: </label>
                <br />
                <span id="result">
                    Jones: { this.state.jonesName}
                </span>
                <br />
                <span id="result">
                    Jeremy: { this.state.jeremyName}
                </span>
            </p>
            <hr />
            <br />
        </form>);
    }
}
