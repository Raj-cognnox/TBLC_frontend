import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './Sidebar';
import {getAxios} from '../helpers/api'
import { createSna, dispatchCall, dispatchSend, dispatchWithdraw } from "../helpers/bpntoken";


class Wallet extends React.Component {
    constructor(props) {
        super()
        this.state = {
            price: 0,
            balance: 0,
            userProfile: {
            grandTotal: 0
            },
            amountValidated: false
        }
        this.withdraw = this.withdraw.bind(this)
    }
    async componentDidMount() {
        let livePrice = await getAxios('get-price', {})
        let userProfile = await getAxios('user-profile', { address: this.props.address })

        console.log("user profile ", userProfile)
        this.setState({ price: livePrice.data.price / 100, userProfile: userProfile.data })
        let balance = await this.props.web3.eth.getBalance(this.props.address)
        console.log(balance)
        this.setState({ balance: balance / 1000000000000000000 })

    }
    amountChanged(event) {
        this.setState({ withdrawAmount: event.target.value })

        if (event.target.value <= this.state.userProfile.grandTotal) {
            this.setState({ amountValidated: true })
        }

    }
    callAlert(event) {
        if (event.target.value > this.state.userProfile.grandTotal || !event.target.value) {
            alert("Amount exceeds your total balance, you can withdraw maximum tokens: " + this.state.userProfile.grandTotal + "you are trying to withdraw " + this.state.withdrawAmount)
            this.setState({ amountValidated: false })
        }
    }
    async withdraw() {

        if (!this.state.amountValidated) {
            alert("Invalid amount")
            return
        }
        const { web3, chainId, address } = this.props;
        let grandTotal = this.state.userProfile.grandTotal * 10 ** 9

        let data = { address, chainId, tokens: grandTotal }
        let withdrawStartResponse = await getAxios('withdrawl-start', data)
        if (withdrawStartResponse.data.status == "notOk") {
            alert("Minimum Withdrawl amount is 100 DFPW")
            return
        }
        console.log("withdraw start response", withdrawStartResponse)

        let sna = withdrawStartResponse.data.hash
        let value = withdrawStartResponse.data.value.amount
        if (value > 0) {
            let response = await dispatchWithdraw(address, chainId, web3, 'withdraw', [sna, value, 1])
            console.log("withdraw called ", response.status)
            if (response.status == true) {
                console.log("it is true")
                let data = { address, txHash: response.transactionHash, value: this.state.withdrawAmount }
                //  let url = `${REACT_APP_BACKEND_URL}/buy`
                let response3 = await getAxios('withdrawl', data)
                if (response3.data.status == "ok") {
                    let userProfile = await getAxios(`user-profile`, { address })
                    console.log("userProfile dashboard", userProfile.data)
                    this.setState({ userProfile: userProfile.data })
                }

                // if (web3 && web3.currentProvider && web3.currentProvider.close) {
                //     await web3.currentProvider.close();
                // }
            }
        }
        //response return 
        //    let response = {hash:"0xabcde"}

    }
    render() {

        return <div id="layoutSidenav">
            <Sidebar />
            <div id="layoutSidenav_content">
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <div className="row p-3">
                  
                            <div className="col-lg-4 col-md-4 col-12 ">
                                <div className="card">
                                    <div className="card-body">
                                        <h6>LIVE PRICE DFPW</h6>
                                        <p>${this.state.price}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h6>BNB BALANCE</h6>
                                        <p>{this.state.balance} BNB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h6>Token Balance</h6>
                                        <p>{this.state.userProfile.grandTotal}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3 p-3">

                                <div className="col-md-6 col-12 col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5>Withdraw Now</h5>
                                            <div className="d-flex">
                                                <input className="form-control w-75" onChange={(event) => { this.amountChanged(event) }} onBlur={(event) => { this.callAlert(event) }} defaultValue={this.state.userProfile.grandTotal} />

                                                <button onClick={this.withdraw} className="btn btn-success">Withdraw</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 col-12 col-lg-6">

                                </div>
                            </div>

                    </div>
                </div>
            </div>
        </div>


    }

}
export default Wallet;