import React from 'react';
import './tooltip.css';
import { IoMdHelpCircle } from 'react-icons/io';

let timeout;
export class ToolTip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

        this.showTip = this.showTip.bind(this);
        this.hideTip = this.hideTip.bind(this);
    }
  
    showTip () {
      timeout = setTimeout(() => {
        this.setState({ active: true });
      }, this.props.delay || 400);
    };
  
    hideTip () {
      clearInterval(timeout);
      this.setState({ active: false });
    };



    render() {
        return (<div
                className="Tooltip-Wrapper"
                onMouseEnter={this.showTip}
                onMouseLeave={this.hideTip}>
                {this.props.help ? <IoMdHelpCircle className="add-space" /> : ''}
                {this.state.active && (
                <div className={`Tooltip-Tip ${this.props.direction || "right"}`}>
                    {this.props.help}
                </div>
                )}
            </div>);
    }
}
