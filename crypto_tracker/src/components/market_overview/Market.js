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
            coinHoldings: [],
        }
        this.getApiData = this.getApiData.bind(this);
        this.fsyms = this.fsyms();
    }

    fsyms = () => {
        const cryptocurrencies = require('cryptocurrencies');
        const fsyms = cryptocurrencies.symbols().slice(0, 200).join(',');
        // const fsyms = cryptocurrencies.symbols().join(',');
        console.log(fsyms);
        return fsyms


    }

    componentDidMount() {
        this.getApiData();
        setInterval(this.getApiData, 10000); // Caching limit is 10s.
    }

    // getApiData() {
    //     const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD';
    //     // const url = 'https://min-api.cryptocompare.com/data/all/coinlist/';
    //     const apiKey = 'aff46362b8aef9ef13b86e6eb6c5e55bd01e664ed9cef2b0dffd71d37ae9add0';
    //     const fullURL = url + '&api_key=' + apiKey;
    //     axios.get(fullURL)
    //         .then(res => {
    //             console.log(res.data)
    //             this.setState({
    //                 isLoaded: true,
    //                 coinData: res.data.Data,
                    
    //             })
    //         })
    // } <- Top 100 coins by mktcap

    //Top 300 coins by market cap with a faster cache rate.
    getApiData() {
        // const fsyms = 'BTC,ETH,XRP,BCH,LTC,USDT,BNB'
        
        const url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + this.fsyms +'&tsyms=USD'
        // const url = 'https://min-api.cryptocompare.com/data/all/coinlist/';
        // const apiKey = 'aff46362b8aef9ef13b86e6eb6c5e55bd01e664ed9cef2b0dffd71d37ae9add0';
        // const fullURL = url + '&api_key=' + apiKey;
        axios.get(url)
            .then(res => {
                // console.log(res.data.DISPLAY);
                this.setState({
                    isLoaded: true,
                    coinData: res.data.DISPLAY,
                    
                })
            })
    }





    addCrypto = (ticker, coinName, amountOfCoin, initialAmountBoughtWith) => {
        // const coinholdings = this.state.coinHoldings.filter() 
    }

    
    displayData() {
        if(!this.state.coinData || !this.state.isLoaded) {
            return(<LoadingScreen />)
        } else {
            return(<DisplayCoins addCrypto={this.addCrypto} coinData={this.state.coinData}/>);
        }
    }
    render() {
        return (
            <>
                <div className="market-overview">
                    {this.displayData()};
                </div>
            </>
        )
    }
}
