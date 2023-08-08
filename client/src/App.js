import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Manifactor from "./components/manifiactor.component";
import admin from "./components/admin.component";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css'
import getWeb3 from "./getWeb3";
import { useLocation } from 'react-router-dom'
import pharmacy from "./components/pharmacy.component";
import About_US from './components/static_Compents/about-us.component';
import faq from './components/static_Compents/faq.component';
import Inquiry from './components/inquiry.component';

import Sign_InPartial from "./components/Helper/signin-partial";

function App() {
  getWeb3();
  return (<Router>
    <div className="App" style={{ margin: '0px' }}>
      <div className="row" style={{ height: '106px' }}>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}><img src={require('./assets/images/fakes.png')} height="80px"></img></Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/about"}>About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/faq"}>FAQ</Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Contact US</Link>

                </li> */}
                  <Sign_InPartial></Sign_InPartial>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="row mainbody" style={{ backgroundSize: 'calc(100% - 66px) 100%', height: 'calc(100% - 66px)', backgroundImage: useLocation().pathname == "/" ? 'url(' + require('./assets/images/banner1.png') + ')' : '' }}>
        <div className="inner" style={{}}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/sign-in" component={Login} />
            <Route path="/manifactor" component={Manifactor} />
            <Route path="/admin" component={admin} />
            <Route path="/pharmacy" component={pharmacy} />
            <Route path="/about" component={About_US} />
            <Route path="/faq" component={faq} />
            <Route path="/Inquiry" component={Inquiry} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}
export default App;