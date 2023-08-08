import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class Sign_InPartial extends Component {
    constructor(props) {
        super(props);
        this.state = { logined: (localStorage.getItem("M") != null || localStorage.getItem("P") != null || localStorage.getItem("A") != null) }
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        this.setState({ logined: (localStorage.getItem("M") != null || localStorage.getItem("P") != null || localStorage.getItem("A") != null) })

    }
    logout() {
        localStorage.removeItem("M"); localStorage.removeItem("P"); localStorage.removeItem("A")
        window.location.href = "/"
    }
    render() {
        return (
            <li className="nav-item">
                {
                    this.state.logined ? <i className="nav-link fas fa-sign-out-alt" onClick={() => this.logout()}></i> : <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                }
            </li>
        );
    }
}

export default Sign_InPartial;