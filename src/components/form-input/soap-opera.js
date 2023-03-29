import React from 'react';
import { FormDialog } from './form-dialog';

const Scenes = {
    BEGIN: 'Begin'
};
export class SoapOpera extends React.Component {
    constructor(props) {
        super(props);

        this.changeScene = this.changeScene.bind(this);

        this.state = {
            Scenes: [
                {
                  name: Scenes.BEGIN,
                  message: 'I can’t believe you would disrespect me in public like this. Sometimes I feel like you’re not really serious about the principles of domain driven design… You do care, don’t you?',
                  buttons: [
                    {
                        text: 'Of course, darling!  But this function has to be a command query.',
                        onClick: () => {}
                    }, {
                        text: 'lol no',
                        onClick: () => {},
                    },
                  ],  
                }                
            ],
        }
    }

    changeScene (input) {
        this.setState({ currentScene: input })
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
                onClick={() => this.changeScene(Scenes.BEGIN)}>
                    SHAME THE REPO ANYWAY
            </button>
        </div>);
    }
}