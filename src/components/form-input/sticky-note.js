import React from 'react';
import './silly-effects.css';

export class StickyNote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div className="sticky-note">
            <p className="note"><u>TODO:</u> <br />
            - suggest team names<br />
            - write unit tests<br />
            - add more sparkles<br />
            - not apologize for April Fool's nonsense
            </p>
        </div>)
    }
}