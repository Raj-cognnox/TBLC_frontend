import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import "../App.css"
import { apiGetWithdrawls } from "../helpers/api";

class Withdraw extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            incomes: []
        }
        this.getWithdrawls = this.getWithdrawls.bind(this)
    }
    async componentDidMount() {
        this.getWithdrawls();
    }
    async getWithdrawls() {
        let { address, chainId } = this.props
        let data = { address, type: 1 }
        // let incomes = await getAxios('withdrawl-list', data)
        // this.setState({incomes:incomes.data})
        console.log("incomes", address)
        let withdraw = await apiGetWithdrawls(address, chainId)
        console.log("xttrawls", withdraw);
        this.setState({ withdrawData: withdraw });
        return withdraw
    }
    render() {
        return <>
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <div id="page-content-wrapper">
                        <div className="container-fluid px-4">
                            <div className="row mt-3 mb-4">
                                <h6 className="mt-4">Withdrawls</h6>
                                <div className="col-lg-12">
                                    <div className="card mt-4">
                                        <div className="card-header">
                                            <i className="fas fa-users me-1"></i>
                                            Withdrawl Details
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-striped ">
                                                    <thead>
                                                        <tr>
                                                            <th>Sr. No</th>
                                                            <th>Amount</th>
                                                            <th>Date</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.withdrawlsData ? this.state.withdrawlsData.map((item, index) => <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{item.amount / 1000000000} BPN</td>
                                                            <td>{new Date(item.date).toLocaleString()}</td>
                                                            {/* <td>{item.userId}</td> */}
                                                        </tr>) : ""}
                                                    </tbody>
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
}
export default Withdraw;
