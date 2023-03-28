import React from 'react';
import './section.css'
import { Formatter } from '../../services/formatter';
import { FormRadioSet } from '../form-input/form-radioset';
import { FormInput } from '../form-input/form-input';


const FunctionTypes = {
    COMMAND: { answer: 'Command', help: 'changes data or a record type' },
    QUERY: { answer: 'Query', help: 'fetches data or a record type' },
    BOTH: { answer: 'The dreaded Command/Query', help:'does both' },
};

const Binary = {
    TRUE: { answer: 'Yes' },
    FALSE: { answer: 'No', default: true },
}
export class FunctionSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onSelectType = this.onSelectType.bind(this);
        
        this.updateCommandRecord = this.updateCommandRecord.bind(this);
        this.updateCommand = this.updateCommand.bind(this);
        this.onSelectCommandPlural = this.onSelectCommandPlural.bind(this);

        this.updateQueryRecord = this.updateQueryRecord.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.onSelectQueryPlural = this.onSelectQueryPlural.bind(this);

        this.buildName = this.buildName.bind(this);
    }

    onSelectType (selection) {
        this.props.updateName();
        this.setState({ functionType: selection }, this.buildName);
    }

    updateCommandRecord (input) {
        this.setState({ commandRecord: input }, this.buildName);
    }
    updateCommand (input) {
        this.setState({ command: input }, this.buildName);
    }
    onSelectCommandPlural (selection) {
        this.setState({ commandPlural: selection }, this.buildName);
    }

    updateQueryRecord(input) {
        this.setState({ queryRecord: input }, this.buildName);
    }
    updateQuery (input) {
        this.setState({ query: input }, this.buildName);
    }
    onSelectQueryPlural (selection) {
        this.setState({ queryPlural: selection }, this.buildName);
    }

    buildName () {
        const {
            command,
            commandRecord,
            commandPlural,
            query,
            queryRecord,
            queryPlural,
        } = this.state;
        switch (this.state.functionType) {
            case FunctionTypes.COMMAND.answer:
                if (command && commandRecord) {
                    const jeremyNameParts = [Formatter.jeremyTruncate(command)];
                    const jonesNameParts = [command];

                    jeremyNameParts.push(`${Formatter.jeremyTruncate(commandRecord)}${commandPlural === Binary.TRUE.answer ? 's' : ''}`)
                    jonesNameParts.push(`${commandRecord}${commandPlural === Binary.TRUE.answer ? 's' : ''}`);

                    const jonesName = Formatter.combineAllNameParts(jonesNameParts);
                    const jeremyName = Formatter.combineAllNameParts(jeremyNameParts);

                    this.props.updateName({ jonesName, jeremyName });
                }
                break;
            case FunctionTypes.QUERY.answer:
                if (queryRecord) {
                    const jonesNameParts = [ 'get', queryRecord];
                    const jeremyNameParts = [ 'get', Formatter.jeremyTruncate(queryRecord)];
                    
                    if (query) {
                        jonesNameParts.push('by');
                        jonesNameParts.push(`${query}${queryPlural === Binary.TRUE.answer ? 's' : ''}`);
                        jeremyNameParts.push('by');
                        jeremyNameParts.push(`${Formatter.jeremyTruncate(query)}${queryPlural === Binary.TRUE.answer ? 's' : ''}`);
                    }
                    
                    const jonesName = Formatter.combineAllNameParts(jonesNameParts);
                    const jeremyName = Formatter.combineAllNameParts(jeremyNameParts);

                    this.props.updateName({ jonesName, jeremyName });
                }
                break;
            case FunctionTypes.BOTH.answer:
                if (command && commandRecord && queryRecord) {
                    const jonesNameParts = [command];
                    const jeremyNameParts = [Formatter.jeremyTruncate(command)]

                    jeremyNameParts.push(`${Formatter.jeremyTruncate(commandRecord)}${commandPlural === Binary.TRUE.answer ? 's' : ''}`)
                    jonesNameParts.push(`${commandRecord}${commandPlural === Binary.TRUE.answer ? 's' : ''}`);
                    
                    jonesNameParts.push('and');
                    jeremyNameParts.push('and');

                    jonesNameParts.push('get');
                    jeremyNameParts.push('get');

                    jonesNameParts.push(queryRecord);
                    jeremyNameParts.push(Formatter.jeremyTruncate(queryRecord));

                    if (query) {
                        jonesNameParts.push('by');
                        jonesNameParts.push(`${query}${queryPlural === Binary.TRUE.answer ? 's' : ''}`);
                        jeremyNameParts.push('by');
                        jeremyNameParts.push(`${Formatter.jeremyTruncate(query)}${queryPlural === Binary.TRUE.answer ? 's' : ''}`);
                    }
                    
                    const jonesName = Formatter.combineAllNameParts(jonesNameParts);
                    const jeremyName = Formatter.combineAllNameParts(jeremyNameParts);;
                    this.props.updateName({ jonesName, jeremyName });
                }
                break;
            default:
                this.props.updateName();
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

            { this.state.functionType === FunctionTypes.COMMAND.answer || this.state.functionType === FunctionTypes.BOTH.answer
            ? <fieldset className="form-set">
                <legend>Command Settings</legend>
                <FormInput label="How the data/record is changed (verb)" onUpdate={this.updateCommand}/>
                <FormInput label="The command data/record type (noun)" onUpdate={this.updateCommandRecord}/>
                <FormRadioSet
                    question="Is more than one instance of the record acted on?"
                    identifier="plural-command"
                    answers={Object.values(Binary)}
                    onSelection={this.onSelectCommandPlural}
                />
            </fieldset>
            : ''}
            { this.state.functionType === FunctionTypes.QUERY.answer || this.state.functionType === FunctionTypes.BOTH.answer
            ? <fieldset className="form-set">
                <legend>Query Settings</legend>
                <FormInput label="The query data/record type (noun)" onUpdate={this.updateQueryRecord}/>
                <FormInput label="If not fetching instances of the data/record type, what property are they chosen by?" onUpdate={this.updateQuery}/>
                <FormRadioSet
                    question="Is the property an array or single value?"
                    identifier="plural-query"
                    answers={Object.values(Binary)}
                    onSelection={this.onSelectQueryPlural}
                />
            </fieldset>
            : '' }
         </div>);
         
    }
}
