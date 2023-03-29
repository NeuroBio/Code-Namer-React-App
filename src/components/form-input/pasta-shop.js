import React from 'react';
import './form-input.css';
import { IoMdRefresh } from 'react-icons/io';
import { PastaChef } from '../../services/pasta-chef';
import { FormDialog } from './form-dialog';

let timeout;
const MessagesFromTheChef = {
    0: 'THE CHEF CAN ONLY MAKE SO MUCH PASTA OKAY!!??',
    1: 'The chef does not care.',
    5: 'The chef continues not to care.',
    10: 'Your discontented actions remain futile.',
    25: '',
    40: 'Oh... Are you still here?',
    70: 'Are you aware that you clicked that button at least 70 times?  Are you also aware that the most addictive schedule for positive reinforcement is "variable ratio," where a reward is given after a changing number of responses.  If I say this is the last message, will you believe me, or will you keep clicking, believing that I am lying and there is a further reward at a higher click increment?  The experiment begins.'
}
export class PastaShop extends React.Component {
    constructor(props) {
        super(props);

        this.onPastaRefresh = this.onPastaRefresh.bind(this);
        this.limitPasta = this.limitPasta.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onDesparation = this.onDesparation.bind(this);
        this.chefMessage = this.chefMessage.bind(this);

        this.state = {
            orderCount: 0,
            messageClicks: 0,
            DialogButtons: [
                { text: 'Okay :(', onClick: this.onCloseClick },
                { text: 'NOT OKAY >:(', onClick: this.onDesparation, class: "angry-button" },
            ],
        };
    }

    onPastaRefresh() {
        const pasta = [];
        for (let i = 0; i < this.props.howMany; i++) {
            pasta.push(PastaChef.bakePasta());
        }
        this.props.updatePasta(pasta);
        this.limitPasta();
    }

    limitPasta () {
        let orderCount = this.state.orderCount;
        orderCount += 1;
        clearInterval(timeout);
        timeout = setTimeout(() => {
            this.setState({ orderCount: 0 });
        }, 400);
        
        if (orderCount > 5) {
            this.setState({ tooMuchPasta: true });
        } else {
            this.setState({ orderCount });
        }
    };

    onCloseClick () {
        this.setState({
            tooMuchPasta: false,
            messageClicks: 0,
        });
    }

    onDesparation () {
        let messageClicks = this.state.messageClicks
        messageClicks += 1;
        this.setState({ messageClicks });
    }

    chefMessage() {
        const messageClicks = this.state.messageClicks
        const intervals = Object.keys(MessagesFromTheChef);
        let key;
        for (const interval of intervals) {
            if (interval <= messageClicks) {
                key = interval;
            } else {
                break;
            }
        }

        
        return MessagesFromTheChef[key];
    }

    render() {
        return (<article>
            <FormDialog
                open={this.state.tooMuchPasta}
                message={this.chefMessage()}
                buttons={this.state.DialogButtons}
            />

           <p>{this.props.shopName}</p>
           <button
                type="button"
                disabled={this.state.tooMuchPasta}
                className="basic-button"
                onClick={this.onPastaRefresh}>
                <IoMdRefresh />  Refresh Pasta
            </button>
        </article>);
    }
}
