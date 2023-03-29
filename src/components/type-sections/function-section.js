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

        this.onSelectQueryRepo = this.onSelectQueryRepo.bind(this);
        this.updateQueryRecord = this.updateQueryRecord.bind(this);
        this.onSelectQueryRecordPlural = this.onSelectQueryRecordPlural.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.onSelectQueryPropertyPlural = this.onSelectQueryPropertyPlural.bind(this);

        this.buildName = this.buildName.bind(this);

        this.unacceptable = this.unacceptable.bind(this);
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

    onSelectQueryRepo(selection) {
        this.setState({ queryRepo: selection }, this.buildName);
    }
    updateQueryRecord(input) {
        this.setState({ queryRecord: input }, this.buildName);
    }
    onSelectQueryRecordPlural(selection) {
        this.setState({ queryRecordPlural: selection }, this.buildName);
    }
    updateQuery (input) {
        this.setState({ query: input }, this.buildName);
    }
    onSelectQueryPropertyPlural (selection) {
        this.setState({ queryPropertyPlural: selection }, this.buildName);
    }

    unacceptable() {
        return (this.state.functionType === FunctionTypes.BOTH.answer
            && this.state.queryRepo === Binary.TRUE.answer);
    }

    buildName () {
        if (this.unacceptable) {
            const message = 'For Shame';
            this.props.updateName({ jonesName: message, jeremyName: message });
        }
        const {
            command,
            commandRecord,
            commandPlural,
            queryRepo,
            query,
            queryRecord,
            queryRecordPlural,
            queryPropertyPlural,
        } = this.state;
        switch (this.state.functionType) {
            case FunctionTypes.COMMAND.answer:
                if (command && commandRecord) {
                    const jeremyNameParts = [Formatter.jeremyTruncate(command)];
                    const jonesNameParts = [command];

                    jeremyNameParts.push(commandPlural === Binary.TRUE.answer
                        ? Formatter.toPlural(Formatter.jeremyTruncate(commandRecord))
                        : Formatter.jeremyTruncate(commandRecord))
                    jonesNameParts.push(commandPlural === Binary.TRUE.answer
                        ? Formatter.toPlural(commandRecord)
                        : commandRecord);

                    const jonesName = Formatter.combineAllNameParts(jonesNameParts);
                    const jeremyName = Formatter.combineAllNameParts(jeremyNameParts);

                    this.props.updateName({ jonesName, jeremyName });
                }
                break;
            case FunctionTypes.QUERY.answer:
                if (queryRecord || (queryRepo === Binary.TRUE.answer && query)) {
                    const verb = queryRepo === Binary.TRUE.answer ? 'find' : 'get'
                    const jonesNameParts = [ verb ];
                    const jeremyNameParts = [ verb ];
                    
                    if (queryRepo !== Binary.TRUE.answer) {
                        jeremyNameParts.push(queryRecordPlural === Binary.TRUE.answer
                            ? Formatter.toPlural(Formatter.jeremyTruncate(queryRecord))
                            : Formatter.jeremyTruncate(queryRecord))
                        jonesNameParts.push(queryRecordPlural === Binary.TRUE.answer
                            ? Formatter.toPlural(queryRecord)
                            : queryRecord);    
                    }

                    if (query) {
                        jonesNameParts.push('by');
                        // jonesNameParts.push(`${query}${queryPropertyPlural === Binary.TRUE.answer ? 's' : ''}`);
                        jeremyNameParts.push('by');
                        // jeremyNameParts.push(`${Formatter.jeremyTruncate(query)}${queryPropertyPlural === Binary.TRUE.answer ? 's' : ''}`);
                        jeremyNameParts.push(queryPropertyPlural === Binary.TRUE.answer
                            ? Formatter.toPlural(Formatter.jeremyTruncate(query))
                            : Formatter.jeremyTruncate(query))
                        jonesNameParts.push(queryPropertyPlural === Binary.TRUE.answer
                            ? Formatter.toPlural(query)
                            : query);
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

                    jeremyNameParts.push(commandPlural === Binary.TRUE.answer
                        ? Formatter.toPlural(Formatter.jeremyTruncate(commandRecord))
                        : Formatter.jeremyTruncate(commandRecord))
                    jonesNameParts.push(commandPlural === Binary.TRUE.answer
                        ? Formatter.toPlural(commandRecord)
                        : commandRecord);
                    
                    jonesNameParts.push('and');
                    jeremyNameParts.push('and');

                    jonesNameParts.push('get');
                    jeremyNameParts.push('get');

                    jonesNameParts.push(queryRecord);
                    jeremyNameParts.push(Formatter.jeremyTruncate(queryRecord));

                    if (query) {
                        jonesNameParts.push('by');
                        jeremyNameParts.push('by');

                        jeremyNameParts.push(queryPropertyPlural === Binary.TRUE.answer
                            ? Formatter.toPlural(Formatter.jeremyTruncate(query))
                            : Formatter.jeremyTruncate(query))
                        jonesNameParts.push(queryPropertyPlural === Binary.TRUE.answer
                            ? Formatter.toPlural(query)
                            : query);
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

            { (this.state.functionType === FunctionTypes.COMMAND.answer || this.state.functionType === FunctionTypes.BOTH.answer)
                && !this.unacceptable()
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
                <FormRadioSet
                    question="Is this function in a repo?"
                    identifier="query-repo"
                    answers={Object.values(Binary)}
                    onSelection={this.onSelectQueryRepo}
                />
                {   this.state.queryRepo !== Binary.TRUE.answer
                    ? <FormInput label="The query data/record type (noun)" onUpdate={this.updateQueryRecord}/>
                    : ''
                }
                {   this.state.queryRepo !== Binary.TRUE.answer
                    ? <FormRadioSet
                        question="Can it return multiple data/records?"
                        identifier="plural-query-record"
                        answers={Object.values(Binary)}
                        onSelection={this.onSelectQueryRecordPlural}
                    /> : ''
                }
                {   this.unacceptable()
                    ? ''
                    : <FormInput label="If not fetching instances of the data/record type, what property are they chosen by?" onUpdate={this.updateQuery}/>
                }
                {   this.unacceptable()
                    ? ''
                    : <FormRadioSet
                        question="Is the property an array or single value?"
                        identifier="plural-query-property"
                        answers={Object.values(Binary)}
                        onSelection={this.onSelectQueryPropertyPlural}
                     />
                }
                {   this.unacceptable()
                ? <p>
                    Why would you do this to the Repo?<br />
                    You bring <b>shame</b> to the proud Repo.
                    </p>
                : ''
                }
            </fieldset>
            : '' }
         </div>);
         
    }
}
