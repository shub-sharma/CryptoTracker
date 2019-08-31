import React, { Component } from 'react'
import DisplayCoins from './DisplayCoins'
import LoadingScreen from './LoadingScreen'
import axios from 'axios';
export default class Market extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            coinData: null,
        }
        this.getApiData = this.getApiData.bind(this);
    }


//


    componentDidMount() {
        this.getApiData();
        setInterval(this.getApiData, 120000); // Caching limit is 120s.


    }

    getApiData() {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD';
        const apiKey = 'aff46362b8aef9ef13b86e6eb6c5e55bd01e664ed9cef2b0dffd71d37ae9add0';
        const fullURL = url + '&api_key=' + apiKey;
        let coinData = null;
        axios.get(fullURL)
            .then(res => {
                this.setState({
                    isLoaded: true,
                    coinData: res.data.Data,
                    
                })
            })

    



    }

    render() {
        return (
            <div>
                <div>
                    {!this.state.coinData ? (
                    <LoadingScreen />
                     ) : ( 
                    <DisplayCoins coinData={this.state.coinData}/>
                     )}
                </div>
            </div>
        )
    }
}
