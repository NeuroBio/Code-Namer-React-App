import React from 'react';
import './form-input.css';
import { IoMdRefresh } from 'react-icons/io';
import { PastaChef } from '../../services/pasta-chef';

export class PastaShop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onPastaRefresh = this.onPastaRefresh.bind(this);
    }

    onPastaRefresh() {
        this.props.updatePasta(PastaChef.bakePasta());
    }

    render() {
        return (<article>
           <p>{this.props.shopName}</p>
           <button
                type="button"
                className="basic-button"
                onClick={this.onPastaRefresh}>
                <IoMdRefresh />  Refresh Pasta
            </button>
        </article>);
    }
}
