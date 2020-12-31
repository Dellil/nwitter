import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
        </ul>
    );
}

export default Navigation;