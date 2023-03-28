import React from 'react';
import { Formatter } from '../../services/formatter';
import { FormInput } from '../form-input/form-input';

export class ArraySection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.updateRecord = this.updateRecord.bind(this);
        this.buildName = this.buildName.bind(this);
    }

    updateRecord (input) {
        this.setState({ record: input }, this.buildName);
    }

    buildName () {
        if (this.state.record) {
            const suggestedName = Formatter.combineAllNameParts([ `${this.state.record}s`]);
            this.props.updateName(suggestedName);
        } else{
            this.props.updateName('');
        }
    }

    render() {
        return (<div>
            <FormInput label="The data/record type the array holds (noun)" onUpdate={this.updateRecord}/>
         </div>);
    }
}
