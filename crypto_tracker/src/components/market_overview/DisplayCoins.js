import React from 'react'

const CRYPTO_COMPARE_URL = 'https://www.cryptocompare.com';
const MAX_CHAR_LIM = 10;

const DisplayCoins = ({coinData}) => {
    const coinList = [];
    for(let coin in coinData) {
        const tempCoin = coinData[coin]['USD']
        const newCoin = {
            ticker: String(coin),
            price: tempCoin['PRICE'],
            image: CRYPTO_COMPARE_URL + tempCoin['IMAGEURL'],
            percentDayChange: tempCoin['CHANGEPCTDAY'],
        }
        coinList.push(newCoin);
    }

    // const getFormattedFullName = (fullName) => {
    //     if (fullName.length > MAX_CHAR_LIM) {
    //         return fullName.slice(0, 11) + "...";
    //     } else {
    //         return fullName;
    //     }
    // }

    const getPercentChangePerDay = (percent) => {
        if (percent == 0){
            return (
                <div id="no-change">
                {/* arrow_drop_up */}
                    <i className="material-icons">remove</i>
                    {percent}%
                </div>
            )
        } else if (percent > 0) {
            return (
                <div id="positive-change">
                    <i className="material-icons">trending_up</i>
                    {percent}%
                </div>
            )
        } else {
            return (
                <div id="negative-change">
                    
                <i className="material-icons">trending_down</i>
                {percent}%
                </div>
            )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        
    }

    const viewCoinList = coinList.map(coin => {
        return (            
                <div className="col s2 center-align" key={coin.ticker}>
                    <div className="card">
                        <div className="card-content">
                            <img src={coin.image} alt={coin.ticker} width="80" height="80"/>

                            <h5>{coin.ticker}</h5>
                            {/* <p>{getFormattedFullName(coin.fullName)}</p> */}
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
                {viewCoinList}
            </div>
        </div>
    )
}


export default DisplayCoins;