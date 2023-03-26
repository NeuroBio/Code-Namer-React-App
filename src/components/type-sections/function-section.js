import React from 'react';
import './section.css'
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
        
        this.updateCommandRecord = this.updateCommandRecord.bind(this);
        this.updateCommand = this.updateCommand.bind(this);

        this.updateQueryRecord = this.updateQueryRecord.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.onSelectPlural = this.onSelectPlural.bind(this);

        this.buildName = this.buildName.bind(this);
    }

    onSelectType (selection) {
        this.setState({ functionType: selection }, this.buildName);
    }

    updateCommandRecord (input) {
        this.setState({ commandRecord: input }, this.buildName);
    }
    updateCommand (input) {
        this.setState({ command: input }, this.buildName);
    }

    updateQueryRecord(input) {
        this.setState({ queryRecord: input }, this.buildName);
    }
    updateQuery (input) {
        this.setState({ query: input }, this.buildName);
    }
    onSelectPlural (selection) {
        this.setState({ pluralType: selection }, this.buildName);
    }

    buildName () {
        const {
            command,
            commandRecord,
            query,
            queryRecord,
            pluralType,
        } = this.state;
        switch (this.state.functionType) {
            case FunctionTypes.COMMAND:
                if (command && commandRecord) {
                    const suggestedName = Formatter.combineAllNameParts([ command, commandRecord]);
                    this.props.updateName(suggestedName);
                }
                break;
            case FunctionTypes.QUERY:
                if (queryRecord) {
                    let nameParts = [ 'get', queryRecord];
                    if (query) {
                        nameParts.push('by');
                        nameParts.push(`${query}${pluralType === Binary.TRUE ? 's' : ''}`);
                    }
                    const suggestedName = Formatter.combineAllNameParts(nameParts);
                    this.props.updateName(suggestedName);
                }
                break;
            case FunctionTypes.BOTH:
                if (command && commandRecord && queryRecord) {
                    let nameParts = [ command, commandRecord, 'and', 'get', queryRecord]
                    if (query) {
                        nameParts.push('by');
                        nameParts.push(`${query}${pluralType === Binary.TRUE ? 's' : ''}`);
                    }
                    const suggestedName = Formatter.combineAllNameParts(nameParts);
                    this.props.updateName(suggestedName);
                }
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

            { this.state.functionType === FunctionTypes.COMMAND || this.state.functionType === FunctionTypes.BOTH
            ? <fieldset className="form-set">
                <legend>Command Settings</legend>
                <FormInput label="The command data/record type (noun)" onUpdate={this.updateCommandRecord}/>
                <FormInput label="How the data/record is changed (verb)" onUpdate={this.updateCommand}/>               
            </fieldset>
            : ''}
            { this.state.functionType === FunctionTypes.QUERY || this.state.functionType === FunctionTypes.BOTH
            ? <fieldset className="form-set">
                <legend>Query Settings</legend>
                <FormInput label="The query data/record type (noun)" onUpdate={this.updateQueryRecord}/>
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
