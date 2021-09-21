import React from 'react'
import Sidebar from './Sidebar';
import Header from './Header';

function Buypackages() {
    return (
        <>
            <div id="layoutSidenav">
            <Sidebar />

            <div id="layoutSidenav_content">
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        
                        <div className="row mt-3">
                            <div className="col-lg-6  mx-auto">
                            <h6 className="mt-4">Buy Packages</h6>
                                <div className="card shadow-lg">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 text-right">
                                                <h5 className="text-warning">Select Package </h5>
                                            </div>

                                            <div className="col-12 d-flex mt-2">
                                                <select className="form-select bg-tran w-100" aria-label="Default select example">
                                        
                                                        <option value="1">$50</option>
                                                        <option value="2">$100</option>
                                                        <option value="3">$200</option>
                                                        <option value="4">$500</option>
                                                        <option value="5">$1000</option>
                                                        <option value="6">$2000</option>
                                                </select>
                                                
                                            
                                            </div>

                                            <div className="col-12 text-center m-auto pt-2">
                                            <button className="btn btn-outline-secondary  w-25" type="button" id="button-addon2">Buy</button>
                                                
                                            
                                            </div>
                                            
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* <div className="row">
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
                        </div> */}


                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Buypackages
