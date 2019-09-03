import React, { Component } from 'react'
import DisplayCoins from './DisplayCoins'
import LoadingScreen from './LoadingScreen'
import axios from 'axios';

export default class Market extends Component {
    _isMounted = false;
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

    /* Extract the info from the api and place it in this.state.coinList for rendering
     *
     */
    getApiData() {
        /* Build a list of all 100 coins and make an array of objects like so {'BTC': {fullName: 'Bitcoin'}, 'ETH': {fullName: 'Ethereum'}}} etc.
         * I'll get all the keys and turn them into a string like so: 'BTC,ETH,LTC' etc. and append it to tsyms. This is all done in seperate function
         and is this class's property.
         */

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
        const coinToAdd = this.state.coinList.filter(coin => {
            return coin['ticker'] === ticker
        })
        // console.log(coinToAdd);
        let isUnique = true;
        const {prevPortfolio} = this.state.portfolio;
        if(isUnique) {
            let newPortfolio = [...this.state.portfolio, coinToAdd[0]];
            this.setState({portfolio: newPortfolio});
        }




        
    }

    
    displayData() {
        if(this.state.coinList == null || !this.state.isLoaded) {
            return(<LoadingScreen />)
        } else {
            // console.log(this.state.coinList);
            return(<DisplayCoins addToPortfolio={this.addToPortfolio} coinList={this.state.coinList}/>);
        }
    }
    render() {

        // console.log(this.state.portfolio);
        return (
            <>
                <div className="market-overview">
                    {this.displayData()};
                </div>
            </>
        )
    }
}
