import React from 'react';
import './silly-effects.css';
import { SillyEffects } from '../../services/silly-effects';

export class Sparkles extends React.Component {

    constructor(props) {
        super(props);

        const stars = [...Array(this.props.stars)].map((_, i) => {
            return <div
                key={i}
                className={`shine ${SillyEffects.getStarSize()}`}
                style={SillyEffects.getStarStyle()}
            ></div>
        })
        this.state = {
            stars,
        };
    }

    render() {
        return (<div className="overlay-screen">
            {this.state.stars}
        </div>)
    }
}