import React from 'react';
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
           <button onClick={this.onPastaRefresh}>Refresh Pasta</button>
        </article>);
    }
}
