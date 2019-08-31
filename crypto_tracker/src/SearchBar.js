import React, { Component } from 'react'

export default class SearchBar extends Component {

    state = {
        search: ""
    }
    onChange = (e) => {
        this.setState({search: e.target.value})
    }

    render() {
        return (
            <div>
                <div class="input-field col s6">
                    <input class="search" id="search" type="text" placeholder="Search a crypto via ticker or name..." onChange={this.onChange}/>
                </div>
                <p class="flow-text">{this.state.search}</p>
            </div>

        )
    }
}
