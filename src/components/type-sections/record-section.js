import React from 'react';
import '../form-input/form-input.css';
import { NameSuggestor } from '../../services/name-suggestor';
import { Formatter } from '../../services/formatter';

export class RecordSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.suggest = this.suggest.bind(this);
        // this.buildName = this.buildName.bind(this);
    }

    suggest () {
        const jonesName = Formatter.combineAllNameParts(NameSuggestor.suggestRecordName());
        const jeremyName = Formatter.combineAllNameParts(NameSuggestor.suggestRecordName(2));
        this.props.updateName({ jonesName, jeremyName });
    }

    render() {
        return (<div>
            <br />
            <button
                type="button"
                className="basic-button"
                onClick={() => this.suggest()}>
                    Refresh Suggestion
            </button>
         </div>);
    }
}
