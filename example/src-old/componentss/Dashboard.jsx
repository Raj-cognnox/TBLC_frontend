import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Disconnect from './Disconnect';
import "../App.css"
import { REACT_APP_BACKEND_URL } from '../constants/constants'
import { createSna, dispatchCall, dispatchSend } from "../helpers/bpntoken";
import { getAxios, postAxios, getFetch } from "../helpers/api"
import { MATCH_SNA, TEST_BYTES, FUNCTION_BALANCE_OF } from "../constants/functions"
import { getPackageCost } from "../helpers/package"
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            users: null,
            info: {}
        }
        console.log("props", this.props)
        this.resetApp = this.resetApp.bind(this)
        this.buy = this.buy.bind(this)
    }
    async componentDidMount() {
        // console.log("in dasb board", this.props)
        // fetch('https://9161be863bbe.ngrok.io/total').then((resp) => {
        //     resp.json().then((result) => {
        //         console.log(result)
        //         // console.log(result.differntial)
        //         this.setState({ data: result })
        //     })
        // })
        // console.log("state in component did mount dashboard", this.props)
        let { address, chainId, web3 } = this.props
        let info = await getAxios(`user-profile`, { address })
        console.log("info dashboard", info.data)
        this.setState({ info: info.data })
        //console.log("info ", info)

        let _hash = web3.utils.soliditySha3("hello")
        console.log("_hello _hash", _hash)
        //  let resultTestBytes = await dispatchCall(address, chainId, web3, TEST_BYTES, [_hash])
        let resultHVRXBalance = await dispatchCall(address, chainId, web3, FUNCTION_BALANCE_OF, [address])
        let balance = await web3.eth.getBalance(address)
        console.log('balance .. ', balance)
        // let earnings = Object.values(this.state.info.totalEarning).reduce((p,c,i,a)=>{
        //     return p+c
        // })
        let earnings = this.state.info.grandTotal
        this.setState({ bnbBalance: balance / 1000000000000000000, hvrxBalance: resultHVRXBalance, earnings })
        //  console.log("result of call", resultHVRXBalance)
        let isAdmin = await dispatchCall(address, chainId, web3, 'totalCommFunds', [])
        if (isAdmin > 0) {
            this.setState({ info: { isAdmin: true } })
        }
    }

    async resetApp() {
        const { web3 } = this.props;
        if (web3 && web3.currentProvider && web3.currentProvider.close) {
            await web3.currentProvider.close();
        }
    }

    async joinLeader() {
        let leaderReferrer = document.getElementById("leader_referrer").value
        let leaderWallet = document.getElementById("leader_referrer").value
        let leaderPackage = document.getElementById("leader_package").value
        let leaderActivate = await getAxios('admin-buy', { leaderPackage, leaderReferrer, leaderWallet })
        console.log("leader activate", leaderActivate)
        if (leaderActivate.data.message == "notOk") {
            alert("This Referrer does not exist in the system")
        }
        else if (leaderActivate.data.message == "ok") {
            alert("Leader Activated Successfully")
        }
        else {
            alert("Some unknown error occured")
        }
    }
    async buy() {
        let packages = [0, 50, 100, 200, 500, 1000, 2000]
        let selectedPackage = document.getElementById("package").value
        let bnb = await getPackageCost(packages[selectedPackage]);
        console.log("bnb", bnb)
        const { web3, chainId, address } = this.props;
        let sna = await createSna(address, chainId, web3)
        // console.log(sna)
        // let user = await getAxios('check',{address})
        // console.log("checking user ", user )
        if (this.state.info.pakage > 0) {
            alert("You have already bought a package")
            return
        }
        let data = { address, chainId, pakage: selectedPackage, price: bnb.price, value: bnb.value }
        let buystartresponse = await getAxios('buy-start', data)
        if (buystartresponse.data.status == "notOk") {
            return
        }
        console.log("buy start resonse", buystartresponse)
        if (!buystartresponse.status == "ok") {
            alert("You have already bought a package")
            return
        }
        sna = buystartresponse.data.hash
        let value = buystartresponse.data.value.value
        let response = { status: 0 }
        if (value > 0) {
            let response = await dispatchSend(address, chainId, web3, 'buy', [sna, address.substring(2), value.toString(), packages[selectedPackage], this.state.referrer || address], value)
            console.log("buy called ", response.status)
            if (response.status == true) {
                console.log("it is true")
                let data = { address, pakage: selectedPackage, txHash: response.transactionHash, referrer: this.state.referrerAddress }
                //  let url = `${REACT_APP_BACKEND_URL}/buy`
                let response3 = await getAxios('success', data)
                console.log("result of success buying", response3);
                // if (web3 && web3.currentProvider && web3.currentProvider.close) {
                //     await web3.currentProvider.close();
                // }
            }
        }
        //response return 
        //    let response = {hash:"0xabcde"}

    }
    render() {
        let { connected, address, chainId } = this.props
        return <>
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <div id="page-content-wrapper">
                        <div className="container-fluid px-4">
                            <div className="row">
                                <div className="col-6"> <h6>Buy BUGG Token</h6></div>
                                <div className="col-6 text-end">

                                </div>
                            </div>
                            <div className="row mt-3 mb-4">
                                <div className="col-lg-6 col-sm-12 col-md-6">
                                    <div className="card shadow-lg">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 col-lg-3 text-center">
                                                    <div className="icons">
                                                        <i class="far fa-user"></i>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-9 text-right">
                                                    <h5 className="text-warning"> Wallet address ( User Id) </h5>
                                                    <small>{this.props.address}</small>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-12 col-md-6">
                                    <div className="card shadow-lg card_color1">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 col-lg-3 text-center">
                                                    <div className="icons">
                                                        <i class="fas fa-wallet"></i>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-9 text-right">
                                                    <h5 className="text-warning"> Wallet Balance</h5>

                                                    <h6>{this.state.bnbBalance}  BNB</h6>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-sm-12 col-md-6">
                                    <div className="card shadow-lg card_color2">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 col-lg-3 text-center">
                                                    <div className="icons">
                                                    <img src="../assets/ethe.png"></img>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-9 text-right">
                                                    <h5 className="text-warning">Your BPN Balance</h5>

                                                    <h6> {this.state.hvrxBalance} BPN </h6>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-12 col-md-6">
                                    <div className="card shadow-lg ">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 col-lg-3 text-center">
                                                    <div className="icons">
                                                    <i class="fas fa-donate"></i>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-9 text-right">
                                                    <h5 className="text-warning">Your Packages</h5>

                                                    <h6> $ {this.state.info.pakage} </h6>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>




                            <div className="row mt-3 mb-4">

                                <div className="col-lg-6 col-sm-12 col-md-6">
                                    <div className="card shadow-lg">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 col-lg-3 text-center">
                                                    <div className="icons">
                                                    <i class="far fa-chart-bar"></i>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-9 text-right">
                                                    <h5 className="text-warning">Business value</h5>

                                                    <h6> $ {this.state.info.businessValue} </h6>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-sm-12 col-md-6">
                                    <div className="card shadow-lg card_color3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 col-lg-3 text-center">
                                                    <div className="icons">
                                                    <i class="fas fa-user-clock"></i>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-9 text-right">
                                                    <h5 className="text-warning">Joining Date </h5>

                                                    {this.state.info.pakage > 0 ?
                                                        <h6>{this.state.info.joiningDate}</h6> : (<></>)
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row mt-3 mb-4">
                                <div className="col-lg-6 col-sm-12 col-md-6">
                                    <div className="card shadow-lg">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 col-lg-3 text-center">
                                                    <div className="icons">
                                                    <i class="fas fa-hand-holding-usd"></i>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-9 text-right">
                                                    <h5 className="text-warning">Total Earning</h5>

                                                    <h6>{(this.state.info.grandTotal)} BPN </h6>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-12 col-md-6">
                                    <div className="card shadow-lg">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 col-lg-3 text-center">
                                                    <div className="icons">
                                                    <i class="fas fa-sitemap"></i>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-9 text-right">
                                                    <h5 className="text-warning">Total Direct </h5>

                                                    <h6>{this.state.info.directDownline}</h6>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-lg-6 col-sm-12 col-md-6">
                                    <div className="card shadow-lg">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 text-right">
                                                    <h5 className="text-warning">Enter BNB Amount to buy BPN</h5>
                                                </div>
                                                <div className="col-12 d-flex mt-2">

                                                    {/* <input type="text" className="form-control" placeholder="0.0061" aria-describedby="button-addon2" /> */}
                                                    <select id="package" className="form-control">
                                                        <option value="1">$50</option>
                                                        <option value="2">$100</option>
                                                        <option value="3">$200</option>
                                                        <option value="4">$500</option>
                                                        <option value="5">$1000</option>
                                                        <option value="6">$2000</option>
                                                    </select>
                                                    <button onClick={this.buy} className="btn btn-outline-secondary a" type="button" id="button-addon2" >Buy</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-12 col-md-6">
                                    <div className="card shadow-lg">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 col-lg-3 text-center">
                                                    <div className="icons">
                                                    <i class="fas fa-poll"></i>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-9 text-right">
                                                    <h5 className="text-warning">Pool Income </h5>


                                                    <h6> {this.state.info.bonusCoin}</h6>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>              

                                
                        </div>

                        <div className="row mt-3">

                        {this.state.info.isAdmin ?
                                    (<div className="col-lg-8 col-sm-12 col-md-8">
                                        <div className="card shadow-lg">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12 text-right">
                                                        <h5 className="text-warning">Enter Leader Id</h5>
                                                    </div>
                                                    <div className="col-12 d-flex mt-2">
                                                        <input placeholder="Enter Leader's Referrer Wallet Address" id="leader_referrer" className="form-select bg-tran w-100" />

                                                    </div>
                                                    <div className="col-12 d-flex mt-2">
                                                        <input placeholder="Enter Leader's  Wallet Address" id="leader_wallet" className="form-select bg-tran w-100" />
                                                    </div>
                                                    <div className="col-12 d-flex mt-2">
                                                        <select className="form-select bg-tran w-100" id="leader_package" aria-label="Default select example">
                                                            <option value="1">$50</option>
                                                            <option value="2">$100</option>
                                                            <option value="3">$200</option>
                                                            <option value="4">$500</option>
                                                            <option value="5">$1000</option>
                                                            <option value="6">$2000</option>
                                                        </select>
                                                        <button className="btn btn-outline-secondary" type="button" onClick={this.joinLeader} id="button-addon2">Activate Leader</button>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    ) : (<></>)
                                }


                                <div className="col-lg-4 col-sm-12 col-md-4">
                                    
                                </div>
                                </div>

                        </div>
                    </div>



                </div>  </div>


        </>

    }

}

            export default Dashboard;
