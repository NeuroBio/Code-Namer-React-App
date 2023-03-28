import React from 'react';
import { FormRadioSet } from '../form-input/form-radioset';
import { Formatter } from '../../services/formatter';
import { PastaShop } from '../form-input/pasta-shop';
import { PastaChef } from '../../services/pasta-chef';
import { FormInput } from '../form-input/form-input';

const ObjectTypes = {
    INSTANCE: { answer: 'instance of a data/record type' },
    KEYED_LIST: { answer: 'list of records/data keyed by something' },
    OTHER: { answer: 'Some other amalgum of code that includes functions as properties' }
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
        this.props.updateName();
        this.setState({ objectType: selection }, this.buildName);
    }

    updateInstanceRecord (input) {
        this.setState({ instanceRecord: input }, this.buildName);
    }

    updateValueRecord (input) {
        this.setState({ valueRecord: input }, this.buildName);
    }

    updatePasta(input) {
        this.props.updateName({ jonesName: input[0], jeremyName: input[1] });
    }

    updateKeyProperty (input) {
        this.setState({ keyProperty: input }, this.buildName);
    }

    buildName () {
        const {
            objectType,
            instanceRecord,
            valueRecord,
            keyProperty,
        } = this.state;
        switch (objectType) {
            case ObjectTypes.INSTANCE.answer:
                if (instanceRecord) {
                    const jeremyName = Formatter.combineAllNameParts([
                        Formatter.jeremyTruncate(instanceRecord)
                    ]);
                    const jonesName = Formatter.combineAllNameParts([instanceRecord]);
                    this.props.updateName({ jonesName, jeremyName });
                }
                break;
            case ObjectTypes.KEYED_LIST.answer:
                if (valueRecord && keyProperty) {
                    const jeremyName = Formatter.combineAllNameParts([
                        `${ Formatter.jeremyTruncate(valueRecord)}s`, 'keyed', 'by', keyProperty
                    ]);;
                    const jonesName = Formatter.combineAllNameParts([
                        `${valueRecord}s`, 'keyed', 'by', keyProperty
                    ]);
                    this.props.updateName({ jonesName, jeremyName });
                }
                break;
            case ObjectTypes.OTHER.answer:
                this.updatePasta(PastaChef.bakePasta());

                this.updatePasta({
                    jonesName: PastaChef.bakePasta(),
                    jeremyName: PastaChef.bakePasta(),
                });
                break;
            default:
                this.props.updateName();
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

            { this.state.objectType === ObjectTypes.OTHER.answer
            ? <PastaShop
                shopName="Consider making a class instead of making code pasta..."
                updatePasta={this.updatePasta}
                howMany="2"
            /> : ''}
            { this.state.objectType === ObjectTypes.INSTANCE.answer
            ?  <FormInput label="The data/record type (noun)" onUpdate={this.updateInstanceRecord}/>
            : ''}
             { this.state.objectType === ObjectTypes.KEYED_LIST.answer
            ?
            <fieldset>
                <FormInput label="The value data/record type (noun)" onUpdate={this.updateValueRecord}/>
                <FormInput label="The property the values are keyed by (noun)" onUpdate={this.updateKeyProperty}/>
            </fieldset>
            : ''}
         </div>);
    }
}
