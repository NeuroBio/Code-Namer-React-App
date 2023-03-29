import React from 'react';
import './form-input.css';

export class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputRef = React.createRef();
    }

    render() {
        return (<div>
            here {this.props.open}
            <dialog className="dialog" open={this.props.open}>
                <p>
                    {this.props.message}
                </p>
                <div className="button-box">
                    { this.props.buttons.map((button, index) => {
                        return <button
                            key={index}
                            className={button.class}
                            type="button"
                            onClick={button.onClick}>
                                {button.text}
                            </button>
                    })}
                </div>
        </dialog>
        </div>);
    }
}
