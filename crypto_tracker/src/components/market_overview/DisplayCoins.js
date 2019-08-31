import React from 'react'


const DisplayCoins = ({coinData}) => {
    const coins = coinData.map((coin) => {
        return {
            name: coin.CoinInfo.Name,
            fullName: coin.CoinInfo.FullName,
            price: coin.DISPLAY.USD.PRICE,
        }
    })
    const coinList = coins.map(coin => {
        return (
            <div className="coins" key={coin.name}>
                <div id="crypto-collection" className="collection">
                    <div className="crypto-collection-item">
                        <span className="left">{coin.fullName} ({coin.name})</span>
                        <span className="right">{coin.price}</span>
                    </div>

                </div>
            </div>
        )
    })

    console.log(coins);


    return (
        <div className="market">
            {coinList}
        </div>
    )
}


export default DisplayCoins;