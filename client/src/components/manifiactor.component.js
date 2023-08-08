import React, { Component } from "react";
import OrderContract from "../contracts/Order.json";
import MedicienContract from "../contracts/Mediciences.json";
import Shared from "../components/Helper/shared";
import Loading from "../components/loader.component"

export default class Manifactor extends Component {
    constructor(props) {
        super(props);
        this.state = { activepage: 0, loading: true, message: '', name: '', id: '', serial: '', STRproductiondate: '', STRexpiredate: '', productiondate: 0, expiredate: 0, error: '', type: '', web3: null, contract: null, site: "", accounts: null, networkId: null, errorLogin: false, orders: [], medicen: [], User: localStorage.getItem("M") }
        this.AddMedicien = this.AddMedicien.bind(this);
        this.getMediciens = this.getMediciens.bind(this);
        this.switch = this.switch.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.getOrders = this.getOrders.bind(this);
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
    async switch(id) {
        this.setState({
            activepage: id
        })
        switch (id) {
            case 1:
                await this.getMediciens();
                break;
            case 2:
                await this.getOrders();
                break;
            default:
                break;
        }
    }
    async AddMedicien(eve) {
        this.setState({ loading: true })
        eve.preventDefault();
        let Network = MedicienContract.networks[this.state.networkId];
        let contract = new this.state.web3.eth.Contract(
            MedicienContract.abi,
            Network && Network.address,
        );
        try {
            var data = await contract.methods.addmedicen(this.state.name, this.state.serial, this.state.productiondate, this.state.expiredate, "ManifactorName", this.state.User, new Date().getTime()).send({ from: Shared.Address, gas: 3000000 });
            console.log(data);
            this.setState({
                loading: false,
                message: "Addedd Successfully",
                serial: '',
                STRproductiondate: '',
                STRexpiredate: '',
                productiondate: 0,
                expiredate: 0
            })
            setTimeout(() => {
                this.setState({
                    message: "",
                })
            }, 1000);
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Adding Medicien"
            })
            console.log(error)
        }
    }
    async getMediciens() {
        this.setState({
            loading: true
        })
        let Network = MedicienContract.networks[this.state.networkId];
        let contract = new this.state.web3.eth.Contract(
            MedicienContract.abi,
            Network && Network.address,
        );
        try {
            await contract.methods.getmedicienbymanf(this.state.User).send({ from: Shared.Address, gas: 3000000 });
            var data = await contract.methods.returnSearchedData().call({ from: Shared.Address, gas: 3000000 });
            this.setState({
                medicen: data,
                loading: false
            })
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Adding Medicien"
            })
            console.log(error)
        }
    }
    async confirmOrder(id, medid) {
        this.setState({
            loading: true
        })
        let Network = OrderContract.networks[this.state.networkId];
        let Ocontract = new this.state.web3.eth.Contract(
            OrderContract.abi,
            Network && Network.address,
        );
        try {
            await Ocontract.methods.confirmOrder(id).send({ from: Shared.Address, gas: 3000000 });
            let orders = this.state.orders;
            // orders[this.state.orders.findIndex(q => q.orderid == id)].confirmed = true;
            this.setState({
                loading: false,
                orders: orders
            })
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Confirm Order"
            })
            console.log(error)
        }
    }
    async getOrders() {
        this.setState({
            loading: true
        })
        let Network = OrderContract.networks[this.state.networkId];
        let contract = new this.state.web3.eth.Contract(
            OrderContract.abi,
            Network && Network.address,
        );
        console.log(Shared.Address)
        try {
            await contract.methods.getOrderbymanfi(this.state.User).send({ from: Shared.Address, gas: 4600000 });
            console.log("getData")
            var data = await contract.methods.returnSearchedOrderData().call({ from: Shared.Address, gas: 4600000 });
            console.log(data)
            this.setState({
                orders: data,
                loading: false
            })
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Get Orders"
            })
            console.log(error)
        }
    }

    render() {
        return (
            this.state.loading ? <Loading /> :
                <div className="viwe">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className={"nav-link" + (this.state.activepage == 0 ? " active" : "")} id="nav-home-tab" onClick={() => this.switch(0)} data-toggle="tab" data-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Add Medicien</button>
                            <button className={"nav-link" + (this.state.activepage == 1 ? " active" : "")} id="nav-contact-tab" onClick={() => this.switch(1)} data-toggle="tab" data-target="#nav-med" type="button" role="tab" aria-controls="nav-med" aria-selected="false">All Mediciens</button>
                            <button className={"nav-link" + (this.state.activepage == 2 ? " active" : "")} id="nav-profile-tab" onClick={() => this.switch(2)} data-toggle="tab" data-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">All Order</button>
                        </div>
                    </nav>
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
                        <div className={"tab-pane fade" + (this.state.activepage == 0 ? " show active" : "")} style={{ textAlign: "center" }} id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <form onSubmit={this.AddMedicien} style={{ width: '50vw', margin: 'auto' }}>
                                <h3>Add Medicien</h3>
                                <div className="form-group">
                                    <label className="formDesc">Name</label>
                                    <input type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} className="form-control" placeholder="Name" />
                                </div>

                                <div className="form-group">
                                    <label className="formDesc">Serial</label>
                                    <input type="text" value={this.state.serial} onChange={e => this.setState({ serial: e.target.value })} className="form-control" placeholder="Serial" />
                                </div>

                                <div className="form-group">
                                    <label className="formDesc">Production Date</label>
                                    <input type="Date" value={this.state.STRproductiondate} onChange={e => { this.setState({ productiondate: e.target.valueAsNumber, STRproductiondate: e.target.value }); }} className="form-control" placeholder="Production Date" />
                                </div>

                                <div className="form-group">
                                    <label className="formDesc">Expire Date</label>
                                    <input type="Date" value={this.state.STRexpiredate} onChange={e => { this.setState({ expiredate: e.target.valueAsNumber, STRexpiredate: e.target.value }); }} className="form-control" placeholder="Expire Date" />
                                </div>

                                <button type="submit" className="btn btn-dark btn-lg btn-block">Save</button>
                            </form>
                        </div>
                        <div className={"tab-pane fade" + (this.state.activepage == 1 ? " show active" : "")} id="nav-med" role="tabpanel" aria-labelledby="nav-med-tab">
                            {(this.state.medicen.length != 0) ?
                                <div className="containeer">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Serial</th>
                                                <th scope="col">Production Date</th>
                                                <th scope="col">Expire Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.medicen.map(i => {
                                                return <tr key={"Med" + i["id"]}>
                                                    <th scope="row">{i["id"]}</th>
                                                    <td>{i["name"]}</td>
                                                    <td>{i["serial"]}</td>
                                                    <td>{(new Date(parseInt(i["productiondate"]))).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                                    <td>{(new Date(parseInt(i["expiredate"]))).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                                : <div></div>}
                        </div>
                        <div className={"tab-pane fade" + (this.state.activepage == 2 ? " show active" : "")} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                            {(this.state.orders.length != 0) ?
                                <div className="containeer">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Medicien Id</th>
                                                <th scope="col">Parmacy Id</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.orders.map(i => {
                                                return <tr key={"MANO" + i["orderid"]}>
                                                    <th scope="row">{i["orderid"]}</th>
                                                    <td>{i["medicienid"]}</td>
                                                    <td>{i["parmacyid"]}</td>
                                                    <td>{i["confirmed"] ? <span></span> : <button className="btn btn-primary" onClick={() => this.confirmOrder(i["orderid"], i["medicienid"])}>Confirm</button>}</td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                                : <div></div>}
                        </div>
                    </div>
                </div>
        );
    }
}