import React, { Component } from 'react'


const CRYPTO_COMPARE_URL = 'https://www.cryptocompare.com';
const MAX_CHAR_LIM = 10;

export default class DisplayAllCoins extends Component {

    constructor() {
        super();
        this.state = {
            coinList: [],
        }
    }
    getCoinList() {

    }

    componentDidMount() {
        

    }

    getFormattedFullName(fullName) {
        if (fullName.length > MAX_CHAR_LIM) {
            return fullName.slice(0, 11) + "...";
        } else {
            return fullName;
        }
    }

    getPercentChangePerDay(percent) {
        if (percent == 0){
            return (
                <div id="no-change">{percent}%</div>
            )
        } else if (percent > 0) {
            return (
                <div id="positive-change">+{percent}%</div>
            )
        } else {
            return (
                <div id="negative-change">{percent}%</div>
            )
        }
    }
    
    // handleSubmit = (e) => {
    //     e.preventDefault();
    // }
    coinList = () => {
        const {coinData} = this.props;
        let newCoins = []
        for(let coin in coinData) {
            const tempCoin = coinData[coin]['USD']
            const newCoin = {
                ticker: String(coin),
                price: tempCoin['PRICE'],
                image: CRYPTO_COMPARE_URL + tempCoin['IMAGEURL'],
                percentDayChange: tempCoin['CHANGEPCTDAY'],
            }
            newCoins.push(newCoin);
        }
        this.setState({
            coinList: newCoins
        })
        
        const coins = this.state.coinList.map(coin => {
            return (            
                <div className="col s3 center-align" key={coin.ticker}>
                    <div className="card">
                        <div className="card-content">
                            <img src={coin.image} alt={coin.ticker} width="80" height="80"/>

                            <h5>{coin.ticker}</h5>
                            {/* <p>{this.getFormattedFullName(coin.fullName)}</p> */}
                            <div className="percent-day-change">{this.getPercentChangePerDay(coin.percentDayChange)}</div>
                            <h6>{coin.price}</h6>
                        </div>
                        <div className="card-action"><a onClick={this.handleSubmit}>Add...</a></div>

                    </div>
                </div>

            )
        }

        )
        return coins;
    }



    render() {
        return (        
            <div className="market">
                <h4 className="center">Market Overview</h4>
                <i>Note: All prices are in USD. Percent change indicates the change per day.</i>
                <div className="row">
                    {this.coinList()}
                </div>
            </div>
        )
    }
}
