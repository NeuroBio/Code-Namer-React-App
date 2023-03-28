import React from 'react';
import { Formatter } from '../../services/formatter';
import { FormRadioSet } from '../form-input/form-radioset';
import { FormInput } from '../form-input/form-input';

const ClassTypes = {
    REPO: { answer: 'Repo' , help: 'Stores common, reusable queries for a record type' },
    FACTORY: { answer: 'Factory', help: 'Creates generic instances of an entity or value object type' },
    INTERFACE: {answer: 'Interface', help: 'Defines an objects properties and their types.  Typically used to support consitent obejct formatting for repos and factories. '},
    FUNCTION: { answer: 'Client Application Service', help: 'Serves as an interface between a SMART-Flow and the business code' },
    ADAPTOR: { answer: 'Other Application Service', help: 'Serves as an interface between domain objects (entities/value objects) and non-domain objects (e.g. repos)'},
    VALUE_OBJECT: { answer: 'Value Object', help: 'A domain object instance without an identity.  It is immutable.  It is "updated" by replacing it with a modified copy.' },
    ENTITY: { answer: 'Entity', help: 'A domain object instance that has a unique identity.  It cannnot be updated by full replacement, because that would change its identity.  It must be updated atomically instead. (We have very few of these)' },
    BUSINESS: { answer: 'Domain Service', help: 'a set of related business code that does not belong to a single an entity nor value object.' },
}
export class ClassSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onSelectType = this.onSelectType.bind(this);

        this.updateRepoRecord = this.updateRepoRecord.bind(this);
        this.updateFactoryRecord = this.updateFactoryRecord.bind(this);
        this.updateInterfaceRecord = this.updateInterfaceRecord.bind(this);
        this.updateSmartFlow = this.updateSmartFlow.bind(this);
        this.updateAdaptor = this.updateAdaptor.bind(this);
        this.updateValueRecord = this.updateValueRecord.bind(this);
        this.updateEntityRecord = this.updateEntityRecord.bind(this);
        this.updateBusinessRecord = this.updateBusinessRecord.bind(this);

        this.buildName = this.buildName.bind(this);
    }

    onSelectType (selection) {
        this.props.updateName('');
        this.setState({ classType: selection }, this.buildName);
    }

    updateRepoRecord (input) {
        this.setState({ repoRecord: input }, this.buildName);
    }

    updateFactoryRecord (input) {
        this.setState({ factoryRecord: input }, this.buildName);
    }

    updateInterfaceRecord (input) {
        this.setState({ interfaceRecord: input }, this.buildName);
    }

    updateSmartFlow (input) {
        this.setState({ smartFlow: input }, this.buildName);
    }

    updateAdaptor (input) {
        this.setState({ adaptorRecord: input }, this.buildName);
    }

    updateValueRecord (input) {
        this.setState({ valueRecord: input }, this.buildName);
    }

    updateEntityRecord (input) {
        this.setState({ entityRecord: input }, this.buildName);
    }

    updateBusinessRecord (input) {
        this.setState({ buisinessRecord: input }, this.buildName);
    }

    buildName () {
        const {
            classType,
            repoRecord,
            factoryRecord,
            interfaceRecord,
            smartFlow,
            adaptorRecord,
            valueRecord,
            entityRecord,
            buisinessRecord
        } = this.state;
        switch (classType) {
            case ClassTypes.REPO.answer:
                if (repoRecord) {
                    const suggestedName = Formatter.combineAllNamePartsForClass([ repoRecord, 'repo' ]);
                    this.props.updateName(suggestedName);
                }
                break;
            case ClassTypes.FACTORY.answer:
                if (factoryRecord) {
                    const suggestedName = Formatter.combineAllNamePartsForClass([ factoryRecord, 'factory' ]);
                    this.props.updateName(suggestedName);
                }
                break;
            case ClassTypes.INTERFACE.answer:
                if (interfaceRecord) {
                    const suggestedName = Formatter.combineAllNamePartsForClass([ interfaceRecord ]);
                    this.props.updateName(suggestedName);
                }
                break;
            case ClassTypes.FUNCTION.answer:
                if (smartFlow) {
                    const suggestedName = Formatter.combineAllNamePartsForClass([ smartFlow ]);
                    this.props.updateName(suggestedName);
                }
                break;
            case ClassTypes.ADAPTOR.answer:
                if (adaptorRecord) {
                    const suggestedName = Formatter.combineAllNamePartsForClass([ adaptorRecord, 'Service' ]);
                    this.props.updateName(suggestedName);
                }
                break;
            case ClassTypes.VALUE_OBJECT.answer:
                if (valueRecord) {
                    const suggestedName = Formatter.combineAllNamePartsForClass([ valueRecord ]);
                    this.props.updateName(suggestedName);
                }
                break;
            case ClassTypes.ENTITY.answer:
                if (entityRecord) {
                    const suggestedName = Formatter.combineAllNamePartsForClass([ entityRecord ]);
                    this.props.updateName(suggestedName);
                }
                break;
            case ClassTypes.BUSINESS.answer:
                if (buisinessRecord) {
                    const suggestedName = Formatter.combineAllNamePartsForClass([ buisinessRecord ]);
                    this.props.updateName(suggestedName);
                }
                break;
            default:
                this.props.updateName('');
                break;
        }
    };

    render() {
        return (<div>
            <FormRadioSet
                question="The purpose of this class:"
                identifier="class-type"
                answers={Object.values(ClassTypes)}
                onSelection={this.onSelectType}
            />

            { this.state.classType === ClassTypes.REPO.answer
            ? <FormInput label="The queried data/record type (noun)" onUpdate={this.updateRepoRecord}/> : ''}
            { this.state.classType === ClassTypes.FACTORY.answer
            ? <FormInput label="The created data/record type (noun)" onUpdate={this.updateFactoryRecord}/> : ''}
             { this.state.classType === ClassTypes.INTERFACE.answer
            ? <FormInput label="The defined data/record type (noun)" onUpdate={this.updateInterfaceRecord}/> : ''}
            { this.state.classType === ClassTypes.FUNCTION.answer
            ? <FormInput label="The SMART-Flow using this service" onUpdate={this.updateSmartFlow}/> : ''}
            { this.state.classType === ClassTypes.ADAPTOR.answer
            ? <FormInput label="The data/record this service provides an interface for (noun)" onUpdate={this.updateAdaptor}/> : ''}
            { this.state.classType === ClassTypes.VALUE_OBJECT.answer
            ? <FormInput label="The data/record type being modeled (noun)" onUpdate={this.updateValueRecord}/> : ''}
            { this.state.classType === ClassTypes.ENTITY.answer
            ? <FormInput label="The data/record type being modeled (noun)" onUpdate={this.updateEntityRecord}/> : ''}
            { this.state.classType === ClassTypes.BUSINESS.answer
            ? <FormInput label="The function business area uniting the code (noun)" onUpdate={this.updateBusinessRecord}/> : ''}
         </div>);
    }
}
