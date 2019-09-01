import React from 'react'
import loading from './loading.svg'

const LoadingScreen = () => {

    return (
        <div>
            <h6 className="center-align">Loading...</h6>
            <img src={loading} className="center-align" height="100" width="100" alt="loading-logo" />
        </div>
    )
}

export default LoadingScreen;