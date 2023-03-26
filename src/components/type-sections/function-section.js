import React from 'react';
import { Formatter } from '../../services/formatter';
import { FormRadioSet } from '../form-input/form-radioset';
import { FormInput } from '../form-input/form-input';


const FunctionTypes = {
    COMMAND: 'Command (changes data or a record type)',
    QUERY: 'Query (fetches data or a record type)',
    BOTH: 'The dreaded Command/Query (does both)',
};

const Binary = {
    TRUE: 'Yes',
    FALSE: 'No',
}
export class FunctionSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onSelectType = this.onSelectType.bind(this);
        this.onSelectPlural = this.onSelectPlural.bind(this);
        this.updateRecord = this.updateRecord.bind(this);
        this.updateCommand = this.updateCommand.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.buildName = this.buildName.bind(this);
    }

    onSelectType (selection) {
        this.setState({ functionType: selection }, this.buildName);
    }

    onSelectPlural (selection) {
        this.setState({ pluralType: selection }, this.buildName);
    }

    updateRecord (input) {
        this.setState({ recordType: input }, this.buildName);
    }

    updateCommand (input) {
        this.setState({ command: input }, this.buildName);
    }

    updateQuery (input) {
        this.setState({ query: input }, this.buildName);
    }

    buildName () {
        const { recordType, command, query, pluralType } = this.state;
        switch (this.state.functionType) {
            case FunctionTypes.COMMAND:
                if (recordType && command) {
                    const suggestedName = Formatter.combineAllVars([ command, recordType]);
                    this.props.updateName(suggestedName);
                }
                break;
            case FunctionTypes.QUERY:
                if (recordType) {
                    let vars = [ 'get', recordType]
                    if (query) {
                        vars.push('by');
                        vars.push(`${query}${pluralType === Binary.TRUE ? 's' : ''}`);
                    }
                    const suggestedName = Formatter.combineAllVars(vars);
                    this.props.updateName(suggestedName);
                }
                break;
            case FunctionTypes.BOTH:
                break;
            default:
                break;
        }
    }
    
    

    render() {
        return (<div>
            <FormRadioSet
                question="Your function is a:"
                identifier="function-type"
                answers={Object.values(FunctionTypes)}
                onSelection={this.onSelectType}
            />

            <FormInput label="The data/record type (noun)" onUpdate={this.updateRecord}/>

            { this.state.functionType === FunctionTypes.COMMAND || this.state.functionType === FunctionTypes.BOTH
            ? <fieldset>
                <legend>Command Settings</legend>
                <FormInput label="How the data/record is changed (verb)" onUpdate={this.updateCommand}/>               
            </fieldset>
            : ''}
            { this.state.functionType === FunctionTypes.QUERY || this.state.functionType === FunctionTypes.BOTH
            ? <fieldset>
                <legend>Query Settings</legend>
                <FormInput label="If not fetching instances of the data/record type, what property are they chosen by?" onUpdate={this.updateQuery}/>
                <FormRadioSet
                    question="Is the property an array or single value?"
                    identifier="plual"
                    answers={Object.values(Binary)}
                    onSelection={this.onSelectPlural}
                />
            </fieldset>
            : '' }
         </div>);
         
    }
}
