import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

function Stscking() {
    return <>

        <div id="layoutSidenav">
            <Sidebar />

            <div id="layoutSidenav_content">
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                
                        <div className="row mt-3">
                            <div className="col-lg-6 col-sm-6 col-md-6">
                                <div className="card shadow-lg">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 text-right p-3">
                                                <h5 className="text-warning">TOTAL STAKE BALANCE</h5>
                                                    <h6>$: 0.00000</h6>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-md-6">
                                <div className="card shadow-lg">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 text-right">
                                                <h5 className="text-warning">STAKE REWARD</h5>
                                                <small class="p-0 m-0">0.1% Daily Reward (Credited at End of Month)</small>
                                                <h6>0: TBLC</h6>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="row mt-3">
                            <div className="col-lg-6 col-sm-6 col-md-6">
                                <div className="card shadow-lg">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 text-right">
                                                <h5 className="text-warning">Enter TBLC Amount to stake</h5>

                                            </div>

                                            <div className="col-12 d-flex mt-2">

                                                <input type="text" className="form-control" placeholder="100" aria-describedby="button-addon2" />
                                                <button className="btn btn-grad" type="button" id="button-addon2">stake</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-md-6">
                                <div className="card shadow-lg">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 text-right">
                                                <h5 className="text-warning">Enter BNB Amount to unstake TBLC</h5>
                                            </div>

                                            <div className="col-12 d-flex mt-2">
                                            <input type="text" className="form-control" placeholder="10 TBLC" aria-describedby="button-addon2"/>
                                                <button className="btn btn-grad" type="button" id="button-addon2">unstake</button>
                                                {/* <a className="btn btn-warning ml-2" href="#">Sale</a> */}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card mt-4">
                                    <div className="card-header">
                                        <i className="fas fa-table me-1"></i>
                                        DataTable
                                    </div>
                                    <div className="card-body">
                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Position</th>
                                                        <th>Office</th>
                                                        <th>Age</th>
                                                        <th>Start date</th>
                                                        <th>Salary</th>
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
        </div>






    </>
}
export default Stscking;