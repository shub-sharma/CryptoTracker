import React, { Component } from 'react'
import DisplayCoins from './DisplayCoins'
import LoadingScreen from './LoadingScreen'
import Portfolio from '../Portfolio'
import axios from 'axios';

export default class Market extends Component {
    _isMounted = false; // Prevent component unmounting errors.
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            coinList: null,
            portfolio: [],
        }
        this.getApiData = this.getApiData.bind(this);
        this.fsyms = '';
        
    }

    componentDidMount() {
        const jsonTopCoins = require('../Top100Coins.json');
        const fsymsArr = []
        const coinArray = []
        for(let i = 0; i < jsonTopCoins.length; i++){
            coinArray.push({
                ticker: jsonTopCoins[i]['symbol'],
                fullName: jsonTopCoins[i]['name'],
            })
            fsymsArr.push(jsonTopCoins[i]['symbol']);
        }
        this._isMounted = true;
        this.setState({coinList: coinArray});
        const fsyms = fsymsArr.join(',');
        this.fsyms = fsyms;
        this.getApiData();
        setInterval(this.getApiData, 10000); // Caching limit is 10s.
    }

    getApiData() {
        const CRYPTO_COMPARE_URL = 'https://www.cryptocompare.com';
        
        const url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + this.fsyms +'&tsyms=USD'
        axios.get(url)
            .then(res => {
                if(this._isMounted) {
                    let coinData = res.data.DISPLAY;
                    const {coinList} = this.state;
                    for(let i = 0; i < coinList.length; i++) {
                        let coin = coinList[i]['ticker'];
                        coinList[i]['price'] = coinData[coin]['USD']['PRICE']
                        coinList[i]['image'] = CRYPTO_COMPARE_URL + coinData[coin]['USD']['IMAGEURL'];
                        coinList[i]['percentDayChange'] = coinData[coin]['USD']['CHANGEPCTDAY'];
                    }
                    this.setState({coinList: coinList, isLoaded: true});
                }



            })
    
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    addToPortfolio = (ticker) => {
        const portfolio = [...this.state.portfolio];
        let isUnique = true;
        for(let i = 0; i < portfolio.length; i++) {
            if(portfolio[i]['ticker'] === ticker) {
                isUnique = false;
            }
        }

        if(isUnique) {
            //coinToAdd is an array containing only (e.g. coinToAdd = [{'name':'BTC'....}]) 
            const foundCoin = this.state.coinList.filter(coin => {
                return coin['ticker'] === ticker
            })
            let coinToAdd = foundCoin[0];
            coinToAdd['coinAmount'] = 1;
            // coinToAdd['usdAmount'] = coinToAdd['price'] * coinToAdd['coinAmount'];
            if(isUnique) {
                let newPortfolio = [...portfolio, coinToAdd];
                this.setState({portfolio: newPortfolio});
            }   
        }
    }

    
    displayData() {
        if(this.state.coinList == null || !this.state.isLoaded) {
            return(<LoadingScreen />)
        } else {
            return(<DisplayCoins addToPortfolio={this.addToPortfolio} coinList={this.state.coinList}/>);
        }
    }
    render() {

        console.log(this.state.portfolio);
        return (
            <>
                <div className="market-overview">
                    {this.displayData()};
                </div>
            </>
        )
    }
}
