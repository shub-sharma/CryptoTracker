import React from 'react';
import {NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        // blue darken-2
        <nav className="nav-wrapper">
            <div className="container">
                <NavLink className="brand-logo" to="/">Crypto Tracker</NavLink>
                <ul className="right">
                    <li><NavLink to="/">Market Overview</NavLink></li>
                    <li><NavLink to="/portfolio">Portfolio</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;