import React from 'react';
import { FormRadioSet } from '../form-input/form-radioset';
import { Formatter } from '../../services/formatter';
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
        this.updateInstanceRecord = this.updateInstanceRecord.bind(this);

        this.updateKeyProperty = this.updateKeyProperty.bind(this);

        this.updatePasta = this.updatePasta.bind(this);
        this.updateValueRecord = this.updateValueRecord.bind(this);

        this.buildName = this.buildName.bind(this);

    }

    onSelectType (selection) {
        this.setState({ objectType: selection }, this.buildName);
    }

    updateInstanceRecord (input) {
        this.setState({ instanceRecord: input }, this.buildName);
    }

    updateValueRecord (input) {
        this.setState({ valueRecord: input }, this.buildName);
    }

    updateKeyProperty (input) {
        this.setState({ keyProperty: input }, this.buildName);
    }

    updatePasta(pasta) {
        this.props.updateName(pasta);
    }

    buildName () {
        const {
            objectType,
            instanceRecord,
            valueRecord,
            keyProperty,
        } = this.state;
        switch (objectType) {
            case ObjectTypes.INSTANCE:
                if (instanceRecord) {
                    const suggestedName = Formatter.combineAllNameParts([instanceRecord]);
                    this.props.updateName(suggestedName);
                }
                break;
            case ObjectTypes.KEYED_LIST:
                if (valueRecord && keyProperty) {
                    const nameParts = [`${valueRecord}s`, 'keyed', 'by', keyProperty];
                    const suggestedName = Formatter.combineAllNameParts(nameParts);
                    this.props.updateName(suggestedName);
                }
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
                identifier="object-type"
                answers={Object.values(ObjectTypes)}
                onSelection={this.onSelectType}
            />

            { this.state.objectType === ObjectTypes.OTHER
            ? <PastaShop
                shopName="Consider making a class instead..."
                updatePasta={this.updatePasta}
            /> : ''}
            { this.state.objectType === ObjectTypes.INSTANCE
            ?  <FormInput label="The data/record type (noun)" onUpdate={this.updateInstanceRecord}/>
            : ''}
             { this.state.objectType === ObjectTypes.KEYED_LIST
            ?
            <fieldset>
                <FormInput label="The value data/record type (noun)" onUpdate={this.updateValueRecord}/>
                <FormInput label="The property the values are keyed by (noun)" onUpdate={this.updateKeyProperty}/>
            </fieldset>
            : ''}
         </div>);
    }
}
