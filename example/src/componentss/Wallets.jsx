import React from 'react';
import ReactDOM from 'react-dom';
import Card from "./Card";

class Wallets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAdmin: "Admin",

        }
        this.UserName = { props: "Admin" };
        this.LivePrice = { props: "BNB 0" };

    }
    render() {

        return <div id="page-content-wrapper">
            <div className="container-fluid">
            
                <div className="row mt-3 p-3">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <h6>LIVE PRICE</h6>
                                <p>{this.LivePrice.props}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <h6>BNB BALANCE</h6>
                                <p>{this.LivePrice.props}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <h6>LIVE PRICE</h6>
                                <p>{this.LivePrice.props}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    }

}



export default Wallets;