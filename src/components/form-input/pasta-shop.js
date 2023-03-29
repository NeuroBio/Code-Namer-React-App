import React from 'react';
import './form-input.css';
import { IoMdRefresh } from 'react-icons/io';
import { PastaChef } from '../../services/pasta-chef';
import { FormDialog } from './form-dialog';

let timeout;
export class PastaShop extends React.Component {
    constructor(props) {
        super(props);

        this.onPastaRefresh = this.onPastaRefresh.bind(this);
        this.limitPasta = this.limitPasta.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);

        this.state = {
            orderCount: 0,
            DialogButtons: [
                { class: "basic-button", onClick: this.onCloseClick, text: 'Okay :(' },
                { class: "angry-button", text: 'NOT OKAY >:(' },
            ]
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

    onCloseClick() {
        this.setState({ tooMuchPasta: false });
    }

    render() {
        return (<article>
            <FormDialog
                open={this.state.tooMuchPasta}
                message="THE CHEF CAN ONLY MAKE SO MUCH PASTA OKAY!!??"
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
