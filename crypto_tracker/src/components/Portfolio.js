import React, { Component } from 'react'

export default class Portfolio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            portfolio: null,
        }
        
    }

    componentDidMount() {
        const portfolioData = this.props.portfolio;
        this.setState({portfolio: portfolioData});
    }






    render() {
        return (
            <div className="container">
                <h4 className="center">Track Your Crypto Assets</h4>
                <p><i>All of the coins added from Market Overview appear here :)</i></p>
            </div>
        )
    }
}

