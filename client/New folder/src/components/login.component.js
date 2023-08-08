import React, { Component } from "react";
import UserContract from "../contracts/User_Login.json";
import Loading from "../components/loader.component";
import Shared from "../components/Helper/shared"
import '../assets/css/login.css'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, username: '', pass: '', type: '', web3: null, contract: null, site: "P", accounts: null, networkId: null, errorLogin: false }
        this.onSiteChanged = this.onSiteChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
            loading: false
        })
    }
    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true })
        let Network = UserContract.networks[this.state.networkId];
        let contract = new this.state.web3.eth.Contract(
            UserContract.abi,
            Network && Network.address,
        );
        switch (this.state.site) {
            case "P":
                var x = await contract.methods.login(this.state.username, this.state.pass, "p").call({ from: Shared.Address, gas: 3000000 });
                console.log(x)
                if (!x["active"]) {
                    this.setState({
                        errorLogin: true,
                        username: "",
                        pass: "",
                        loading: false
                    })
                }
                else {
                    localStorage.setItem('P', x["userid"]);
                    this.setState({
                        errorLogin: false,
                        loading: false
                    })
                    window.location.href = "/pharmacy"

                }
                break;
            case "M":
                var x = await contract.methods.login(this.state.username, this.state.pass, "m").call({ from: Shared.Address, gas: 3000000 });
                console.log(x)
                if (!x["active"]) {
                    this.setState({
                        errorLogin: true,
                        username: "",
                        pass: "",
                        loading: false
                    })
                }
                else {
                    localStorage.setItem('M', x["userid"]);
                    this.setState({
                        errorLogin: false,
                        loading: false
                    })
                    window.location.href = "/manifactor"

                }
                break;

            case "A":
                // console.log("admin")
                var x = await contract.methods.login(this.state.username, this.state.pass, "a").call({ from: Shared.Address, gas: 3000000 });
                console.log(x)
                if (x["active"]) {
                    this.setState({
                        errorLogin: true,
                        username: "",
                        pass: "",
                        loading: false
                    })
                }
                else {
                    localStorage.setItem('M', x["userid"]);
                    this.setState({
                        errorLogin: false,
                        loading: false
                    })
                    window.location.href = "/admin"

                }
                // break
                break;
        }

        // await instance2.methods.regiter("ramy", ("ramy"), ("ramy")).send({ from:Shared.Address, gas: 3000000 });

    }
    onSiteChanged(e) {
        console.log(e)
        this.setState({
            site: e.currentTarget.value
        });
    }
    render() {
        return (
            this.state.loading ? <Loading /> : (<div className="viwe login">
                <form onSubmit={this.handleSubmit} >
                    <h3>Log in</h3>
                    {this.state.errorLogin ? (
                        <div className="alert alert-danger" role="alert">
                            Wrong UserName Or Password Please Try Again With Real Data
                        </div>) : <span></span>}
                    <div className="form-group">
                        <label className="formDesc">User Name</label>
                        <input type="text" className="form-control" placeholder="Enter email" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label className="formDesc">Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={this.state.pass} onChange={e => this.setState({ pass: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <input className="input-radio" id="1s" type="radio" name="site_name"
                            value="P"
                            onChange={this.onSiteChanged} defaultChecked="checked" />
                        <label htmlFor="1s">Pharmacy</label>
                        <input className="input-radio" id="2s" type="radio" name="site_name"
                            value="M"
                            onChange={this.onSiteChanged} />
                        <label htmlFor="2s">Manifactor</label>
                        <input className="input-radio" id="3s" type="radio" name="site_name"
                            value="A"
                            onChange={this.onSiteChanged} />
                        <label htmlFor="3s">Admin</label>
                    </div>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                </form>

            </div>));
    }
}