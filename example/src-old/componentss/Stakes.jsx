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
                        <h6 className="mt-4">Stscking</h6>
                        <div className="row mt-3">
                            <div className="col-lg-6 col-sm-6 col-md-6">
                                <div className="card shadow-lg">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 text-right">
                                                <h5 className="text-warning">BUY WITH BNB</h5>
                                                <p class="p-0 m-0">  <small>This account will be used to buy</small></p>
                                                <small>0x961a4354d94903d6f93f00cf5e4d689c816c8f95</small>
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
                                                <h5 className="text-warning">SELL  WITH BNB</h5>
                                                <p class="p-0 m-0">  <small>Sell your wallet and receive BNB in your main wallet</small></p>
                                                <small>0x961a4354d94903d6f93f00cf5e4d689c816c8f95</small>
                                                <h6>$: 0.00000</h6>
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
                                                <h5 className="text-warning">Enter BNB Amount to buy HVRX</h5>

                                            </div>

                                            <div className="col-12 d-flex mt-2">

                                                <input type="text" className="form-control" placeholder="0.0061" aria-describedby="button-addon2" />
                                                <button className="btn btn-outline-secondary" type="button" id="button-addon2">Sale</button>
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
                                                <h5 className="text-warning">Enter BPN Amount to sell</h5>
                                            </div>

                                            <div className="col-12 d-flex mt-2">
                                                <select className="form-select bg-tran w-100" aria-label="Default select example">
                                                    <option selected>0.0001</option>
                                                    <option value="1">0.0002</option>
                                                    <option value="2">0.00045</option>
                                                    <option value="3">0.00015565</option>
                                                </select>
                                                <button className="btn btn-outline-secondary" type="button" id="button-addon2">Buy</button>
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