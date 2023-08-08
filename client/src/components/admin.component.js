import React, { Component } from "react";
import UserContract from "../contracts/User_Login.json";
import Shared from '../components/Helper/shared'
import Loading from "./loader.component"

export default class admin extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '', error: '', pusername: '', ppass: '', pname: '', pphone: '', musername: '', mpass: '', mname: '', web3: null, contract: null, site: "", accounts: null, networkId: null, errorLogin: false, loading: true }
        this.AddPharmacy = this.AddPharmacy.bind(this);
        this.AddManficator = this.AddManficator.bind(this);
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
    async AddPharmacy(event) {
        this.setState({
            loading: true
        })
        event.preventDefault();
        let Network = UserContract.networks[this.state.networkId];
        let contract = new this.state.web3.eth.Contract(
            UserContract.abi,
            Network && Network.address,
        );
        try {
            await contract.methods.regiter(this.state.pusername, this.state.ppass, this.state.pname, "p", new Date().getDate(), this.state.pphone).send({ from: Shared.Address, gas: 3000000 });
            this.setState({
                loading: false,
                message: 'Added Successfuly',
                pusername: '',
                ppass: '',
                pname: ''
            })
            setTimeout(() => {
                this.setState({
                    message: ""
                })
            }, 1000);
            // var xc = await instance2.methods.deleiverMedicien(medid).call({ from: Shared.Address, gas: 3000000 });
        } catch (error) {
            console.log(error)
            this.setState({
                error: "Error When Confirm Order"
            })
            setTimeout(() => {
                this.setState({
                    error: ""
                })
            }, 1000);
        }
    }
    async AddManficator(event) {
        this.setState({
            loading: true
        })
        event.preventDefault();
        let Network = UserContract.networks[this.state.networkId];
        let contract = new this.state.web3.eth.Contract(
            UserContract.abi,
            Network && Network.address,
        );
        try {
            await contract.methods.regiter(this.state.musername, this.state.mpass, this.state.mname, "m", new Date().getDate(),this.state.mphone).send({ from: Shared.Address, gas: 3000000 });
            this.setState({
                loading: false,
                message: 'Added Successfuly',
                musername: '',
                mpass: '',
                mname: ''
            })
            setTimeout(() => {
                this.setState({
                    message: ""
                })
            }, 1000);
            // var xc = await instance2.methods.deleiverMedicien(medid).call({ from: Shared.Address, gas: 3000000 });
        } catch (error) {
            console.log(error)
            this.setState({
                error: "Error When Confirm Order"
            })
            setTimeout(() => {
                this.setState({
                    error: ""
                })
            }, 1000);
        }
    }
    // async getPhamacy(){
    //     let Network = PharmacyContract.networks[this.state.networkId];
    //     let contract = new this.state.web3.eth.Contract(
    //         PharmacyContract.abi,
    //         Network && Network.address,
    //     );
    //     try {
    //         await contract.methods.get_nonorderd_nonconfirmed_medicien().send({ from: Shared.Address, gas: 3000000 });
    //         var data = await contract.methods.returnSearchedData().call({ from: Shared.Address, gas: 3000000 });
    //         this.setState({
    //             medicen: data
    //         })
    //     } catch (error) {
    //         this.setState({
    //             errorLogin: false,
    //             error: "Error When Adding Medicien"
    //         })
    //     }
    // }
    render() {
        let data = (
            <div className="viwe">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-toggle="tab" data-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Add Pharmacy</button>
                        <button className="nav-link" id="nav-contact-tab" data-toggle="tab" data-target="#nav-med" type="button" role="tab" aria-controls="nav-med" aria-selected="false">Add Manifiactor</button>
                        {/* <button className="nav-link" id="nav-profile-tab" data-toggle="tab" data-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={this.getPhamacy()}>Manage Pharmacy</button> */}
                        {/* <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Manage Manifiactor</button> */}
                    </div>
                </nav>
                {/* {div} */}
                <div className="tab-content" id="nav-tabContent">
                {this.state.message != "" ? (
                    <div className="alert alert-success">
                        {this.state.message}
                    </div>
                ) : (<span></span>)}
                {this.state.error != "" ? (
                    <div className="alert alert-danger">
                        {this.state.error}
                    </div>
                ) : (<span></span>)}
                    <div className="tab-pane fade show active" id="nav-home" style={{ textAlign: "center" }} role="tabpanel" aria-labelledby="nav-home-tab">
                        <form onSubmit={this.AddPharmacy} style={{ width: '50vw', margin: 'auto' }}>
                            <h3 style={{ paddingTop: 25 + 'px' }}>Add Pharmacy</h3>
                            <div className="form-group">
                                <label className="formDesc">User Name</label>
                                <input type="text" value={this.state.pusername} onChange={e => this.setState({ pusername: e.target.value })} className="form-control" placeholder="Enter Pharmacy User Name" />
                            </div>

                            <div className="form-group">
                                <label className="formDesc">Password</label>
                                <input type="text" value={this.state.ppass} onChange={e => this.setState({ ppass: e.target.value })} className="form-control" placeholder="Enter Pharmacy Password" />
                            </div>

                            <div className="form-group">
                                <label className="formDesc">Name</label>
                                <input type="text" value={this.state.pname} onChange={e => this.setState({ pname: e.target.value })} className="form-control" placeholder="Enter Pharmacy Name" />
                            </div>
                            <div className="form-group">
                                <label className="formDesc">Phone</label>
                                <input type="text" value={this.state.pphone} onChange={e => this.setState({ pphone: e.target.value })} className="form-control" placeholder="Enter Pharmacy Phone" />
                            </div>

                            <button type="submit" className="btn btn-dark btn-lg btn-block">Save</button>
                        </form>
                    </div>
                    <div className="tab-pane fade" style={{ textAlign: "center" }} id="nav-med" role="tabpanel" aria-labelledby="nav-med-tab">
                        <form onSubmit={this.AddManficator} style={{ width: '50vw', margin: 'auto' }}>
                            <h3 style={{ paddingTop: 25 + 'px' }}>Add Manficator</h3>
                            <div className="form-group">
                                <label className="formDesc">User Name</label>
                                <input type="text" value={this.state.musername} onChange={e => this.setState({ musername: e.target.value })} className="form-control" placeholder="Enter Manifactor User Name" />
                            </div>

                            <div className="form-group">
                                <label className="formDesc">Password</label>
                                <input type="text" value={this.state.mpass} onChange={e => this.setState({ mpass: e.target.value })} className="form-control" placeholder="Enter Manifactor Password" />
                            </div>

                            <div className="form-group">
                                <label className="formDesc">Name</label>
                                <input type="text" value={this.state.mname} onChange={e => this.setState({ mname: e.target.value })} className="form-control" placeholder="Enter Manifactor Name" />
                            </div>

                            <div className="form-group">
                                <label className="formDesc">Phone</label>
                                <input type="text" value={this.state.mphone} onChange={e => this.setState({ mphone: e.target.value })} className="form-control" placeholder="Enter Manifactor Phone" />
                            </div>

                            <button type="submit" className="btn btn-dark btn-lg btn-block">Save Manficator</button>
                        </form>
                    </div>

                </div>
            </div>
        );
        return this.state.loading ? <Loading /> : data;
    }
}