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
        const { record } = this.state;
        if (record) {
            const jeremyName = Formatter.combineAllNameParts([
                Formatter.toPlural(Formatter.jeremyTruncate(record)),
            ]);
            const jonesName = Formatter.combineAllNameParts([ Formatter.toPlural(record) ]);
            this.props.updateName({ jonesName, jeremyName });
        } else{
            this.props.updateName();
        }
    }

    render() {
        return (<div>
            <FormInput label="The data/record type the array holds (noun)" onUpdate={this.updateRecord}/>
         </div>);
    }
}
