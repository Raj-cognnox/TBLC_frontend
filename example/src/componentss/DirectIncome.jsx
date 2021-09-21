import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

function Stscking() {
    return <>
        <div id="layoutSidenav">
            <Sidebar />
            <div id="layoutSidenav_content">
                <div id="page-content-wrapper">
                    <div className="container-fluid px-4">
                        <div className="row mt-3 mb-4">
                            <h6 className="mt-4">Direct Income</h6>
                            <div className="col-lg-12">
                                <div className="card mt-4">
                                    <div className="card-header">
                                        <i className="fas fa-users me-1"></i>
                                        User downline
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
        </div>
   
  </>

}
export default Stscking;