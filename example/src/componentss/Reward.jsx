import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

class Reward extends React.Component {
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

   }
render(){
return <>
<div id="layoutSidenav">
            <Sidebar />

            <div id="layoutSidenav_content">
            <div className="container-fluid">
                <h6 className="mt-4">Rewards</h6>
                <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h6>REFERRAL REWARD BALANCE</h6>
                                    <p>$ :</p>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h6>Claim Rewards</h6>
                                    <button class="btn btn-info ">Claim Now</button>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h6> TOTAL DIRECT</h6>
                                      <p>  </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                    <div className="col-lg-12">
                        <div className="card mt-4">
                            <div className="card-header">
                                <i className="fas fa-gift me-1"></i>
                                    Rewards
                            </div>
                            <div className="card-body">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>User ID</th>
                                                <th>Package</th>
                                                <th>Rank </th>
                                                <th>Join date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                    </table>
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
export default Reward;