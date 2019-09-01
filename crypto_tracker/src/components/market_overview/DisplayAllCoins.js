import React, { Component } from 'react'


const CRYPTO_COMPARE_URL = 'https://www.cryptocompare.com';
const MAX_CHAR_LIM = 15;

export default class DisplayAllCoins extends Component {

    constructor() {
        super();
        this.state = {
            coins: null,
        }
    }

    componentDidMount() {
        const coinData = this.props.coinData;
        const newCoins = coinData.map((coin) => {
            const imageURL = CRYPTO_COMPARE_URL + coin.CoinInfo.ImageUrl;
            // console.log(imageURL);
            return {
                ticker: coin.CoinInfo.Name,
                fullName: coin.CoinInfo.FullName,
                price: coin.DISPLAY.USD.PRICE,
                image: imageURL,
                percentDayChange: coin.DISPLAY.USD.CHANGEPCTDAY,
            }
        })
        this.setState({...this.state.coins, coins: newCoins});
        console.log(this.state.coins);
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
    
    handleSubmit = (e) => {
        e.preventDefault();
    }
    coinList() {
        const coins = this.state.coins.map(coin => {
            console.log(coin);
            return (            
                <div className="col s3 center-align" key={coin.ticker}>
                    <div className="card">
                        <div className="card-content">
                            <img src={coin.image} alt={coin.ticker} width="40" height="40"/>

                            <h5>{coin.ticker}</h5>
                            <p>{this.getFormattedFullName(coin.fullName)}</p>
                            <div className="percent-day-change">{this.getPercentChangePerDay(coin.percentDayChange)}</div>
                            <h6>{coin.price}</h6>
                        </div>
                        <div className="card-action"><a onClick={this.handleSubmit}>Add...</a></div>

                    </div>
                </div>

            )
        }
        )
    }



    render() {
        return (        
            <div className="market">
                <h4 className="center">Market Overview</h4>
                <i>Note: All prices are in USD. Percent change indicates the change per day.</i>
                <div className="row">
                {this.coinList}
                </div>
            </div>
        )
    }
}
