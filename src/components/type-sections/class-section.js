import React from 'react';
import { Formatter } from '../../services/formatter';
import { FormRadioSet } from '../form-input/form-radioset';

const ClassTypes = {
    REPO: { answer: 'Repo' , help: 'Stores common, reusable queries for a record type' },
    FACTORY: { answer: 'Factory', help: 'Creates generic instances of an entity or value object type' },
    FUNCTION: { answer: 'Application Service', help: 'Serves as an interface between a SMART-Flow and the business code' },
    VALUE_OBJECT: { answer: 'Value Object', help: 'An object instance without an identity.  It is immutable.  It is "updated" by replacing it with a modified copy.' },
    ENTITY: { answer: 'Entity', help: 'An object instance that has a unique identity.  It cannnot be updated by full replacement, because that would change its identity.  It must be updated atomically instead. (We have very few of these)' },
    BUSINESS: { answer: 'Domain Service', help: 'a set of related business code that does not belong to a single an entity nor value object.' },
}
export class ClassSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onSelectType = this.onSelectType.bind(this);


    }

    onSelectType (selection) {
        this.setState({ classType: selection }, this.buildName);
    }

    render() {
        return (<div>
            <FormRadioSet
                question="The purpose of this class:"
                identifier="class-type"
                answers={Object.values(ClassTypes)}
                onSelection={this.onSelectType}
            />

            { this.state.classType === ClassTypes.REPO.answer
            ? <></> : ''}
            { this.state.classType === ClassTypes.FACTORY.answer
            ? <></> : ''}
            { this.state.classType === ClassTypes.FUNCTION.answer
            ? <></> : ''}
            { this.state.classType === ClassTypes.VALUE_OBJECT.answer
            ? <></> : ''}
            { this.state.classType === ClassTypes.ENTITY.answer
            ? <></> : ''}
            { this.state.classType === ClassTypes.BUSINESS.answer
            ? <></> : ''}
         </div>);
    }
}
