import React from 'react';
import ReactDOM from 'react-dom';
import Card from "./Card";
import Sidebar from './Sidebar';
import Header from './Header';
import {REACT_APP_BACKEND_URL} from '../constants/constants'
import { createSna, dispatchCall, dispatchSend  } from "../helpers/bpntoken";
import {getAxios, postAxios, getFetch} from "../helpers/api"
import {MATCH_SNA, TEST_BYTES, FUNCTION_BALANCE_OF } from "../constants/functions"
import {getPackageCost} from "../helpers/package"
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAdmin: "Admin",
            userId: "DF13323",
            userImg: "https://example.com/favicoin.ico",
            info:{}
        }
        this.UserName = { props: "Admin" };
        this.Userimg = { props: "https://image.flaticon.com/icons/png/512/149/149071.png" };
    }

    async componentDidMount() {
        let {address} = this.props
        let info = await getAxios(`user-profile`, {address})
        this.setState({info:info.data})
        console.log("info",this.state)
       }
    render() {

        return <>
            <div id="layoutSidenav">
                <Sidebar />

                <div id="layoutSidenav_content">
                    <div id="page-content-wrapper">
                        <div className="container-fluid px-4">
                            <h6 className="mt-4">Profile</h6>
                            <div className="row mt-3 p-3 detils">

                                <div className="col-lg-2 col-md-2">
                                    <div className="user_edit_img">
                                        <img src={this.Userimg.props}></img>
                                    </div>
                                   
                                </div>
                                <div className="col-lg-7 col-md-7 my-1 brder_r">
                                    <div className="row">
                                        <div className="col-md-5 my-1">
                                            <h6> ID ( Wallet Address):{this.state.info.userAddress}</h6>
                                        </div>
                                        <div className="col-md-7 my-1">
                                            <small></small>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-5 my-1">
                                            <h6> Referrer Id  :{this.state.info.referrerAddress}</h6>
                                        </div>
                                        <div className="col-md-7 my-1">
                                            <small></small>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 my-1">
                                            <h6> Package Name :${this.state.info.pakage} </h6>
                                        </div>
                                        <div className="col-md-7 my-1">
                                            <small></small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    }

}



export default Profile;