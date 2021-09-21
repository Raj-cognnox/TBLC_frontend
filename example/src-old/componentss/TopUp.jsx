import React from 'react'
import Sidebar from './Sidebar';
import Header from './Header';
import {REACT_APP_BACKEND_URL} from '../constants/constants'
import { createSna, dispatchCall, dispatchSend  } from "../helpers/bpntoken";
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
            desiredPayment:0

        }
        console.log("props", this.props)
        this.upgrade = this.upgrade.bind(this)
    }
   async componentDidMount() {
    let {address} = this.props
    let info = await getAxios(`user-profile`, {address})
    this.setState({info:info.data})
   }
 onPackageChange(event) {
   let packages =  [0, 50,100,200,500,1000,2000]
   console.log(parseInt(packages[event.target.value]))
   console.log( (this.state))
    let desiredPayment = parseInt(packages[event.target.value]) - parseInt(this.state.info.pakage)
    this.setState({desiredPayment})
 }
 async  upgrade(){
    let packages = [0, 50, 100, 200, 500, 1000, 2000]
    let selectedPackage = document.getElementById("topup-package").value
    // let bnb = await getPackageCost(packages[selectedPackage]);
    // console.log("bnb", bnb)
    const { web3, chainId, address } = this.props;
     let sna = await createSna(address, chainId, web3)
   // console.log(sna)
    // let user = await getAxios('check',{address})
    // console.log("checking user ", user )
    if(this.state.info.pakage>0){
        alert("You have already bought a package")
        return
    }
    let data = {address, pakage:selectedPackage, dollarAmount:this.state.desiredPayment }
    let buystartresponse = await getAxios('buy-start',data)
    if(buystartresponse.data.status=="notOk"){
        return
    }
    console.log("buy start response", buystartresponse)
    sna = buystartresponse.data.hash
    let value =  buystartresponse.data.value.value
    console.log("valuee z", value)
    let response = {status:0}
    if(value >0){
        let response = await dispatchSend(address, chainId, web3, 'buy', [sna, value.toString(), packages[selectedPackage], this.state.referrer||address], value)
        // console.log("buy called ",  response.status)
        if(response.status==true){
            // console.log("it is true")
            let data = {address, pakage:selectedPackage, txHash:response.transactionHash, referrer: this.state.referrerAddress}
          //  let url = `${REACT_APP_BACKEND_URL}/buy`
            let response3 = await getAxios('success',data)
            // console.log("result of success buying", response3);
            // if (web3 && web3.currentProvider && web3.currentProvider.close) {
            //     await web3.currentProvider.close();
            // }
        }
    }
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
                                    <h6 className="mt-4">Upgrade Packages</h6>
                                    <div className="card shadow-lg">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 d-flex mt-2">
                                             </div>
                                                <div className="col-12 text-center m-auto pt-2">
                                                    <h4> Current Package   : <span>${this.state.info.pakage} </span></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                          
                            <div className="col-lg-6 ">
                                <h6 className="mt-4">Upgrade Packages (You pay: ${this.state.desiredPayment} )</h6>
                                <div className="card shadow-lg">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 text-right">
                                                <h5 className="text-warning">Select Package </h5>
                                            </div>
                                            <div className="col-12 d-flex mt-2">
                                                <select className="form-select bg-tran w-100" id="topup-package" onChange= {(event)=>this.onPackageChange(event)} aria-label="Default select example">
                                                    <option value="1">$50</option>
                                                    <option value="2">$100</option>
                                                    <option value="3">$200</option>
                                                    <option value="4">$500</option>
                                                    <option value="5">$1000</option>
                                                    <option value="6">$2000</option>
                                                </select>
                                            </div>
                                            <div className="col-12 text-center m-auto pt-2">
                                                <button className="btn btn-outline-secondary  w-100" onClick={this.upgrade}  type="button" id="button-addon2">Upgrade </button>
                                            </div>
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

   