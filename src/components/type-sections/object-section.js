import React from 'react';
import { FormRadioSet } from '../form-input/form-radioset';
import { PastaShop } from '../form-input/pasta-shop';
import { PastaChef } from '../../services/pasta-chef';
import { FormInput } from '../form-input/form-input';

const ObjectTypes = {
    INSTANCE: 'instance of a data/record type',
    KEYED_LIST: 'list of records/data keyed by something',
    OTHER: 'Some other amalgum of code that includes functions as properties'
}

export class ObjectSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onSelectType = this.onSelectType.bind(this);
        this.buildName = this.buildName.bind(this);

        this.updatePasta = this.updatePasta.bind(this);
    }

    onSelectType (selection) {
        this.setState({ objectType: selection }, this.buildName);
    }

    updateInstanceRecord (input) {
        this.setState({ instanceRecord: input }, this.buildName);
    }

    updatePasta(pasta) {
        this.props.updateName(pasta);
    }

    buildName () {
        const { objectType } = this.state;
        switch (objectType) {
            case ObjectTypes.INSTANCE:
                break;
            case ObjectTypes.KEYED_LIST:
                break;
            case ObjectTypes.OTHER:
                this.updatePasta(PastaChef.bakePasta());
                break;
            default:
                break;
        }
    }

    render() {
        return (<div>
            <FormRadioSet
                question="The object is:"
                identifier="function-type"
                answers={Object.values(ObjectTypes)}
                onSelection={this.onSelectType}
            />

            { this.state.objectType === ObjectTypes.OTHER
            ? <PastaShop
                shopName="Consider making a class instead..."
                updatePasta={this.updatePasta}
            /> : ''}
            { this.state.functionType === ObjectTypes.INSTANCE
            ?  <FormInput label="The data/record type (noun)" onUpdate={this.updateInstanceRecord}/>
            : ''}
             { this.state.functionType === ObjectTypes.KEYED_LIST
            ? <p>Consider making a class instead...</p>
            : ''}
         </div>);
    }
}
