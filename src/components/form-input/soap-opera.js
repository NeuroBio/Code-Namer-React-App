import React from 'react';
import { FormDialog } from './form-dialog';

const Scenes = {
    BEGIN: 'Begin',
    DENIAL: 'Denial',
    DISRESPECT: 'Disrespect',
    GUILT: 'Guilt',
    ACCEPT: 'accept',
    CEO: 'CEO',
    DOGS: 'Dogs',
    JERK: 'Jerk',
    LAWYER: 'Lawyer',
    CLUB: 'Club',
};
export class SoapOpera extends React.Component {
    constructor(props) {
        super(props);

        this.changeScene = this.changeScene.bind(this);

        const Restart = [
            {
                text: 'Again, again, again!!!',
                onClick: () => this.changeScene(Scenes.BEGIN),
            }, {
                text: 'Okay, I’ve learned my lesson.  Now, get me out of this mad house!',
                onClick: () => {},
            },
          ]
        this.state = {
            Scenes: [
                {
                  name: Scenes.BEGIN,
                  message: 'I can’t believe you would disrespect me in public like this. Sometimes I feel like you’re not really serious about the principles of domain driven design... You do care, don’t you?',
                  buttons: [
                    {
                        text: 'Of course, darling!  But this function has to be a command query.',
                        onClick: () => this.changeScene(Scenes.DENIAL),
                    }, {
                        text: 'lol no',
                        onClick: () => this.changeScene(Scenes.DISRESPECT),
                    },
                  ],  
                }, {
                    name: Scenes.DENIAL,
                    message: 'Don’t you remember our agreement?  You would take care of the business in your domain objects and services and I would pick up our record children from database daycare.',
                    buttons: [
                      {
                          text: 'Of course, darling!  But this function has to be a command query.',
                          onClick: () => this.changeScene(Scenes.GUILT),
                      }, {
                          text: 'I was actually hoping to retire.  You can handle the business AND the record kids, right?',
                          onClick: () => this.changeScene(Scenes.DOGS),
                      },
                    ],  
                }, {
                    name: Scenes.DISRESPECT,
                    message: '"No?"  "No?!?!"  Were all your romantic promises about clean code and a ubiquitous language just a lie?!',
                    buttons: [
                      {
                          text: 'Pretty much.',
                          onClick: () => this.changeScene(Scenes.JERK),
                      }, {
                          text: 'Honey, I just googled some radical, coding pick-up lines. I have no idea what those words even mean.',
                          onClick: () => this.changeScene(Scenes.CLUB),
                      },
                    ],  
                }, {
                    name: Scenes.GUILT,
                    message: 'No, I wan’t compromise.  This was our deal. Our wedding vow!  I will not take your on business responsibilities.',
                    buttons: [
                      {
                          text: '*sigh* You’re right as always. Can you ever forgive me?',
                          onClick: () => this.changeScene(Scenes.ACCEPT),
                      }, {
                          text: '*continue arguing to prove you are right*',
                          onClick: () => this.changeScene(Scenes.CEO),
                      },
                    ],  
                }, {
                    name: Scenes.ACCEPT,
                    message: 'Repo forgave you and you moved your business code back into domain objects and services where it belongs. The product scaled beautifully, and your small family of several hundred records grew into the trillions.',
                    buttons: Restart,  
                }, {
                    name: Scenes.CEO,
                    message: 'You and Repo realized that you had irreconcilable differences and got amicably divorced.  Now, your business code is deeply in code debt from paying alimony to Repo.  Repo remarried to that tech start-up CEO you hate.  Repo now manages billions of records with ease, and CEO is a gajillionaire.',
                    buttons: Restart,  
                }, {
                    name: Scenes.DOGS,
                    message: '...we’re getting a divorce. And I’m taking all the dogs with me.',
                    buttons: Restart,  
                }, {
                    name: Scenes.CLUB,
                    message: 'That’s it.  I’m signing us up for developer book club, so we can teach you have to treat me properly!',
                    buttons: Restart,  
                }, {
                    name: Scenes.JERK,
                    message: '...How did I not see this before?  How did I get married to... to...!!  A BAD CODER?!',
                    buttons: [
                      {
                          text: 'I’m a great coder.  I just don’t believe in the domain driven design hoax.',
                          onClick: () => this.changeScene(Scenes.LAWYER),
                      }, {
                          text: 'I think it was my good looks and syntactic sugar that won you over.',
                          onClick: () => this.changeScene(Scenes.LAWYER),
                      },
                    ],  
                }, {
                    name: Scenes.LAWYER,
                    message: '*takes off the wedding ring and throws it at you* You can take that back! Pawn it off!!!  Best enjoy your debt free life while it lasts... Once my Domain service lawyer is done with you, you’ll be eating spaghetti code until the day you die!',
                    buttons: Restart,  
                },         
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