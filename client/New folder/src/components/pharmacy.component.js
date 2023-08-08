import React, { Component } from "react";
import PharmacyContract from "../contracts/Pharmacy.json";
import OrderContract from "../contracts/Order.json";
import MedicienContract from "../contracts/Mediciences.json";
import Shared from '../components/Helper/shared'
import Loading from '../components/loader.component'
import $ from 'jquery';

export default class pharmacy extends Component {
    constructor(props) {
        super(props);
        let cart = JSON.parse(localStorage.getItem("cart"));
        this.state = { loading: true, cart: cart == null ? [] : cart, activepage: 0, orders: [], medicen: [], Mymedicen: [], User: localStorage.getItem("P"), web3: null, contract: null, site: "", accounts: null, networkId: null, errorLogin: false }
        this.getAllMediciens = this.getAllMediciens.bind(this);
        this.getPharmaOrders = this.getPharmaOrders.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.switch = this.switch.bind(this);
        this.recieveOrder = this.recieveOrder.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.MyMedicen = this.MyMedicen.bind(this);
        let interval = setInterval(async () => {
            console.log(Shared.Address)
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
            networkId: networkId
        })
        await this.getAllMediciens();
    }
    removeFromCart(id) {
        let index = this.state.cart.findIndex(q => q.id == id)
        if (index != -1) {
            this.state.cart.splice(index, 1);
            this.setState({
                cart: this.state.cart
            })
            localStorage.setItem("cart", JSON.stringify(this.state.cart))
            console.log(localStorage.getItem("cart"))
        }
    }
    addToCart(item) {
        if (this.state.cart.findIndex(q => q.id == item.id) == -1) {
            this.state.cart.push(item);
            this.setState({
                cart: this.state.cart
            })
            localStorage.setItem("cart", JSON.stringify(this.state.cart))
            console.log(localStorage.getItem("cart"))
        }
    }
    async switch(id) {
        this.setState({
            activepage: id
        })
        // console.log(this.state.activepage,id)
        switch (id) {
            case 0:
                await this.getAllMediciens();
                break;
            case 1:
                await this.getPharmaOrders();
                break;
            case 2:
                await this.MyMedicen();
                break;
            default:
                await this.getAllMediciens();
                break;
        }
    }
    async getAllMediciens() {
        this.setState({
            loading: true
        })
        let Network = MedicienContract.networks[this.state.networkId];
        let contract = new this.state.web3.eth.Contract(
            MedicienContract.abi,
            Network && Network.address,
        );
        try {
            console.log(this.state.User)
            await contract.methods.get_nonorderd_nonconfirmed_medicien().send({ from: Shared.Address, gas: 3000000 });
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
    async getPharmaOrders() {
        this.setState({
            loading: true
        })
        let Network = OrderContract.networks[this.state.networkId];
        console.log(Network)

        let contract = new this.state.web3.eth.Contract(
            OrderContract.abi,
            Network && Network.address,
        );
        console.log(contract)
        try {
            await contract.methods.getOrderbypharma(this.state.User).send({ from: Shared.Address, gas: 3000000 });
            var data = await contract.methods.returnSearchedOrderData().call({ from: Shared.Address, gas: 3000000 });
            console.log(data)

            this.setState({
                orders: data,
                loading: false
            })
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Adding Medicien"
            })
        }
    }
    async recieveOrder(orderid, medid) {
        let MENetwork = MedicienContract.networks[this.state.networkId];
        let MEcontract = new this.state.web3.eth.Contract(
            MedicienContract.abi,
            MENetwork && MENetwork.address,
        );
        var medicenData = await MEcontract.methods.getmedicien(medid).call({ from: Shared.Address, gas: 3000000 });
        let PHNetwork = PharmacyContract.networks[this.state.networkId];
        let PHcontract = new this.state.web3.eth.Contract(
            PharmacyContract.abi,
            PHNetwork && PHNetwork.address,
        );
        let OrderNetwork = OrderContract.networks[this.state.networkId];
        let Ordercontract = new this.state.web3.eth.Contract(
            OrderContract.abi,
            OrderNetwork && OrderNetwork.address,
        );
        try {
            await Ordercontract.methods.recieveOrder(orderid).send({ from: Shared.Address, gas: 3000000 });
            await MEcontract.methods.deleiverMedicien(medid).send({ from: Shared.Address, gas: 3000000 });
            await PHcontract.methods.addmedicen(medicenData["name"], medicenData["serial"], medicenData["productiondate"], new Date().getMilliseconds(), medicenData["expiredate"], medicenData["manfiactorid"], this.state.User["id"]).send({ from: Shared.Address, gas: 3000000 });
        } catch (error) {
            this.setState({
                errorLogin: false,
                error: "Error When Adding Medicien"
            })
        }
    }
    async addOrder() {
        this.setState({
            loading: true
        })
        console.log("ss")
        let Network = OrderContract.networks[this.state.networkId];
        let contract = new this.state.web3.eth.Contract(
            OrderContract.abi,
            Network && Network.address,
        );
        let Network2 = MedicienContract.networks[this.state.networkId];
        let Mediciencontract = new this.state.web3.eth.Contract(
            MedicienContract.abi,
            Network2 && Network2.address,
        );
        let length = this.state.cart.length;
        for (let x = 0; x < length; x++) {
            const i = this.state.cart[x];
            try {
                this.setState({
                    loading: true
                })
                await contract.methods.addOrder(i["id"], i["manfiactorid"], this.state.User, new Date().getDate()).send({ from: Shared.Address, gas: 3000000 });
                await Mediciencontract.methods.OrderMedicien(i["manfiactorid"]).send({ from: Shared.Address, gas: 3000000 });
                this.setState({
                    loading: false
                })
            } catch (error) {
                this.setState({
                    errorLogin: false,
                    error: "Error When Adding Medicien"
                })
                console.log(error)
            }
            if (x == length - 1)
                this.setState({
                    cart: [],
                    loading: false
                })
                localStorage.setItem("cart","[]")
        }
    }
    async MyMedicen() {
        this.setState({
            loading: true
        })
        let Network = PharmacyContract.networks[this.state.networkId];
        let contract = new this.state.web3.eth.Contract(
            PharmacyContract.abi,
            Network && Network.address,
        );
        try {
            await contract.methods.getmedicienbyPharma(this.state.User).send({ from: Shared.Address, gas: 3000000 });
            var data = await contract.methods.returnSearchedMedicienData().call({ from: Shared.Address, gas: 3000000 });
            console.log(data);
            this.setState({
                Mymedicen: data,
                loading: false
            })
        } catch (error) {
            this.setState({
                errorLogin: false,
                loading: false,
                error: "Error When Adding Medicien"
            })
            console.log(error)
        }
    }

