import React from 'react'
import Sidebar from './Sidebar';
import Header from './Header';
import {REACT_APP_BACKEND_URL} from '../constants/constants'
import { createSna, dispatchCall, dispatchSend, dispatchUpgrade  } from "../helpers/bpntoken";
import {getAxios, postAxios, getFetch} from "../helpers/api"
import {MATCH_SNA, TEST_BYTES, FUNCTION_BALANCE_OF } from "../constants/functions"
import {getPackageCost} from "../helpers/package"
class TopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            users: null,
            info:{},
            desiredPayment:0,
            downlines:[],
            packageAmount:0

        }
        console.log("props", this.props)
        this.upgrade = this.upgrade.bind(this)
    }
   async componentDidMount() {
    let {address} = this.props
    let info = await getAxios(`user-profile`, {address})
    console.log(info)
    this.setState({info:info.data})
   }




   getPackageAmount (amount ) { 
    var modd = amount%100;  
    amount -= modd;
     return {amount, modd}
    } 
async upgrade() {

let selectedPackage = document.getElementById("package").value
    selectedPackage = this.getPackageAmount(selectedPackage).amount

    const { web3, chainId, address } = this.props;
    var tx = await web3.eth.getTransaction("0x434ba2102cb216bfdd49877e47293d6874eab266e076683a05f7d878bc2583ee")
        console.log("tx tx", tx)
    let sna = await createSna(address, chainId, web3)
    // console.log(sna)
    // let user = await getAxios('check',{address})
    // console.log("checking user ", user )
    if (this.state.info.pakage >= selectedPackage) {
        alert("You have already bought a package with same or higher value")
        return
    }
    let data = { address, chainId, pakage: selectedPackage }
    let buystartresponse = await getAxios('upgrade-start', data)
    if (buystartresponse.data.status == "notOk") {
        alert(buystartresponse.data.message)
        return
    }
    console.log("buy start resonse", buystartresponse)
    if (!buystartresponse.status == "ok") {
        alert("You have already bought a package")
        return
    }
    sna = buystartresponse.data.hash
    console.log('snaaaaaaaaaaaaa', buystartresponse.data.value.value)
    let value = buystartresponse.data.value.value

    let response = { status: 0 }
    if (value > 0) {
        let response = await dispatchUpgrade(address, chainId, web3,  [ sna, value, selectedPackage])
        console.log("buy called ", response.status)
        if (response.status == true) {
            console.log("it is true")
            let data = { address, pakage: selectedPackage, txHash: response.transactionHash, referrer: this.state.referrer, value }
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






 onPackageChange(event) {
     this.setState({packageAmount:event.target.value})
   console.log("package in state", this.state.info.package)
   console.log("packageamount in state2", this.state.packageAmount)
   let amount = this.getPackageAmount(event.target.value).amount
    let desiredPayment = parseInt(amount) - parseInt(this.state.info.package)
    this.setState({desiredPayment})
 }
   render () {
    return (
        <>
            <div id="layoutSidenav">
            <Sidebar />

            <div id="layoutSidenav_content">
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                            <div className="row mt-3">
                                <div className="col-lg-6 ">
                                    <h6 className="mt-4">Upgrade Package</h6>
                                    <div className="card shadow-lg">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 d-flex mt-2">
                                             </div>
                                                <div className="col-12 text-center m-auto pt-2">
                                                    <h4> Current Package   : <span>${this.state.info.package} </span></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                          
                            <div className="col-lg-6 ">
                                <h6 className="mt-4">Upgrade Package (You pay: ${this.state.desiredPayment} )</h6>
                                <p></p>
                                <div className="card shadow-lg">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 text-right">
                                                <h5 className="text-warning">Select Package </h5>
                                            </div>
                                            <div className="col-12 d-flex mt-2">

                                            {/* <input id="package"  onChange= {(event)=>this.onPackageChange(event)} value = {this.state.packageAmount} id="topup-package" className="form-control" /> */}
                                                    <input id="package" onChange= {(event)=>this.onPackageChange(event)} value = {this.state.packageAmount} className="form-control" />
                                                    <button onClick={this.upgrade} className="btn btn-outline-secondary a" type="button" id="button-addon2" >Upgrade</button> 
                                            </div>
                                            
                                            {/* <div className="col-12 text-center m-auto pt-2">
                                                {/* <button className="btn btn-outline-secondary  w-100" onClick={this.upgrade}   type="button" id="button-addon2">Upgrade </button>
                                            </div> */} 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
}
export default TopUp

// import {REACT_APP_BACKEND_URL} from '../constants/constants'
// import { createSna, dispatchCall, dispatchSend  } from "../helpers/hoverx";
// import {getAxios, postAxios, getFetch} from "../helpers/api"
// import {MATCH_SNA, TEST_BYTES, FUNCTION_BALANCE_OF } from "../constants/functions"
// import {getPackageCost} from "../helpers/package"
// class TopUp extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state =
//         {
//             users: null,
//             info:{}
//         }
//         console.log("props", this.props)
//         this.resetApp = this.resetApp.bind(this)
//             this.buy = this.buy.bind(this)

//     }
//    async componentDidMount() {

//    }

//    render () {

   