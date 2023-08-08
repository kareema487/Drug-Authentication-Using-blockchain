import React, { Component } from "react";
import getWeb3 from "../getWeb3"
import '../assets/css/home.css'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', pass: '', type: '', web3: null, contract: null, site: "", accounts: null, networkId: null, errorLogin: false }
    }
    componentDidMount = async () => {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();

        this.setState({
            accounts: accounts,
            web3: web3,
            networkId: networkId,
            serial: "sxs55r87t7yh"
        })
    }
    render() {
        return (

            <div className="s130 row h-100">

                <p className="col-12 m-0">
                    <h2 style={{ color: '#52CCC8', fontSize: '60px' }}>Your Sefty Is Our <span style={{ color: '#E989BD' }}>Mission</span></h2>
                    <hr></hr>
                </p>
                <form className="col-12">
                    <div className="inner-form">
                        <div className="input-field first-wrap">
                            <div className="searchContainer">
                                <div className="svg-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                    </svg>
                                </div>
                                <input id="search" value={this.state.serial} onChange={e => this.setState({ serial: e.target.value })} type="text" placeholder="What Is Your Medicien Serial?" />
                            </div>
                        </div>
                        <div className="input-field second-wrap">
                            <button className="btn-search" type="button" onClick={() => window.location.href = "/inquiry?Serial=" + this.state.serial}>SEARCH</button>
                        </div>
                    </div>
                    <span className="info">EX. 0x15588888x, 0edededdmked, 0fefdjed, 0dedekdmek</span>
                </form>
            </div>


        );
    }
}