    render() {
        return this.state.loading ? <Loading /> : (
            <div className="viwe">
                <div>
                    <div className="dropdown" style={{ float: 'right' }}>
                        <button className="btn btn-outline-primary" type="button" id="dropdownMenuButton" data-toggle={this.state.cart.length != 0 ? "dropdown" : ""} aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-shopping-cart" style={{ fontSize: '19px' }}></i>{this.state.cart.length != 0 ? <span className="badge badge-pill badge-danger" style={{ top: '-8px' }}>{this.state.cart.length}</span> : <span></span>}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ width: '316px' }}>
                            {
                                this.state.cart.map(i => {
                                    return (<div style={{ padding: "6px 32px", display: 'inline-flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }} key={"id" + i["id"]}>
                                        <div><span>{i["name"]}</span></div>
                                        <a onClick={() => this.removeFromCart(i["id"])} className="btn" style={{ color: 'red', textDecoration: 'unset' }}>X</a>
                                    </div>)
                                })
                            }
                            {
                                this.state.cart.length != 0 ? <div style={{ textAlign: 'center' }}>
                                    <button style={{ margin: 'auto' }} className="btn btn-primary" onClick={this.addOrder}>CheckOut</button>
                                </div> : <span></span>
                            }
                        </div>
                    </div>
                </div>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className={"nav-link " + (this.state.activepage == 0 ? "active" : "")} id="nav-contact-tab" onClick={() => this.switch(0)} data-toggle="tab" data-target="#nav-med" type="button" role="tab" aria-controls="nav-med" aria-selected="false">All Aviable Mediciens</button>
                        <button className={"nav-link " + (this.state.activepage == 1 ? "active" : "")} id="nav-profile-tab" onClick={() => this.switch(1)} data-toggle="tab" data-target="#nav-orders" type="button" role="tab" aria-controls="nav-orders" aria-selected="false">All Order</button>
                        <button className={"nav-link " + (this.state.activepage == 2 ? "active" : "")} id="nav-profile-tab" onClick={() => this.switch(2)} data-toggle="tab" data-target="#nav-mediciens" type="button" role="tab" aria-controls="nav-mediciens" aria-selected="false">My Medicenes</button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className={"tab-pane fade " + (this.state.activepage == 0 ? "show active" : "")} id="nav-med" role="tabpanel" aria-labelledby="nav-med-tab">
                        {this.state.medicen.length != 0 ?
                            <div className="containeer">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Manfiactor Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Serial</th>
                                            <th scope="col">Production Date</th>
                                            <th scope="col">Expire Date</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.medicen.map(i => {
                                            return <tr key={i + "uniqueId"}>
                                                <th scope="row">{i["id"]}</th>
                                                <th scope="row">{i["manfiactorid"]}</th>
                                                <td>{i["name"]}</td>
                                                <td>{i["serial"]}</td>
                                                <td>{(new Date(parseInt(i["productiondate"]))).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                                <td>{(new Date(parseInt(i["expiredate"]))).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                                <td><button className="btn btn-primary" onClick={() => this.addToCart({ id: i["id"], name: i["name"], serial: i["serial"], manfiactorid: i["manfiactorid"] })}>Add To Cart</button></td>
                                            </tr>
                                        })}

                                    </tbody>
                                </table>
                            </div> : <span></span>}
                    </div>
                    <div className={"tab-pane fade " + (this.state.activepage == 1 ? "show active" : "")} id="nav-orders" role="tabpanel" aria-labelledby="nav-orders-tab">
                        {this.state.orders.length != 0 ?
                            (<div className="containeer">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Medicien Id</th>
                                            <th scope="col">Parmacy Id</th>
                                            <th scope="col">Confirmed</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.orders.map(i => {
                                            return <tr key={"Order" + i["orderid"]}>
                                                <th scope="row">{i["orderid"]}</th>
                                                <td>{i["medicienid"]}</td>
                                                <td>{i["parmacyid"]}</td>
                                                <td>{i["confirmed"] ? <i className="fas fa-circle" style={{ color: 'green' }}></i> : <i style={{ color: 'red' }} className="fas fa-circle"></i>}</td>
                                                <td>
                                                    {
                                                        i["confirmed"] && i["recieved"] ?
                                                            <span></span> :
                                                            ((i["confirmed"] && !i["recieved"]) ?
                                                                <button className="btn btn-primary" onClick={this.recieveOrder}>Recieve Order</button>
                                                                : <span></span>)

                                                    }
                                                </td>
                                            </tr>
                                        })}

                                    </tbody>
                                </table>
                            </div>
                            ) : <span></span>}
                    </div>
                    <div className={"tab-pane fade " + (this.state.activepage == 2 ? "show active" : "")} id="nav-mediciens" role="tabpanel" aria-labelledby="nav-profile-tab">
                        {this.state.Mymedicen.length != 0 ? (
                            <div className="containeer">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Manfiactor Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Serial</th>
                                            <th scope="col">Production Date</th>
                                            <th scope="col">Expire Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.Mymedicen.map(i => {
                                            return <tr key={"Medicen" + i["id"]}>
                                                <th scope="row">{i["id"]}</th>
                                                <th scope="row">{i["manfiactorid"]}</th>
                                                <td>{i["name"]}</td>
                                                <td>{i["serial"]}</td>
                                                <td>{(new Date(parseInt(i["productiondate"]))).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                                <td>{(new Date(parseInt(i["expiredate"]))).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                            </tr>
                                        })}

                                    </tbody>
                                </table>
                            </div>) : <span></span>}

                    </div>
                </div>
            </div>
        );
    }
}