import React, { Component } from "react";
import MedicienContract from "../contracts/Mediciences.json";
import Loading from "../components/loader.component";
import Shared from "../components/Helper/shared"
import '../assets/css/inquiry.css'
import '../assets/js/inquiry.js'

export default class Inquiry extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, username: '', pass: '', type: '', web3: null, contract: null, site: "P", accounts: null, networkId: null, errorLogin: false }
        this.onSiteChanged = this.onSiteChanged.bind(this);

        let interval = setInterval(async () => {
            if (Shared.web3 != null && Shared.Address != null) {
                clearInterval(interval);
                await this.loading();
            }

        }, 1000);
    }
    loading = async () => {
        const web3 = Shared.web3;
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();

        this.setState({
            accounts: accounts,
            web3: web3,
            networkId: networkId,
            loading: true
        })
        let MENetwork = MedicienContract.networks[this.state.networkId];
        let MEcontract = new this.state.web3.eth.Contract(
            MedicienContract.abi,
            MENetwork && MENetwork.address,
        );
        var medicenData = await MEcontract.methods.getmedicien_serial(window.location.search.split('=')[1]).call({ from: Shared.Address, gas: 3000000 });
        this.setState({
            product: medicenData,
            loading: false
        })
        console.log(medicenData)
    }

    onSiteChanged(e) {
        console.log(e)
        this.setState({
            site: e.currentTarget.value
        });
    }
    render() {
        return (
            this.state.loading ? <Loading /> :

                <div className="viwe">
                    <h1 style={{ textAlign: "start", fontSize: "30px", padding: "10px 25px" }}>Serial: {window.location.search.split('=')[1]} </h1>
                    {this.state.product["id"] == "0" ? <div>
                        <h1 style={{ height: "40vh", fontSize: "35px", color: "red" }}>There Is No Medecien Match This Serial</h1>
                        <div>
                            <h2>❌ Not Valid</h2>
                        </div>
                    </div> :
                        (<div>
                            <ul className="steps" style={{ marginTop: "10vh" }}>
                                <li className="step">
                                    <div className="dates">
                                        <span className={this.state.product["createdDate"] == "0" ? "time" : "time active"}>{this.state.product["createdDate"] == "0" ? "Saturday, July 3, 2021" : (new Date(parseInt(this.state.product["createdDate"]))).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="step-context">
                                        <span className="step-heading">Created</span>
                                    </div>
                                </li>
                                <li className="step">
                                    <div className="dates">
                                        <span className={this.state.product["orderedDate"] == "0" ? "time" : "time active"}>{this.state.product["orderedDate"] == "0" ? "Saturday, July 3, 2021" : (new Date(parseInt(this.state.product["orderedDate"]))).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="step-context">
                                        <span className="step-heading">Requested</span>
                                    </div>
                                </li>
                                <li className="step">
                                    <div className="dates">
                                        <span className={this.state.product["deliveredDate"] == "0" ? "time" : "time active"}>{this.state.product["deliveredDate"] == "0" ? "Saturday, July 3, 2021" : (new Date(parseInt(this.state.product["deliveredDate"]))).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="step-context">
                                        <span className="step-heading">Delivired</span>
                                    </div>
                                </li>
                            </ul>
                            <div>
                                <h2>{this.state.product["deliveredDate"] != "0" ? "✔️ Valid" : "❌ Not Valid"}</h2>
                            </div>
                        </div>
                        )}

                </div>

        );
    }
}