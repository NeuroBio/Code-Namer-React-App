import React from 'react';
import './form-input.css';
import { IoMdRefresh } from 'react-icons/io';
import { PastaChef } from '../../services/pasta-chef';

let timeout;
export class PastaShop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderCount : 0,
        };
        this.onPastaRefresh = this.onPastaRefresh.bind(this);
        this.limitPasta = this.limitPasta.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
    }

    onPastaRefresh() {
        this.props.updatePasta(PastaChef.bakePasta());
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
            <dialog className="dialog" open={this.state.tooMuchPasta}>
                <p>
                    THE CHEF CAN ONLY MAKE SO MUCH PASTA OKAY!!??
                </p>
                <div className="button-box">
                    <button className="basic-button" type="button" onClick={this.onCloseClick}>Okay :(</button>
                    <button className="angry-button" type="a-massive-lie">NOT OKAY &gt;:(</button>
                </div>
            </dialog>

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
