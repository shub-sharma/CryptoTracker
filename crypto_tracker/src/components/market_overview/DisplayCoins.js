import React from 'react'


const DisplayCoins = ({coinData}) => {
    const CRYPTO_COMPARE_URL = 'https://www.cryptocompare.com';
    const MAX_CHAR_LIM = 15;

    const coins = coinData.map((coin) => {
        const imageURL = CRYPTO_COMPARE_URL + coin.CoinInfo.ImageUrl;
        return {
            ticker: coin.CoinInfo.Name,
            fullName: coin.CoinInfo.FullName,
            price: coin.DISPLAY.USD.PRICE,
            image: imageURL,
            percentDayChange: coin.DISPLAY.USD.CHANGEPCTDAY,
        }
    })

    const getFormattedFullName = (fullName) => {
        if (fullName.length > MAX_CHAR_LIM) {
            return fullName.slice(0, 11) + "...";
        } else {
            return fullName;
        }
    }

    const getPercentChangePerDay = (percent) => {
        if (percent == 0){
            return (
                <div id="no-change">{percent}%</div>
            )
        } else if (percent > 0) {
            return (
                <div id="positive-change">
                    <i className="material-icons">arrow_drop_up</i>
                    {percent}%
                </div>
            )
        } else {
            return (
                <div id="negative-change">
                    
                <i class="material-icons">arrow_drop_down</i>
                {percent}%
                </div>
            )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
    }

    const coinList = coins.map(coin => {
        return (            
                <div className="col s2 center-align" key={coin.ticker}>
                    <div className="card">
                        <div className="card-content">
                            <img src={coin.image} alt={coin.ticker} width="80" height="80"/>

                            <h5>{coin.ticker}</h5>
                            <p>{getFormattedFullName(coin.fullName)}</p>
                            <div className="percent-day-change">{getPercentChangePerDay(coin.percentDayChange)}</div>
                            <h6>{coin.price}</h6>
                        </div>
                        <div className="card-action"><a onClick={handleSubmit}>Add...</a></div>

                    </div>
                </div>

        )

    })

return (
        <div className="market">

            <h4 className="center">Market Overview</h4>
            <i>Note: All prices are in USD. Percent change indicates the change per day.</i>
            <div className="row">
                {coinList}
            </div>
        </div>
    )
}


export default DisplayCoins;