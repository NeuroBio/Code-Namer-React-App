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
        const name = NameSuggestor.suggestRecordName();
        const jonesName = Formatter.combineAllNameParts(name);
        const jeremyName = Formatter.combineAllNameParts([name.pop()]);
        this.setState({ jonesName, jeremyName });
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
