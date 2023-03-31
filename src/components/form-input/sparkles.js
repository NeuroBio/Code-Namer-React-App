import React from 'react';
import './starshine.css';
import { SillyEffects } from '../../services/silly-effects';

export class Sparkles extends React.Component {

    render() {
        return (<div id="starshine">
            {[...Array(this.props.stars)].map((_, i) => {
                return <div
                    key={i}
                    className={`shine ${SillyEffects.getStarSize()}`}
                    style={SillyEffects.getStarStyle()}
                ></div>
            })}
        </div>)
    }
}