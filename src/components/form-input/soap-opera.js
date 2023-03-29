import React from 'react';
import { FormDialog } from './form-dialog';

const Scenes = {
    BEGIN: 'Begin'
};
export class SoapOpera extends React.Component {
    constructor(props) {
        super(props);

        this.startProgram = this.startProgram.bind(this);

        this.state = {
            Scenes: [
                {
                  name: Scenes.BEGIN,
                  message: 'test',
                  buttons: [],  
                }                
            ],
        }
    }

    startProgram () {

    }

    render () {
        return(<div>
            { this.state.Scenes.map((scene, index) => {
                return <FormDialog
                key={index}
                open={this.state.currentScene === scene.name}
                message={scene.message}
                buttons={scene.buttons}
            />
            })}
            

           <button
                type="button"
                className="basic-button"
                onClick={this.startProgram}>
                    SHAME THE REPO ANYWAY
            </button>
        </div>);
    }
}